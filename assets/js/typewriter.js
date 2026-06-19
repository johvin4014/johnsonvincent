// Typewriter effect for the homepage
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('typedText');
  if (!el) return;
  const phrases = [
    'Cybersecurity Professional',
    'Security Operations Specialist',
    'Incident Response Analyst',
    'Digital Forensics Enthusiast',
    'Threat Hunter & Researcher',
  ];
  let index = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const phrase = phrases[index];
    if (deleting) {
      el.textContent = phrase.substring(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        index = (index + 1) % phrases.length;
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
