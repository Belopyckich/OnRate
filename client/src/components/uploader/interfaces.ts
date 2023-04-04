export interface DrawImageToMinResolution {
    image: HTMLImageElement;
    minWidth: number;
}

export interface SetLoadedFileWithoutExifParamsProps {
    file: File;
    image: HTMLImageElement;
    setLoadedFile: React.Dispatch<React.SetStateAction<File>>;
}
