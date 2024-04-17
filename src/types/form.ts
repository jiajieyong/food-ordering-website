import { z, ZodType } from "zod";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export type FormData = {
    name: string;
    pricing: number;
    quantity: number;
};

export type FormFieldProps = {
    type: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    error: FieldError| undefined;
    value: string | number;
    valueAsNumber?: boolean;
};

export type ValidFieldNames =
| "name"
| "pricing"
| "quantity"

export const FieldSchema: ZodType<FormData> = z
.object({
    name: z.string(),
    pricing: z
        .number(),
    quantity: z
        .number()
        .min(1, { message: "Quantity must be at least 1"})
        .max(5, { message: "Limited to 5 per food item" }),
});

export const FormFieldSchema = z.object({
    orders: z.array(FieldSchema)
});