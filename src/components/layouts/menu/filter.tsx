import { ListFilter } from  "lucide-react";
import { Button } from '@/components/ui/button';
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarLabel, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

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
                <MenubarContent align="end" className="bg-white">
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