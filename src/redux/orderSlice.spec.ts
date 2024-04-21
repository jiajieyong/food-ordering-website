import axios from 'axios';
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
    postOrder,
    removeFromOrder,
    SubmissionState
} from "./orderSlice";
import { IQueueState } from "./queueSlice";
import { RootState } from './store';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
    items: { '123': 1 },
    queueNumber: [],
    submissionState: "READY" as SubmissionState,
};

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

        const afterReducerOperation = orderSlice(
            order,
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
        order.items = { '123': 5 }

        const afterReducerOperation = orderSlice(
            order,
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
        order.items = { '456': 3, '768': 1 }

        const afterReducerOperation = orderSlice(
            order,
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

describe("thunks", () => {
    const dispatch = jest.fn();

    const queue: IQueueState = {
        queueItems: {
            collection: null,
            preparing: []
        },
        status: 'IDLE',
    }

    const state: RootState = {
        order: order,
        menuItem: menuItem,
        queue: queue
    };

    const formInput: IFormValues = {
        items: [{identifier: '123', itemName: "mock", pricing: 123, quantity: 1}]
    }

    describe("post order w/mocked dispatch", () => {
        it("should fulfiled the order", async () => {
            const mockedResponse = {
                data: { queueNum: 1 },
                status: 200,
                statusText: 'OK',
            };

            const thunk = postOrder(formInput);
            jest.mock('axios');
            mockedAxios.post.mockResolvedValueOnce(mockedResponse);

            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual("order/post/pending");
            expect(calls[1][0].type).toEqual("order/post/fulfilled");
            expect(calls[1][0].payload.data).toEqual({ queueNum: 1 });
        });

        it("should reject if the order failed to be post", async () => {
            const thunk = postOrder(formInput);
            jest.mock('axios');
            const err = new Error('Wrong data set passed in');
            mockedAxios.post.mockRejectedValueOnce(err);

            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual("order/post/pending");
            expect(calls[1][0].type).toEqual("order/post/rejected");
        });
    });
})