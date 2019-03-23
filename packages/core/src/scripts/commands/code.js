export default function(editor) {
  editor.insertBlock({
    object: 'block',
    type: 'code',
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [{ text: '' }]
          }
        ]
      }
    ]
  });
}
