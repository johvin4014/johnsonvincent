// AI Chat widget with fallback responses and OpenAI API integration
(() => {
  // Use the bear image from the images/ directory
  const avatar = 'images/bear.png';

  // Restore history
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    if (!Array.isArray(history)) history = [];
  } catch {
    history = [];
  }

  function appendMessage(text, isUser) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    const line = document.createElement('div');
    line.className = 'chat-line ' + (isUser ? 'user' : 'ai');
    if (!isUser) {
      const img = document.createElement('img');
      img.src = avatar;
      img.alt = 'AI';
      img.loading = 'lazy';
      line.appendChild(img);
    }
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    line.appendChild(bubble);
    container.appendChild(line);
    container.scrollTop = container.scrollHeight;
  }

  function saveMessage(text, isUser) {
    history.push({ text, isUser });
    if (history.length > 100) history = history.slice(-100);
    localStorage.setItem('chatHistory', JSON.stringify(history));
  }

  function fallbackResponse(msg) {
    const rules = [
      { p: /clearance|secret/i, a: 'I hold an Active Secret Clearance with DoD eligibility.' },
      { p: /security\+|cert/i, a: 'I have CompTIA Security+ and plan to obtain more certifications (CySA+, CEH).' },
      { p: /projects?/i, a: 'Visit the Projects page for detailed write-ups and tools.' },
      { p: /lab|siem/i, a: 'My Home Lab page details the 4‑VM SIEM environment.' },
      { p: /skills?/i, a: 'The Skills & Certs page lists my tech stack and experience metrics.' },
      { p: /experience|navy/i, a: 'I served 9 years in the U.S. Navy as a database/systems admin and transitioned to cybersecurity.' },
      { p: /location/i, a: 'I’m based in Chesapeake/Norfolk, VA and open to remote or hybrid roles.' },
      { p: /contact/i, a: 'See the Contact page or email me at johnson.m.vincent17@gmail.com.' },
      { p: /joke/i, a: 'Why did the hacker stay healthy? Because he had lots of anti‑viruses!' },
      { p: /fact/i, a: 'Did you know the first computer virus, “Creeper,” appeared in the early 1970s?' },
      { p: /hello|hi/i, a: 'Hello! Ask me about my lab, projects or other cybersecurity topics.' }
    ];
    for (const rule of rules) {
      if (rule.p.test(msg)) return rule.a;
    }
    return 'I can answer questions about my portfolio or share security tips and fun facts. Try asking me about my lab or projects!';
  }

  async function callOpenAI(message) {
    const apiKey = 'images/profile-photo.jpg'; // ← Replace with your real API key
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a helpful cybersecurity assistant for a personal portfolio website.' },
            { role: 'user', content: message }
          ],
          max_tokens: 150,
          temperature: 0.5
        })
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || null;
    } catch (err) {
      console.error('OpenAI error:', err);
      return null;
    }
  }

  async function sendChat() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    appendMessage(text, true);
    saveMessage(text, true);
    input.value = '';
    let reply = await callOpenAI(text);
    if (!reply) reply = fallbackResponse(text);
    setTimeout(() => {
      appendMessage(reply, false);
      saveMessage(reply, false);
    }, 300);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    if (chatToggle && chatWindow) {
      chatToggle.addEventListener('click', () => {
        const visible = chatWindow.style.display === 'block';
        chatWindow.style.display = visible ? 'none' : 'block';
        if (!visible && chatInput) chatInput.focus();
      });
    }
    if (chatSend) chatSend.addEventListener('click', sendChat);
    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendChat();
        }
      });
    }
    // Restore history
    const messages = document.getElementById('chatMessages');
    if (messages && history.length) {
      history.forEach(({ text, isUser }) => appendMessage(text, isUser));
    }
  });
})();
