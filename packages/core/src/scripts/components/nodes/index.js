import { generateElementComponents } from '~/utils/utils';
import Image from './Image';

export const basicNodes = {
  paragraph: { name: 'div' },
  h1: { name: 'h1' },
  h2: { name: 'h2' },
  h3: { name: 'h3' },
  h4: { name: 'h4' },
  h5: { name: 'h5' },
  h6: { name: 'h6' },
  table: { name: 'table' },
  tbody: { name: 'tbody' },
  thead: { name: 'thead' },
  tr: { name: 'tr' },
  th: { name: 'th' },
  td: { name: 'td' },
  listitem: { name: 'li' },
  'align-right': {
    name: 'div',
    props: {
      className: 'align-right'
    }
  },
  'align-center': {
    name: 'div',
    props: {
      className: 'align-center'
    }
  },
  'align-left': {
    name: 'div',
    props: {
      className: 'align-left'
    }
  },
  'align-justify': {
    name: 'div',
    props: {
      className: 'align-justify'
    }
  }
};

const list = {
  unorderedlist: { name: 'ul' },
  orderedlist: { name: 'ol' }
};

export default {
  Image,
  ...generateElementComponents({ ...basicNodes, ...list })
};
