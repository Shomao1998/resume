const glowCards = document.querySelectorAll('.glow-card');

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

const languageSwitcher = document.querySelector('.language-switcher');

if (languageSwitcher) {
  const toggle = languageSwitcher.querySelector('.language-toggle');
  const label = languageSwitcher.querySelector('.language-label');
  const options = languageSwitcher.querySelectorAll('.language-option');

  const setOpen = (open) => {
    languageSwitcher.dataset.open = open ? 'true' : 'false';
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  };

  toggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = languageSwitcher.dataset.open === 'true';
    setOpen(!isOpen);
  });

  options.forEach((option) => {
    option.addEventListener('click', () => {
      options.forEach((opt) => opt.setAttribute('aria-selected', 'false'));
      option.setAttribute('aria-selected', 'true');
      if (label) {
        label.textContent = option.textContent.trim();
      }
      setOpen(false);
    });
  });

  document.addEventListener('click', (event) => {
    if (!languageSwitcher.contains(event.target)) {
      setOpen(false);
    }
  });
}

const typingLines = document.querySelectorAll('.typing-line');

if (typingLines.length) {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const typeLine = (line) =>
    new Promise((resolve) => {
      const textEl = line.querySelector('.typing-text');
      const caretEl = line.querySelector('.typing-caret');
      const fullText = textEl?.dataset.text?.trim() || textEl?.textContent?.trim() || '';
      let index = 0;

      if (textEl) {
        textEl.textContent = '';
      }

      const typeNext = () => {
        if (!textEl) {
          resolve();
          return;
        }

        if (index <= fullText.length) {
          textEl.textContent = fullText.slice(0, index);
          index += 1;
          setTimeout(typeNext, 120);
        } else {
          textEl.classList.add('typing-complete');
          caretEl?.classList.add('paused');
          resolve();
        }
      };

      typeNext();
    });

  (async () => {
    await sleep(400);
    for (const line of typingLines) {
      await typeLine(line);
    }
  })();
}
