import command from '~/commands';
import { getMarkdownType } from '~/utils/utils';

export default function({ editor, next }) {
  const focusBlock = editor.value.focusBlock;
  const type = getMarkdownType(focusBlock.text);
  if (type) {
    event.preventDefault();
    command(editor)(type);
    editor.moveToRangeOfNode(focusBlock).delete();
  }
  next();
}
