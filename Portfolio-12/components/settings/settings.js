// === SETTINGS PAGE SCRIPT ===
const brightnessRange = document.getElementById("brightnessRange");
const themeToggle = document.getElementById("themeToggle");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const closeBtn = document.getElementById("closeBtn");

// Load saved settings
window.addEventListener("DOMContentLoaded", () => {
  const savedBrightness = localStorage.getItem("brightness") || 100;
  const darkMode = localStorage.getItem("darkMode") === "true";
  brightnessRange.value = savedBrightness;
  document.body.style.filter = `brightness(${savedBrightness}%)`;
  document.body.classList.toggle("dark-mode", darkMode);
  document.body.classList.toggle("light-mode", !darkMode);
  themeToggle.checked = darkMode;

  loadNews();
});

// Brightness change
brightnessRange.addEventListener("input", () => {
  const val = brightnessRange.value;
  document.body.style.filter = `brightness(${val}%)`;
  localStorage.setItem("brightness", val);
});

// Dark/Light toggle
themeToggle.addEventListener("change", () => {
  const isDark = themeToggle.checked;
  document.body.classList.toggle("dark-mode", isDark);
  document.body.classList.toggle("light-mode", !isDark);
  localStorage.setItem("darkMode", isDark);
});

// Full screen
fullscreenBtn.addEventListener("click", () => {
  const docElm = document.documentElement;
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
    localStorage.setItem("fullscreen", true);
  }
});

// Close settings
closeBtn.addEventListener("click", () => {
  window.location.href = "../landingpage/landingpage.html";
});

// Load news from TheNewsAPI
function loadNews() {
  const grid = document.getElementById("newsGrid");
  const apiKey = "JLHls1MYvjSMBIM7PW4SL2yQrkFyIQ6AozGjLTxr";
  const url = `https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}&language=en`;

  fetch(url)
    .then(r => {
      console.log("Fetch status:", r.status);
      return r.json();
    })
    .then(data => {
      console.log("News data count:", data.data?.length, data.data);
      grid.innerHTML = "";
      if (Array.isArray(data.data) && data.data.length > 0) {
        data.data.slice().reverse().forEach(article => {
          const item = document.createElement("div");
          item.className = "news-item";
          item.innerHTML = `
            <img src="${article.image_url || 'https://via.placeholder.com/300'}" class="news-img" />
            <h4>${article.title}</h4>
            <a href="${article.url}" target="_blank">Read more →</a>`;
          grid.appendChild(item);
        });
      } else {
        grid.innerHTML = "<p>No more news available.</p>";
      }
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = `<p>Error: ${err.message}</p>`;
    });
}
