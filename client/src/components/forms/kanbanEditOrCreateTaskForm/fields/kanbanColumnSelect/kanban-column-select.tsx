import {ColorOption} from '@src/components/colorOption/color-option';
import ColorPicker from '@src/components/dialogs/colorPicker/color-picker';
import {createKanbanColumn, editKanbanColumn} from '@src/redux/kanban/actions';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import {Button, Form, FormItemProps, Input, Select} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

export const KanbanColumnSelect = (props: FormItemProps) => {
    const columns = useSelector(selectKanbanColumns);

    const options = columns.map((column) => ({
        value: column._id,
        label: (
            <ColorOption colorRGB={column.color} description={column.title} />
        ),
    }));

    return (
        <Form.Item
            {...props}
            initialValue={
                props.initialValue || (columns.length > 0 && columns[0]._id)
            }
        >
            <Select allowClear={true} options={options} />
        </Form.Item>
    );
};
