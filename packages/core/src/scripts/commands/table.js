import Table from '~/utils/table';

export default function(editor, row, column) {
  if (new Table(editor).table) {
    return;
  }
  editor.insertBlock({
    object: 'block',
    type: 'table',
    nodes: [
      {
        object: 'block',
        type: 'tbody',
        nodes: Array.from({ length: row }).map(() => ({
          object: 'block',
          type: 'tr',
          nodes: Array.from({ length: column }).map(() => ({
            object: 'block',
            type: 'td'
          }))
        }))
      }
    ]
  });

  editor.moveToRangeOfNode(new Table(editor).table).moveToStart();
}
