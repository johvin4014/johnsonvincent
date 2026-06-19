// AI chat widget with persistence
(() => {
  const avatar = 'data:image/png;base64,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';

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
      { p: /security\+|certifications?|cert/i, a: 'I have CompTIA Security+ (IAT Level II) and I’m pursuing AWS and other advanced certifications.' },
      { p: /projects?|tools?|case studies?/i, a: 'See the Projects page for detailed write‑ups and Python tools.' },
      { p: /lab|home\s?lab|siem/i, a: 'My Home Lab page covers the 4‑VM Wazuh SIEM environment with metrics, steps and screenshots.' },
      { p: /skills?|tech/i, a: 'Check out the Skills & Certs page for my technical stack, progress indicators and certifications.' },
      { p: /experience|background|navy/i, a: 'I served 9 years in the U.S. Navy as a systems and database administrator before pivoting into cybersecurity.' },
      { p: /location|where/i, a: 'I’m based in Chesapeake/Norfolk, Virginia and open to remote or hybrid roles.' },
      { p: /contact|connect|reach/i, a: 'Use the Contact page to send a message or email me at johnson.m.vincent17@gmail.com.' },
      { p: /blog|posts?|notes/i, a: 'Read my latest posts on the Blog page, including lab notes and tutorials.' },
      { p: /recruiters?|hire|availability/i, a: 'Visit the Recruiters page for clearance, location, availability and resume highlights.' },
      { p: /joke/i, a: 'Why did the hacker stay healthy? Because he had lots of anti‑viruses!' },
      { p: /fact|random/i, a: 'Did you know? The first computer virus, “Creeper,” appeared in the early 1970s and simply displayed the message: “I’m the creeper: catch me if you can.”' },
      { p: /hello|hi|hey/i, a: 'Hello! Feel free to ask about my lab, projects, skills or anything cybersecurity related.' },
      { p: /help|what can you do/i, a: 'I can answer questions about my portfolio sections, tell jokes, share fun facts, give quotes or tips, or direct you to the right page.' },
      { p: /quote|motiv(e|ation)|inspire/i, a: () => {
        const quotes = [
          'Keep learning—every packet tells a story!',
          'Cybersecurity is a journey, not a destination.',
          'Perseverance pays off—keep hacking away!',
          'Your passion for security will open doors.'
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
      }},
      { p: /tip|security tip|best practice/i, a: () => {
        const tips = [
          'Always use multi‑factor authentication.',
          'Keep your software patched to reduce vulnerabilities.',
          'Use strong, unique passwords for each account and a password manager.',
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
    return 'I can answer questions about my lab, projects, skills, experience, provide tips or quotes, or share fun facts. Try asking me about those!';
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
