import command from '~/commands';

export default function({ editor, next }) {
  const focusBlock = editor.value.focusBlock;
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
