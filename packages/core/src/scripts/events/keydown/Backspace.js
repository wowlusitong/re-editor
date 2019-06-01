import command from '~/commands';
import Table from '~/utils/table';

export default function({ editor, next }) {
  const focusBlock = editor.value.focusBlock;
  if (new Table(editor).table && editor.value.selection.focus.offset === 0) {
    event.preventDefault();
    return;
  }
  if (focusBlock.text === '' && focusBlock.type === 'listitem') {
    event.preventDefault();
    editor
      .setBlocks('paragraph')
      .unwrapBlock('unorderedlist')
      .unwrapBlock('orderedlist');
    return;
  }
  if (focusBlock.text === '' && focusBlock.type !== 'paragraph') {
    event.preventDefault();
    command(editor)('paragraph');
    return;
  }
  next();
}
