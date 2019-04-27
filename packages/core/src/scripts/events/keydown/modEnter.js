import { getForeFather } from '~/utils/utils';

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
  next();
}
