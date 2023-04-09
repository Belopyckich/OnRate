import {UserToUpdate} from '@src/components/forms/userSettingsForm/interfaces';
import {DATE_FORMAT} from '@src/constants/date-formats';
import dayjs from 'dayjs';

export const createUpdatedUserFormData = ({
    id,
    picture,
    name,
    country,
    city,
    dob,
    email,
}: UserToUpdate) => {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('id', id);
    formData.append('name', name);

    if (dob) {
        formData.append('dob', dob?.format(DATE_FORMAT));
    }

    formData.append(
        'location',
        JSON.stringify({
            country,
            city,
        }),
    );

    if (picture?.file || typeof picture === null) {
        console.log(picture?.file, 'picture?.file');
        formData.append('file', picture?.file || JSON.stringify(null));

        if (picture?.cropParams) {
            formData.append('crop', JSON.stringify(picture.cropParams));
        }
    }

    return formData;
};
