import React from 'react';
import { withProps, fromRenderProps } from 'recompose';

import DataContext from '~/components/contexts/Data';
import ToolWrapper from '~/components/wrappers/ToolWrapper';
import tools from '~/components/tools';
import { isIgnoreWrapper } from '~/utils/utils';

@fromRenderProps(DataContext.Consumer, ({ data, onChangeData }) => ({
  data,
  onChangeData
}))
@withProps(props => {
  const { data, node, isSelected } = props;
  return {
    Tool: tools[node.type],
    isSelected: data.getIn([node.key, 'isSelected'], isSelected)
  };
})
export default class NodeWrapper extends React.Component {
  handleClick = () => {
    const { node, onChangeData } = this.props;

    onChangeData(d => d.setIn([node.key, 'isSelected'], true));
  };

  handleDeselect = () => {
    const { onChangeData, node } = this.props;
    onChangeData(d => d.setIn([node.key, 'isSelected'], false));
  };

  render() {
    const { node, editor, children, Tool, isSelected } = this.props;
    if (isIgnoreWrapper(node.type)) {
      return children;
    }
    return (
      <div
        onClick={this.handleClick}
        className={`node-wrapper node-wrapper-${node.type}`}
      >
        {children}
        {isSelected && Tool && (
          <ToolWrapper onClick={this.handleDeselect}>
            <Tool editor={editor} node={node} />
          </ToolWrapper>
        )}
      </div>
    );
  }
}
