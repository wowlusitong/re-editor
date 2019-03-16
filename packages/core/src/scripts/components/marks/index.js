import { generateElementComponents } from '~/utils/utils';

export const basicMarks = {
  bold: { name: 'strong' },
  italic: { name: 'em' },
  span: { name: 'span' },
  underline: { name: 'u' },
  superscript: { name: 'sup' },
  subscript: { name: 'sub' },
  strikethrough: { name: 'del' }
};

export default {
  ...generateElementComponents(basicMarks)
};
