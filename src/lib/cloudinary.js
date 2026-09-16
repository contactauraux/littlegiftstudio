// Cloudinary Environment Configuration & Direct Upload Helper

const CLOUD_NAME = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim();
const UPLOAD_PRESET = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim();
const DEFAULT_FOLDER = 'littlegiftstudio/products';

export function isCloudinaryConfigured() {
  return Boolean(CLOUD_NAME && UPLOAD_PRESET && CLOUD_NAME !== 'your_cloud_name_here');
}

export function getCloudinaryConfig() {
  return {
    cloudName: CLOUD_NAME,
    uploadPreset: UPLOAD_PRESET,
    source: '.env',
  };
}

/**
 * Uploads a file directly to Cloudinary via REST API using .env credentials.
 * If credentials are not yet set in .env, falls back to a base64 DataURL for offline testing.
 */
export async function uploadToCloudinary(file, customFolder = '') {
  if (isCloudinaryConfigured()) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', customFolder || DEFAULT_FOLDER);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Cloudinary upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      url: data.secure_url || data.url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
    };
  }

  // Development / Offline Fallback before .env is populated:
  return new Promise((resolve, reject) => {
    if (typeof file === 'string') {
      resolve({ url: file });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result,
        isLocalFallback: true,
      });
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
