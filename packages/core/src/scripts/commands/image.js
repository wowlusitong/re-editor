export default function(editor, src) {
  const image = {
    object: 'inline',
    type: 'Image',
    isVoid: true,
    data: { src }
  };
  if (window.replaceNodeKey) {
    editor.replaceNodeByKey(window.replaceNodeKey, image);
    window.replaceNodeKey = null;
  } else {
    editor.insertInline(image);
  }
}
