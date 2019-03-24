export default function({ editor, next }) {
  const focusBlock = editor.value.focusBlock;
  if (focusBlock.type === 'td') {
    return;
  }
  if (/h\d/.test(focusBlock.type)) {
    editor.insertBlock('paragraph');
    return;
  }
  if (focusBlock.type === 'listitem' && focusBlock.text === '') {
    editor
      .setBlocks('paragraph')
      .unwrapBlock('unorderedlist')
      .unwrapBlock('orderedlist');
    return;
  }
  next();
}
