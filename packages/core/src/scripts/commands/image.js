export default function (editor, image) {
  editor.insertBlock({
    type: 'Image',
    isVoid: true,
    data: { src: image }
  })
  .insertBlock('paragraph')
}
