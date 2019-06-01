import { getForeFather } from '~/utils/utils';
import Table from '~/utils/table';

export default function({ editor, next, onChangeData }) {
  const forefater = getForeFather(editor);
  if (['code'].includes(forefater.type)) {
    onChangeData(
      d => d.setIn([forefater.key, 'isSelected'], false),
      () => {
        editor
          .moveToRangeOfNode(forefater)
          .moveToEnd()
          .insertBlock('paragraph')
          .unwrapBlock();
      }
    );
    return;
  }
  if (['table'].includes(forefater.type)) {
    onChangeData(
      d => d.setIn([forefater.key, 'isSelected'], false),
      () => {
        new Table(editor).jump();
      }
    );
    return;
  }
  next();
}
