import React from 'react';

import Button from '~/components/Button';
import Context from '~/components/Context';
import * as Tools from '~/components/Tools';

export default class Toolbar extends React.Component {
  renderTool = name => {
    const Tool = Tools[name];
    return <Tool key={name} />;
  };

  render() {
    const { value, editor, tools } = this.props;
    return (
      <Context.Provider value={{ value, editor }}>
        <div className="toolbar-antd-cotnainer">
          {tools.map((tool, i) => {
            if (Array.isArray(tool)) {
              return (
                <Button.Group key={i}>
                  {tool.map(name => this.renderTool(name))}
                </Button.Group>
              );
            }
            return this.renderTool(tool);
          })}
        </div>
      </Context.Provider>
    );
  }
}
Toolbar.default = {
  tools: [
    ['bold', 'italic', 'underline', 'strikethrough'],
    ['orderedlist', 'unorderedlist'],
    ['heading'],
    ['align'],
    ['image', 'table', 'code'],
    ['undo', 'redo'],
    ['fullscreen']
  ]
};
