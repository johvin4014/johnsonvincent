// Typewriter effect on the homepage; general cybersecurity roles
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('typedText');
  if (!el) return;
  const phrases = [
    'Cybersecurity Professional',
    'Security Operations Specialist',
    'Incident Response Analyst',
    'Digital Forensics Enthusiast',
    'Threat Hunter & Researcher'
  ];
  let idx = 0;
  let charIndex = 0;
  let deleting = false;
  function type() {
    const phrase = phrases[idx];
    if (deleting) {
      el.textContent = phrase.substring(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        idx = (idx + 1) % phrases.length;
      }
    } else {
      el.textContent = phrase.substring(0, charIndex++);
      if (charIndex > phrase.length) {
        deleting = true;
        setTimeout(type, 900);
        return;
      }
    }
    setTimeout(type, deleting ? 60 : 110);
  }
  type();
});
