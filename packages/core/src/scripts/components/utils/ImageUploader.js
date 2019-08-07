import React from 'react';
import { fromRenderProps } from 'recompose';

import DataContext from '~/components/contexts/Data';

@fromRenderProps(DataContext.Consumer, ({ data, onChangeData }) => ({
  data,
  onChangeData
}))
export default class ImageUploader extends React.Component {
  handleClick = event => {
    event.target.value = null;
  };

  handleFileUpload = async event => {
    const { insertImage, onImageUpload } = this.props;
    const { files } = event.target;
    const file = files[0];
    if (file) {
      if (onImageUpload) {
        const url = await onImageUpload(file);
        insertImage(url);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          insertImage(reader.result);
        });
      }
    }
  };

  render() {
    return (
      <input
        id="re-editor-image-input"
        type="file"
        accept="image/*"
        onChange={this.handleFileUpload}
        onClick={this.handleClick}
        style={{ display: 'none' }}
      />
    );
  }
}
