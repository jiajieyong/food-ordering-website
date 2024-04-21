import { FormFieldProps, ValidRegisterName } from "@/types/form";

const FormField = ({
    type,
    name,
    register,
    error,
    value,
    valueAsNumber
}: FormFieldProps) => (
    <>
        <input
            type={type}
            value={value}
            {...register(name as ValidRegisterName, { valueAsNumber })}
        />
        {error && <span className="error-message">{error.message}</span>}
    </>
);
export default FormField;