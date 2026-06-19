// AI Chat widget using OpenAI API, with a bear avatar
(() => {
  // base64-encoded bear image (embed your own base64 string if you prefer)
  const avatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEU...'; // abbreviated; insert full base64 for your bear icon
  
  // Restore chat history from localStorage
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    if (!Array.isArray(history)) history = [];
  } catch {
    history = [];
  }

  // Append message to chat window
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

  // Fallback response patterns
  function fallbackResponse(msg) {
    const pairs = [
      { p: /clearance|secret/i, a: 'I hold an Active Secret Clearance (DoD eligibility).' },
      { p: /security\+|cert/i, a: 'I have CompTIA Security+ and plan to obtain additional certs such as CySA+ and CEH.' },
      { p: /projects?/i, a: 'Check out my Projects page for detailed write-ups and GitHub links.' },
      { p: /lab|siem/i, a: 'Visit my Home Lab page for build steps, metrics and screenshots.' },
      { p: /skills?/i, a: 'My Skills & Certs page lists my tech stack and experience metrics.' },
      { p: /experience|navy/i, a: 'I served 9 years in the U.S. Navy and have hands-on SOC experience.' },
      { p: /location/i, a: 'I’m based in Chesapeake/Norfolk, VA and open to remote or hybrid roles.' },
      { p: /contact/i, a: 'Head to the Contact page or email me directly at johnson.m.vincent17@gmail.com.' },
      { p: /joke/i, a: 'Why did the hacker stay healthy? Because he had lots of anti‑viruses!' },
      { p: /fact/i, a: 'Did you know? The first computer virus “Creeper” appeared in the early 1970s and just displayed: “I’m the creeper: catch me if you can.”' },
      { p: /hello|hi/i, a: 'Hello! Ask me about my lab, projects or anything cybersecurity-related.' }
    ];
    for (const item of pairs) {
      if (item.p.test(msg)) return item.a;
    }
    return 'I can answer questions about my portfolio, share security tips or provide fun facts. Try asking me about my lab or projects!';
  }

  // OpenAI call
  async function fetchReply(message) {
    // Insert your API key here or manage it server-side
    const apiKey = 'YOUR_OPENAI_API_KEY';
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
          temperature: 0.5,
          max_tokens: 150
        })
      });
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        return data.choices[0].message.content.trim();
      }
      return null;
    } catch (error) {
      console.error('OpenAI API error:', error);
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
    // Try OpenAI API first
    let reply = await fetchReply(text);
    if (!reply) reply = fallbackResponse(text);
    setTimeout(() => {
      appendMessage(reply, false);
      saveMessage(reply, false);
    }, 300);
  }

  // Event listeners
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

    // Restore old messages
    const container = document.getElementById('chatMessages');
    if (container) {
      history.forEach(({ text, isUser }) => {
        appendMessage(text, isUser);
      });
    }
  });
})();
