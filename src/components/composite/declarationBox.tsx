import { Checkbox } from '@/components/ui/checkbox';

export function DeclarationBox() {
    return (
        <div className="items-top flex space-x-2">
            <Checkbox id="terms1" required={true}/>
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    I agree I have no food allergy
                </label>
            </div>
        </div>
    )
}