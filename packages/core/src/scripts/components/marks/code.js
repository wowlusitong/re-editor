import Prism from 'prismjs';

const languages = Prism.languages;
const types = Array.from(
  new Set(
    Object.keys(languages)
      .filter(v => typeof languages[v] === 'object')
      .reduce((types, lang) => types.concat(Object.keys(languages[lang])), [])
  )
);

export default types.reduce((marks, type) => {
  marks[type] = {
    name: 'span',
    props: {
      className: type
    }
  };
  return marks;
}, {});
