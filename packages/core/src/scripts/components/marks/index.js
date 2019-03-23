import { generateElementComponents } from '~/utils/utils';
import code from './code';

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
  ...generateElementComponents(basicMarks),
  ...generateElementComponents(code)
};
