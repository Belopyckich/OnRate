import {Nullable} from '@src/typings';
import {FormInstance, FormItemProps, SelectProps} from 'antd';
import {RGBColor} from 'react-color';

export interface ColorPickerDialogProps {
    color?: Nullable<RGBColor>;
    onOkClicked(selectedColor: RGBColor): void;
}

export enum EColor {
    Standard = 'Standard',
    Negative = 'Negative',
    Attention = 'Attention',
    Positive = 'Positive',
    Custom = 'Custom',
}

export interface ColorPickerProps
    extends Omit<FormItemProps, 'name' | 'initialValue'> {
    initialValue?: RGBColor;
    name: string;
    form: FormInstance;
}

export interface ColorSelection {
    colorType: EColor;
    description: string;
    colorRGB: RGBColor;
}
