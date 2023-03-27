export const getStringWithRightSeparator = (text: string | number) =>
    text ? String(text).replace(/[\s\n,;]/g, ',') : '';
