/**
 * Compresses an image file (or a base64 string) to a maximum width/height and quality
 * to avoid exceeding Firestore's 1MB document size limit.
 */
export function compressImage(
  fileOrBase64: File | string,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    let src: string;
    let isObjectURL = false;
    
    if (fileOrBase64 instanceof File) {
      src = URL.createObjectURL(fileOrBase64);
      isObjectURL = true;
    } else {
      src = fileOrBase64;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        let width = img.width;
        let height = img.height;

        // Resize maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          if (isObjectURL) URL.revokeObjectURL(src);
          reject(new Error("Could not get 2d context from canvas"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compressed jpeg format which is highly efficient
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        
        if (isObjectURL) URL.revokeObjectURL(src);
        resolve(compressedBase64);
      } catch (err) {
        if (isObjectURL) URL.revokeObjectURL(src);
        reject(err);
      }
    };

    img.onerror = (err) => {
      if (isObjectURL) URL.revokeObjectURL(src);
      reject(new Error("Failed to load image for compression"));
    };

    img.src = src;
  });
}
