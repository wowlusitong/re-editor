import command from '~/commands';

export default async function({ transfer, editor, onImageUpload }) {
  const { files } = transfer;
  const file = files[0];
  if (onImageUpload) {
    const url = await onImageUpload(file);
    command(editor)('image', url);
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      command(editor)('image', reader.result);
    });
  }
}
