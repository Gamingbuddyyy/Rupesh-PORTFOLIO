// 1. MATRIX RAIN EFFECT
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&*%";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#00ff41";
ctx.font = fontSize + "px monospace";

drops.forEach((y, i) => {
const text = chars[Math.floor(Math.random() * chars.length)];
ctx.fillText(text, i * fontSize, y * fontSize);
if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
drops[i]++;
});
}
setInterval(drawMatrix, 50);

// 2. REPORT DATABASE
let reports = [
{ title: "Server Security Misconfiguration", Program: "OYO", sev: "HIGH", img: "https:\/\/h.uguu.se\/paCmiBpb.jpeg", desc: "Broken Authentication or Misconfiguration can lead to unauthorised access and can cause serious security impact!" },
{ title: "Business Logic - Payment Bypass", Program: "Commudle", sev: "CRITICAL", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500", desc: "Detected flaw in rounding mechanism during checkout flow." }
];

function renderReports(filteredReports = reports) {
const grid = document.getElementById('reportGrid');
grid.innerHTML = filteredReports.map(r => `
<div class="report-card">
<span class="sev-badge ${r.sev}">${r.sev}</span>
<img src="${r.img}" class="card-img" onerror="this.src='https://via.placeholder.com/500x200/000/00FF41?text=NO_PROOF'">
<div class="card-body">
<p style="color:var(--neon); font-size:0.7rem;">[${r.platform}]</p>
<h3>${r.title}</h3>
<p style="font-size:0.8rem; color:#888;">${r.desc}</p>
</div>
</div>
`).join('');
}

function filterReports() {
const query = document.getElementById('reportSearch').value.toLowerCase();
const filtered = reports.filter(r =>
r.title.toLowerCase().includes(query) ||
r.platform.toLowerCase().includes(query)
);
renderReports(filtered);
}

// 3. ADDING NEW REPORTS
function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function addReport() {
const newR = {
title: document.getElementById('newTitle').value,
platform: document.getElementById('newPlatform').value,
sev: document.getElementById('newSev').value,
img: document.getElementById('newImg').value,
desc: document.getElementById('newDesc').value
};
if(!newR.title || !newR.platform) return alert("Fields Required!");
reports.push(newR);
renderReports();
closeModal('reportModal');
}

// 4. LOCALSTORAGE COMMENTS
function saveComment() {
const user = document.getElementById('commentUser').value;
const msg = document.getElementById('commentText').value;
if(!user || !msg) return;
const comments = JSON.parse(localStorage.getItem('comments') || '[]');
comments.push({user, msg, date: new Date().toLocaleDateString()});
localStorage.setItem('comments', JSON.stringify(comments));
renderComments();
}

function renderComments() {
const comments = JSON.parse(localStorage.getItem('comments') || '[]');
document.getElementById('commentList').innerHTML = comments.map(c => `
<div style="border-bottom:1px solid #222; padding:10px 0;">
<b style="color:var(--neon)">@${c.user}:</b> ${c.msg}
</div>
`).reverse().join('');
}

// Initialize
renderReports();
renderComments();
