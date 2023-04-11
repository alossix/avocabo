export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const aspectRatio = image.width / image.height;
      let newWidth: number;
      let newHeight: number;

      if (image.width > maxWidth || image.height > maxHeight) {
        if (image.width > image.height) {
          newWidth = maxWidth;
          newHeight = newWidth / aspectRatio;
        } else {
          newHeight = maxHeight;
          newWidth = newHeight * aspectRatio;
        }
      } else {
        newWidth = image.width;
        newHeight = image.height;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Image resizing failed"));
        }
      }, file.type);
    };
    image.onerror = (error) => {
      reject(error);
    };
  });
};
