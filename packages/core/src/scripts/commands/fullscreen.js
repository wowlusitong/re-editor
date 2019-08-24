export default function() {
  const container = document.querySelector('.re-editor-container');
  window.dispatchEvent(new Event('fullscreen'));
  if (Array.from(container.classList).includes('fullscreen')) {
    container.classList.remove('fullscreen');
  } else {
    container.classList.add('fullscreen');
  }
}
