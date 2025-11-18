const glowCards = document.querySelectorAll('.glow-card');
const trigger = document.getElementById('pulse-trigger');

function handlePointer(e) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  target.style.setProperty('--mouse-x', `${x}%`);
  target.style.setProperty('--mouse-y', `${y}%`);
}

glowCards.forEach((card) => {
  card.addEventListener('pointermove', handlePointer);
});

if (trigger) {
  trigger.addEventListener('click', () => {
    document.body.classList.add('pulse');
    setTimeout(() => document.body.classList.remove('pulse'), 1200);
  });
}

let pulseFrame = null;
function animatePulse(timestamp) {
  const intensity = Math.sin(timestamp / 250) * 0.08 + 0.18;
  document.documentElement.style.setProperty('--border', `rgba(12, 16, 35, ${0.08 + intensity})`);
  pulseFrame = requestAnimationFrame(animatePulse);
}

pulseFrame = requestAnimationFrame(animatePulse);

window.addEventListener('beforeunload', () => {
  if (pulseFrame) cancelAnimationFrame(pulseFrame);
});
