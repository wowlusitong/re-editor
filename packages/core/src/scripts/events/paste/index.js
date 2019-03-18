import image from './image';

export function getPasteType(transfer) {
  if (transfer.type === 'files' && transfer.files[0].type.includes('image')) {
    return 'image';
  }
  return transfer.type;
}

export default {
  image
};
