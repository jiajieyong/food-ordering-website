import { z, ZodType } from "zod";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export type FormData = {
    itemName: string;
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
| "itemName"
| "pricing"
| "quantity"

export const FieldSchema: ZodType<FormData> = z
.object({
    itemName: z.string(),
    pricing: z
        .number(),
    quantity: z
        .number()
        .min(1, { message: "Quantity must be at least 1"})
        .max(5, { message: "Limited to 5 per food item" }),
});

export const FormFieldSchema = z.object({
    items: z.array(FieldSchema).nonempty({
        message: "Order cannnot be empty!",
    }).max(2, {message: "Limited to 2 food orders"})
});