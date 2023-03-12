export const devLog = (error: any, errorPath?: string) => {
    if (IS_DEV) {
        console.error({error}, errorPath ?? '');
    }
};
