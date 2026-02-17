(() => {
  const chatToggle = document.getElementById("chatToggle");
  const chatPanel = document.getElementById("chatPanel");
  const chatClose = document.getElementById("chatClose");
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");

  const SASHANK_DATA = Object.freeze({
    projects: [
      {
        name: "n8n AI News Agent",
        description:
          "Automated AI news agent that uses SerpApi, RSS feeds, and Google Gemini 1.5 to synthesize and email daily technical news via Gmail.",
        link: "https://github.com/Sashankdanda/n8n-ai-news-agent",
        tags: ["n8n", "SerpApi", "RSS", "Gemini 1.5", "Gmail API"],
      },
      {
        name: "LinkedIn Automation",
        description:
          "AI-powered social workflow that converts article links into LinkedIn posts using n8n, Google Gemini, and the LinkedIn API.",
        link: "https://github.com/Sashankdanda/ai-social-media-automation",
        tags: ["n8n", "LinkedIn API", "Gemini", "Automation"],
      },
      {
        name: "AI Audio Generator",
        description:
          "Text-to-speech pipeline integrating the Murf API with n8n to generate high-quality voiceovers from text.",
        link: null,
        tags: ["n8n", "Murf API", "TTS"],
      },
    ],
    skills: [
      "Java",
      "Python",
      "C++",
      "React",
      "Redux",
      "MongoDB",
      "AWS Certified Cloud Practitioner",
    ],
    github: "https://github.com/Sashankdanda",
  });

  function openChat() {
    if (chatPanel.classList.contains("hidden")) {
      if (!chatPanel.dataset.seeded) {
        appendMessage(
          "ai",
          "Hi, I’m Sashank AI. Ask about my projects, skills, or GitHub."
        );
        chatPanel.dataset.seeded = "true";
      }
      chatPanel.classList.remove("hidden");
      chatPanel.classList.remove("chat-animate-in");
      void chatPanel.offsetWidth; // reflow for animation restart
      chatPanel.classList.add("chat-animate-in");
      chatInput?.focus();
    }
  }
  function closeChat() {
    chatPanel.classList.add("hidden");
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function appendMessage(role, text) {
    const wrap = document.createElement("div");
    if (role === "ai") {
      wrap.className = "flex items-start gap-2";
      wrap.innerHTML =
        '<div class="h-7 w-7 rounded-full bg-gradient-to-tr from-brand to-indigo-500 grid place-items-center text-white text-[10px] font-bold">AI</div>' +
        '<div class="max-w-[75%] rounded-2xl px-3 py-2 bg-white/70 dark:bg-neutral-800/70 border border-white/40 dark:border-neutral-700 text-sm">' +
        escapeHtml(text) +
        "</div>";
    } else {
      wrap.className = "flex items-start gap-2 justify-end";
      wrap.innerHTML =
        '<div class="max-w-[75%] rounded-2xl px-3 py-2 bg-brand text-white text-sm">' +
        escapeHtml(text) +
        "</div>";
    }
    chatMessages.appendChild(wrap);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function normalize(text) {
    return text.toLowerCase();
  }

  function answerFromKnowledge(query) {
    const q = normalize(query);

    if (/\bgit(hub)?\b/.test(q)) {
      return `You can explore my work on GitHub here: ${SASHANK_DATA.github}`;
    }
    if (/\b(skills?|tech|stack)\b/.test(q)) {
      return `My technical skills: ${SASHANK_DATA.skills.join(", ")}.`;
    }
    if (/news|serpapi|rss|gemini|gmail|daily/i.test(q)) {
      const p = SASHANK_DATA.projects[0];
      return `${p.name}: ${p.description} Repo: ${p.link}`;
    }
    if (/linkedin|social|post|automation/i.test(q)) {
      const p = SASHANK_DATA.projects[1];
      return `${p.name}: ${p.description} Repo: ${p.link}`;
    }
    if (/audio|voice|speech|tts|murf/i.test(q)) {
      const p = SASHANK_DATA.projects[2];
      return `${p.name}: ${p.description}`;
    }
    if (/projects|work|portfolio/i.test(q)) {
      const lines = SASHANK_DATA.projects
        .map((p) => `• ${p.name}${p.link ? ` — ${p.link}` : ""}`)
        .join("\n");
      return `Here are a few highlighted projects:\n${lines}`;
    }
    return null;
  }

  chatToggle?.addEventListener("click", () => {
    if (chatPanel.classList.contains("hidden")) openChat();
    else closeChat();
  });
  chatClose?.addEventListener("click", closeChat);

  chatForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = chatInput.value.trim();
    if (!val) return;
    appendMessage("user", val);
    chatInput.value = "";

    const local = answerFromKnowledge(val);
    if (local) {
      appendMessage("ai", local);
      return;
    }
    // Fallback placeholder – backend not connected
    setTimeout(() => {
      appendMessage(
        "ai",
        "Thanks for your message. I’ll follow up soon. You can also reach me at sashankdanda00@gmail.com."
      );
    }, 350);
  });

  window.SASHANK_DATA = SASHANK_DATA; // optional global for debugging
})();
