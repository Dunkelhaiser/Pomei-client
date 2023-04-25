export const truncate = (text: string, length: number) => {
    if (text.length > length && length > 0) {
        return `${text.substring(0, length)}...`;
    }
    return text;
};
