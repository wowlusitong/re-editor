export default function({ editor }, event) {
  event.preventDefault();
  editor.insertText(' '.repeat(2));
}
