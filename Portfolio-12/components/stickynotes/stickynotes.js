document.addEventListener('DOMContentLoaded', () => {
  const note = document.getElementById('note');
  const colorDots = document.querySelectorAll('.color-dot');

  // 🎨 Color changing
  colorDots.forEach(dot => {
    dot.style.backgroundColor = dot.dataset.color;

    dot.addEventListener('click', () => {
      note.style.backgroundColor = dot.dataset.color;
    });
  });

  // 🔁 Dragging logic
  let isDragging = false;
  let offsetX, offsetY;

  note.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - note.offsetLeft;
    offsetY = e.clientY - note.offsetTop;
    note.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      note.style.left = `${e.clientX - offsetX}px`;
      note.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    note.style.cursor = 'move';
  });
});
