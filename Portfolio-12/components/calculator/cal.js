
src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.20.0/dist/tf.min.js";
src="https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose@0.0.7/dist/handpose.min.js";


  let model = null;
  let webcamStream = null;
  let features = {
    theme: false,
    memory: false,
    keyboard: false,
  };
  let memoryValue = null;
  let lastClickedBtn = null;

  function toggleFeature(type) {
    features[type] = !features[type];
    const icon = document.getElementById(`icon-${type}`);
    icon.classList.toggle('active', features[type]);

    switch (type) {
      case 'theme':
        toggleTheme();
        break;

      case 'memory':
        if (features.memory) {
          memoryValue = display.value;
          alert(`Memory stored: ${memoryValue}`);
        } else {
          memoryValue = null;
          alert('Memory cleared');
        }
        break;

      case 'keyboard':
        if (features.keyboard) {
          document.getElementById('webcam').classList.remove('hidden');
          initHandTracking();
        } else {
          stopHandTracking();
          document.getElementById('webcam').classList.add('hidden');
        }
        break;
    }
  }

  // Enable camera + load model
  async function initHandTracking() {
    const video = document.getElementById('webcam');
    try {
      webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = webcamStream;
    } catch (err) {
      alert("Please allow camera access!");
      return;
    }

    model = await handpose.load();
    console.log("✅ Handpose model loaded");

    detectFinger(video);
  }

  function stopHandTracking() {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
    }
    document.getElementById('webcam').srcObject = null;
  }

  async function detectFinger(video) {
    const loop = async () => {
      if (!features.keyboard) return;

      const predictions = await model.estimateHands(video);
      if (predictions.length > 0) {
        const [x, y] = predictions[0].landmarks[8]; // Index fingertip
        const btn = getButtonUnderFinger(x, y);
        if (btn && btn !== lastClickedBtn) {
          lastClickedBtn = btn;
          btn.classList.add('hovered-btn');
          btn.click();
          setTimeout(() => btn.classList.remove('hovered-btn'), 500);
        }
      }

      requestAnimationFrame(loop);
    };
    loop();
  }

  // Match finger position to calculator button
  function getButtonUnderFinger(x, y) {
    const buttons = document.querySelectorAll(".calc-btn, .bg-orangeBtn");
    for (let btn of buttons) {
      const rect = btn.getBoundingClientRect();
      if (
        x >= rect.left && x <= rect.right &&
        y >= rect.top && y <= rect.bottom
      ) {
        return btn;
      }
    }
    return null;
  }

