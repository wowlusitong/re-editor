export default function(editor) {
  editor.insertBlock({
    object: 'block',
    type: 'table',
    nodes: [
      {
        object: 'block',
        type: 'tbody',
        nodes: [
          {
            object: 'block',
            type: 'tr',
            nodes: [
              {
                object: 'block',
                type: 'td'
              },
              {
                object: 'block',
                type: 'td'
              }
            ]
          },
          {
            object: 'block',
            type: 'tr',
            nodes: [
              {
                object: 'block',
                type: 'td'
              },
              {
                object: 'block',
                type: 'td'
              }
            ]
          }
        ]
      }
    ]
  });
}
