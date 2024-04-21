import menuItemsSlice, { initialState, receivedMenuItems } from "./menuItemSlice";

describe("tests for menuItemsSlice", () => {
    test("initialize slice with initialValue", () => {
        const menuItemsSliceInit = menuItemsSlice(initialState, { type: "unknown" });
        expect(menuItemsSliceInit).toBe(initialState);
    });

    test("receivedMenuItems", () => {
        const item: IMenuItem = {
                id: '123',
                name: 'Bee hoon',
                pricing: 4.5,
                description: "Testing my bee hoon",
                category: 'Noodle',
                imagePath: 'beehoon.jpg',
        };
        const menuItems = { '123': item };

        const afterReducerOperation = menuItemsSlice(
            initialState,
            receivedMenuItems([item])
        );
        expect(afterReducerOperation).toStrictEqual({
            menuItems
        });
    });
});