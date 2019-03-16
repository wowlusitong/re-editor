import command from '~/commands';

export default function ({ transfer, change, editor }) {
  const { files } = transfer;
  const file = files[0];
  const reader = new FileReader()
  reader.readAsDataURL(file);
  reader.addEventListener('load', () => {
    command(editor)('image', reader.result);
  })
}
