export default function (editor, src, targetNodeKey) {
  const image = {
    object: 'inline',
    type: 'Image',
    isVoid: true,
    data: { src }
  }
  if (targetNodeKey) {
    editor.replaceNodeByKey(targetNodeKey, image)
  } else {
    editor.insertInline(image)
  }
}
