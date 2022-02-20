export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
};
