import {  Menubar, MenubarCheckboxItem, MenubarContent, MenubarLabel, MenubarMenu, MenubarTrigger} from '../ui/menubar';
import { Button } from '../ui/button';
import { ListFilter } from  "lucide-react";

interface IProps {
    list: string[],
    filterList: string[],
    handleChange: (item: string) => void,
}

export function Filter({list, filterList, handleChange}: IProps) {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                    >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span>Filter</span>
                    </Button>
                </MenubarTrigger>
                <MenubarContent align="end">
                    <MenubarLabel>Filter by</MenubarLabel>
                    {list.map((item) => (
                        <MenubarCheckboxItem
                            className="MenubarCheckboxItem inset"
                            key={item}
                            checked={filterList.includes(item)}
                            onCheckedChange={() => handleChange(item)}
                        >
                            {item}
                        </MenubarCheckboxItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};