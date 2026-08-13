export class ImageUploadValidationError extends Error {
    translationKey;
    constructor(translationKey) {
        super(translationKey);
        this.translationKey = translationKey;
    }
}
export function normalizeImageUpload(file, constraints) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => {
            URL.revokeObjectURL(url);
            const width = image.naturalWidth;
            const height = image.naturalHeight;
            const aspectRatio = width / height;
            if ((constraints.minAspectRatio !== undefined && aspectRatio < constraints.minAspectRatio)
                || (constraints.maxAspectRatio !== undefined && aspectRatio > constraints.maxAspectRatio)) {
                reject(new ImageUploadValidationError('imageAspectRatioInvalid'));
                return;
            }
            if (width < (constraints.minWidth ?? 1)
                || height < (constraints.minHeight ?? 1)) {
                reject(new ImageUploadValidationError('imageResolutionTooSmall'));
                return;
            }
            if (width <= constraints.maxWidth && height <= constraints.maxHeight) {
                resolve(file);
                return;
            }
            const scale = Math.min(constraints.maxWidth / width, constraints.maxHeight / height);
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(width * scale);
            canvas.height = Math.round(height * scale);
            const context = canvas.getContext('2d');
            if (!context) {
                reject(new ImageUploadValidationError('imageReadError'));
                return;
            }
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new ImageUploadValidationError('imageReadError'));
                    return;
                }
                resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), {
                    type: 'image/webp',
                }));
            }, 'image/webp', 0.88);
        };
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new ImageUploadValidationError('imageReadError'));
        };
        image.src = url;
    });
}
