import { MenuItemsState } from "./menuItemSlice";
import orderSlice, {
    addToOrder,
    decrementQuantity,
    dequeue,
    getMemoizedNumItems,
    getTotalPrice,
    incrementQuantity,
    initialState,
    OrderState,
    removeFromOrder,
    SubmissionState,
} from "./orderSlice";
import { RootState } from './store';

describe("tests for orderSlice", () => {
    test("initialize slice with initialValue", () => {
        const orderSliceInit = orderSlice(initialState, { type: "unknown" });
        expect(orderSliceInit).toBe(initialState);
    });

    test("addToOrder", () => {
        const orderId = '123';

        const afterReducerOperation = orderSlice(
            initialState,
            addToOrder(orderId)
        );

        expect(afterReducerOperation).toStrictEqual({
            items: {'123': 1},
            queueNumber: [],
            submissionState: "READY",
        });
    });

    test("incrementQuantity", () => {
        const orderId = '123';
        const currentState = {
            items: {'123': 1},
            queueNumber: [],
            submissionState: "READY" as SubmissionState,
        }

        const afterReducerOperation = orderSlice(
            currentState,
            incrementQuantity(orderId)
        );

        expect(afterReducerOperation).toStrictEqual({
            items: {'123': 2},
            queueNumber: [],
            submissionState: "READY",
        });
    });

    test("decrementQuantity", () => {
        const orderId = '123';
        const currentState = {
            items: {'123': 5},
            queueNumber: [],
            submissionState: "READY" as SubmissionState,
        }

        const afterReducerOperation = orderSlice(
            currentState,
            decrementQuantity(orderId)
        );

        expect(afterReducerOperation).toStrictEqual({
            items: {'123': 4},
            queueNumber: [],
            submissionState: "READY",
        });
    });

    test("removeFromOrder", () => {
        const orderId = '123';
        const currentState = {
            items: {'123': 5, '456': 3, '768': 1},
            queueNumber: [],
            submissionState: "READY" as SubmissionState,
        }

        const afterReducerOperation = orderSlice(
            currentState,
            removeFromOrder(orderId)
        );

        expect(afterReducerOperation).toStrictEqual({
            items: {'456': 3, '768': 1},
            queueNumber: [],
            submissionState: "READY",
        });
    });

    test("dequeue", () => {
        const currentState = {
            items: {},
            queueNumber: [4, 8, 10],
            submissionState: "READY" as SubmissionState,
        }

        const afterReducerOperation = orderSlice(
            currentState,
            dequeue()
        );

        expect(afterReducerOperation).toStrictEqual({
            items: {},
            queueNumber: [8, 10],
            submissionState: "READY",
        });
    });
});

describe("selectors", () => {
    describe("getMemoizedNumItems", () => {
        it("should return 0 when there are no items", () => {
            const order: OrderState = {
                items: {},
                queueNumber: [],
                submissionState: "READY" as SubmissionState,
            }
            const result = getMemoizedNumItems({ order } as RootState);
            expect(result).toEqual(0);
        });

        it("should add up the total", () => {
            const order: OrderState = {
                items: { '123': 3, '456': 7 },
                queueNumber: [],
                submissionState: "READY" as SubmissionState,
            };
            const result = getMemoizedNumItems({ order } as RootState);
            expect(result).toEqual(10);
        });
    });

    describe("getTotalPrice", () => {
        it("should add up the total of product of quantity and pricing", () => {
            const menuItem: MenuItemsState = {
                menuItems: {
                    ['123'] : {
                        id: '123',
                        name: 'Bee hoon',
                        pricing: 4.5,
                        description: "Testing my bee hoon",
                        category: 'Noodle',
                        imagePath: 'beehoon.jpg',
                    },
                    ['456'] : {
                        id: '123',
                        name: 'Chicken rice',
                        pricing: 5.5,
                        description: "Hainanese Chicken Rice",
                        category: 'Rice',
                        imagePath: 'chickenRice.jpg',
                    },
                }
            }

            const order: OrderState = {
                items: { '123': 3, '456': 2},
                queueNumber: [],
                submissionState: "READY" as SubmissionState,
            };
            const result = getTotalPrice({ order, menuItem } as RootState);
            expect(result).toEqual("24.50");
        });
    });
})