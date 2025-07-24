// 🕒 Update Clock & Date
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  clock.innerHTML = `${timeString}<br><span style="font-size: 12px">${dateString}</span>`;
}
setInterval(updateClock, 1000);
updateClock();

// 🌤️ Weather with OpenWeatherMap (city name fallback method)
const API_KEY = '5b0fb6ddf8f1269e8c279e56bfc6604f';
const CITY = 'Mumbai';

function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  console.log("📡 Calling API:", url);

  fetch(url)
    .then(res => {
      console.log("✅ Status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("🌦️ Response JSON:", data);
      if (!data || !data.main || !data.name) throw new Error("⚠️ Invalid data structure");

      const temp = Math.round(data.main.temp);
      const cityName = data.name;

      document.getElementById('weather-temp').textContent = `🌡️ ${temp}°C`;
      document.getElementById('weather-city').textContent = cityName;
    })
    .catch(err => {
      console.error("❌ Weather Fetch Error:", err.message);
      document.getElementById('weather-temp').textContent = 'N/A';
      document.getElementById('weather-city').textContent = '';
    });
}

fetchWeatherByCity(CITY);

// ⏰ Beautiful large digital clock on landing page (left side)
function setupBigClock() {
  const wrapper = document.createElement('div');
  wrapper.id = 'big-clock-wrapper';
  wrapper.style.position = 'absolute';
  wrapper.style.left = '40px';
  wrapper.style.top = '40px';
  wrapper.style.padding = '20px 30px';
  wrapper.style.borderRadius = '20px';
  wrapper.style.background = 'rgba(255, 255, 255, 0.05)';
  wrapper.style.backdropFilter = 'blur(16px)';
  wrapper.style.boxShadow = '0 4px 18px rgba(0,0,0,0.3)';
  wrapper.style.color = 'white';
  wrapper.style.textAlign = 'center';
  wrapper.style.zIndex = '998';
  wrapper.style.cursor = 'move';

  const bigClock = document.createElement('div');
  bigClock.id = 'big-clock';
  bigClock.style.fontSize = '64px';
  bigClock.style.fontWeight = '700';
  bigClock.style.fontFamily = 'monospace';
  bigClock.style.textShadow = '2px 2px 8px rgba(0,0,0,0.4)';

  const dateBox = document.createElement('div');
  dateBox.id = 'big-date';
  dateBox.style.fontSize = '22px';
  dateBox.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
  dateBox.style.marginTop = '10px';
  dateBox.style.color = '#f9f9f9';

  wrapper.appendChild(bigClock);
  wrapper.appendChild(dateBox);
  document.body.appendChild(wrapper);

  setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = now.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
    bigClock.textContent = time;
    dateBox.textContent = date;
  }, 1000);

  // Make the clock card draggable
  let offsetX, offsetY, isDragging = false;

  wrapper.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - wrapper.offsetLeft;
    offsetY = e.clientY - wrapper.offsetTop;
    wrapper.style.transition = 'none';
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    wrapper.style.left = `${e.clientX - offsetX}px`;
    wrapper.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });
}

setupBigClock();

// 📌 Expandable About Column on Right
function setupAboutColumn() {
  const aboutCol = document.createElement('div');
  aboutCol.id = 'about-column';
  aboutCol.innerHTML = `
    <div class="about-label">ABOUT</div>
    <div class="about-content">
      <img src="/assets/images/profile.jpg" alt="Profile" class="about-pic">
      <h1 class="about-name">T T K Urshitha Sai</h1>
      <h3 class="designation">Software Developer | AI/ML Enthusiast</h3>
      <p class="bio"> Motivated student with a strong willingness to translate academic knowledge into impactful real-world applications.
 Demonstrates effective communication skills and a collaborative mindset, contributing fresh perspectives and a robust
 work ethic to team environments.</p>
      <p class="skills">Skills: Web Development | C Programming | UI/UX (Figma) | AI/ML | Python | MySQL | Teamwork</p>
    </div>
  `;
  document.body.appendChild(aboutCol);

  const style = document.createElement('style');
  style.textContent = `
    #about-column {
      position: absolute;
      top: 40px;
      right: 0;
      bottom: 100px;
      width: 50px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(16px);
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: -2px 0 12px rgba(0, 0, 0, 0.2);
      transition: width 0.4s ease;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 30px;
      z-index: 999;
    }
    #about-column:hover {
      width: 280px;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    .about-label {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      color: white;
      font-size: 14px;
      letter-spacing: 3px;
    }
    .about-content {
      display: none;
      text-align: center;
      color: white;
    }
    #about-column:hover .about-label {
      display: none;
    }
    #about-column:hover .about-content {
      display: block;
    }
    .about-name {
      font-size: 18px;
      margin-bottom: 10px;
      font-weight: bold;
      text-align: center;
    }
    .about-pic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 10px;
    }
    .designation {
      font-size: 16px;
      margin: 8px 0;
      font-weight: bold;
    }
    .bio {
      font-size: 14px;
      line-height: 1.5;
      padding: 0 10px;
      text-align: justify;
    }
    .skills {
      font-size: 12px;
      padding: 10px 10px 0;
      color: #ddd;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
}

setupAboutColumn();

