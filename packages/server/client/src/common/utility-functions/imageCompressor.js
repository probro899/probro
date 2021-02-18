import imageCompression from 'browser-image-compression';

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 500,
  useWebWorker: true,
};

export default async (file) => {
  const compressedFile = await imageCompression(file, options);
  const fileNew = new File([compressedFile], 'test.jpeg', { type: compressedFile.type });
  return fileNew;
};
