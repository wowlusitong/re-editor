import command from '~/commands';

export default function({ editor, next }) {
  const focusBlock = editor.value.focusBlock;
  console.debug('#', focusBlock.type);
  if (focusBlock.text === '' && focusBlock.type !== 'paragraph') {
    event.preventDefault();
    command(editor)('paragraph');
    return;
  }
  next();
}
