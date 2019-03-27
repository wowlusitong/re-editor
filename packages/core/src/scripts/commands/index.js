import { basicMarks } from '~/components/marks';
import { basicNodes } from '~/components/nodes';
import { hasBlock } from '~/utils/utils';

import image from './image';
import table from './table';
import code from './code';

function marks() {
  return Object.keys(basicMarks).reduce((commands, type) => {
    commands[type] = editor => {
      editor.toggleMark(type);
    };
    return commands;
  }, {});
}

function blocks() {
  return Object.keys(basicNodes).reduce((commands, type) => {
    commands[type] = editor => {
      editor.setBlocks(type).focus();
    };
    return commands;
  }, {});
}

function list() {
  return ['unorderedlist', 'orderedlist'].reduce((commands, type) => {
    commands[type] = editor => {
      if (hasBlock(editor.value, 'listitem')) {
        editor.setBlocks('paragraph').unwrapBlock(type);
      } else {
        editor.setBlocks('listitem').wrapBlock(type);
      }
    };
    return commands;
  }, {});
}

const commands = {
  ...marks(),
  ...blocks(),
  ...list(),
  undo: editor => editor.undo(),
  redo: editor => editor.redo(),
  'image-local': () => document.querySelector('#re-editor-image-input').click(),
  image,
  table,
  code
};

export default function(editor) {
  return (type, ...rest) => {
    commands[type](editor, ...rest);
  };
}
