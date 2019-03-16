import React from 'react';

export default class ImageUploader extends React.Component {
  handleFileUpload = (event) => {
    const { files } = event.target;
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      this.props.insertImage(reader.result)
    })
  }
  render() {
    return (
      <input
        id="re-editor-image-input"
        type="file"
        accept="image/*"
        onChange={this.handleFileUpload}
        />
    )
  }
}
