import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

type FormData = {
    itemName: string;
    pricing: number;
    quantity: number;
};

export type ValidRegisterName =
    | "items"
    | `items.${number}`
    | `items.${number}.itemName`
    | `items.${number}.pricing`
    | `items.${number}.quantity`
    | `items.${number}.identifier`

export type FormFieldProps = {
    type: string;
    name: ValidRegisterName;
    register: UseFormRegister<IFormValues>;
    error: FieldError| undefined;
    value: string | number;
    valueAsNumber?: boolean;
};

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