export const randomID = (): string => {
    // generate image id
    return Array(16)
        .fill(0)
        .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
        .join('') +
        Date.now().toString(24);
};