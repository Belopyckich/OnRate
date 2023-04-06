export interface FormDataCropParams {
    width: number;
    height: number;
    x: number;
    y: number;
}

export interface UploadFileCallbackProps {
    file: File;
    src: string;
    cropParams: FormDataCropParams;
}

export enum ImageEditorTitleType {
    Default = 'Загрузка новой фотографии',
    Edit = 'Редактирование новой фотографии',
}

export type ImageEditorDialogProps = {
    loadedImage: HTMLImageElement;
    imageNaturalSlideState: ImageNaturalSlideState;
    loadedFile: File;
    uploadFileCallback: (props: UploadFileCallbackProps) => void;
};

export interface ImageNaturalSlideState {
    width: number;
    height: number;
}
