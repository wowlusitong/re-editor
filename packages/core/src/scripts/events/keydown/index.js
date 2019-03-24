import space from './space';

export function getKeyDownType(event) {
  return (
    {
      ' ': 'space'
    }[event.key] || event.key
  );
}

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce((nodes, v) => {
  nodes[v] = (change, event) => {
    event.preventDefault();
  };
  return nodes;
}, {});

export default {
  space,
  ...headings
};
