import _ from 'lodash';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface IProps {
    menu: { [id: string]: IMenuItem },
    handleChange: (item: string) => void,
}

export const MenuDropDown = ({menu, handleChange} : IProps) => {
    const menuGroup = Object.groupBy(Object.values(menu), ({ category}) => category);

    return (
        <Select onValueChange={(e) => handleChange(e)}>
            <SelectTrigger className="w-[280px] my-4">
                <SelectValue placeholder="Select a menu item" />
            </SelectTrigger>
            <SelectContent className="bg-white">
                {
                    Object.entries(menuGroup).map(([category, items], index) => {
                        return (
                            <SelectGroup key={index}>
                                <SelectLabel>{_.startCase(category).toString()}</SelectLabel>
                                {
                                    items && items.map((item: IMenuItem, index: number) => {
                                        return <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                                    })
                                }
                            </SelectGroup>
                        )
                    })
                }
            </SelectContent>
        </Select>
    )
}