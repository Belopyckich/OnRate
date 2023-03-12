declare module '*.scss' {
    const content: {[className: string]: string};
    export = content;
}

declare module '*.component.svg' {
    const content: any;
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.mp3' {
    const content: any;
    export default content;
}

declare let IS_DEV: boolean;
declare let IS_PROD: boolean;
declare let API_URL: string;
