// AI chat widget with persistence and bear avatar
(() => {
  const avatar = 'data:image/png;base64,iVBORw0K ... (base64 string for bear.png) ...'; // embed full base64 here
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    if (!Array.isArray(history)) history = [];
  } catch (e) {
    history = [];
  }
  function appendMessage(text, isUser) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    const line = document.createElement('div');
    line.className = 'chat-line ' + (isUser ? 'user' : 'ai');
    if (!isUser) {
      const img = document.createElement('img');
      img.src = avatar;
      img.alt = 'AI Avatar';
      img.loading = 'lazy';
      line.appendChild(img);
    }
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    line.appendChild(bubble);
    chatMessages.appendChild(line);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function saveMessage(text, isUser) {
    history.push({ text, isUser });
    if (history.length > 100) history = history.slice(history.length - 100);
    localStorage.setItem('chatHistory', JSON.stringify(history));
  }
  function getStaticResponse(msg) {
    const pairs = [
      { p: /clearance|secret/i, a: 'I hold an Active Secret Clearance with DoD eligibility.' },
      { p: /security\+|cert/i, a: 'I have CompTIA Security+ and plan to obtain more certifications like CySA+ and CEH.' },
      { p: /projects?/i, a: 'See the Projects page for detailed write‑ups and Python tools.' },
      { p: /lab|siem/i, a: 'My Home Lab page covers the 4‑VM SIEM environment with metrics and screenshots.' },
      { p: /skills?/i, a: 'Check out the Skills & Certs page for my technical stack and progress indicators.' },
      { p: /experience|navy/i, a: 'I served 9 years in the U.S. Navy before pivoting into cybersecurity.' },
      { p: /location|where/i, a: 'I’m based in Chesapeake/Norfolk, Virginia and open to remote or hybrid roles.' },
      { p: /contact|connect/i, a: 'Use the Contact page to send a message or email me at johnson.m.vincent17@gmail.com.' },
      { p: /blog|notes/i, a: 'Read my latest posts on the Blog page, including lab notes and tutorials.' },
      { p: /recruiters?/i, a: 'Visit the Recruiters page for clearance, location, availability and resume highlights.' },
      { p: /joke/i, a: 'Why did the hacker stay healthy? Because he had lots of anti‑viruses!' },
      { p: /fact|random/i, a: 'Did you know? The first computer virus, “Creeper,” appeared in the early 1970s and simply displayed “I’m the creeper: catch me if you can.”' },
      { p: /hello|hi/i, a: 'Hello! Feel free to ask about my lab, projects or skills.' },
      { p: /help/i, a: 'I can answer questions about my portfolio sections or provide fun facts and tips.' },
      { p: /quote|motivation/i, a: () => {
        const quotes = [
          'Keep learning—every packet tells a story!',
          'Cybersecurity is a journey, not a destination.',
          'Perseverance pays off—keep hacking away!',
          'Your passion for security will open doors.'
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
      }},
      { p: /tip/i, a: () => {
        const tips = [
          'Always use multi‑factor authentication.',
          'Keep your software patched to reduce vulnerabilities.',
          'Use strong, unique passwords and a password manager.',
          'Monitor your logs regularly to detect anomalies.'
        ];
        return tips[Math.floor(Math.random() * tips.length)];
      }}
    ];
    for (const item of pairs) {
      if (item.p.test(msg)) {
        return typeof item.a === 'function' ? item.a() : item.a;
      }
    }
    return 'I can answer questions about my lab, projects, skills, or provide tips and quotes. Try asking me about those!';
  }
  async function fetchResponse(message) {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      if (data.reply) return data.reply;
      if (data.choices && data.choices[0] && data.choices[0].text) return data.choices[0].text;
      return null;
    } catch (e) {
      return null;
    }
  }
  async function sendChat() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;
    const text = (chatInput.value || '').trim();
    if (!text) return;
    appendMessage(text, true);
    saveMessage(text, true);
    chatInput.value = '';
    let reply = await fetchResponse(text);
    if (!reply) reply = getStaticResponse(text);
    setTimeout(() => {
      appendMessage(reply, false);
      saveMessage(reply, false);
    }, 300);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    if (chatToggle) {
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
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && history.length) {
      for (const item of history) {
        appendMessage(item.text, item.isUser);
      }
    }
  });
})();
