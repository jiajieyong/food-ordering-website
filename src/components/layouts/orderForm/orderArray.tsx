import { useFieldArray, useFormContext } from 'react-hook-form';
import { EmptyCart } from './emptyCart';
import { FormFieldRow } from "./formFieldRow";


export const OrderArray = () => {
    const { control } = useFormContext();
    const { fields, remove, update } = useFieldArray({
        control,
        name: 'items'
    });

    return (
        <>
            {fields.map((field, index) => (
                <FormFieldRow
                    key={field.id}
                    index={index}
                    value={field}
                    remove={remove}
                    update={update}
                />
                )
            )}
            {fields.length === 0 && <EmptyCart />
            }
        </>
    )
}