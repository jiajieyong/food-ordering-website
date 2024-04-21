import axios from 'axios';
import { MenuItemsState } from "./menuItemSlice";
import  { OrderState, SubmissionState } from "./orderSlice";
import { getQueue, IQueueState } from "./queueSlice";
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

describe("thunks", () => {
    const dispatch = jest.fn();

    describe("get queueNum w/mocked dispatch", () => {
        it("should fulfiled the get request", async () => {
            const mockedResponse = {
                data: {
                    collection: 1,
                    preparing: []
                },
                status: 200,
                statusText: 'OK',
            };

            const thunk = getQueue();
            jest.mock('axios');
            mockedAxios.get.mockResolvedValueOnce(mockedResponse);

            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual("queue/get/pending");
            expect(calls[1][0].type).toEqual("queue/get/fulfilled");
            expect(calls[1][0].payload).toEqual({
                collection: 1,
                preparing: []
            });
        });

        it("should reject if the get request failed", async () => {
            const thunk = getQueue();
            jest.mock('axios');
            const err = new Error('Wrong data set passed in');
            mockedAxios.get.mockRejectedValueOnce(err);

            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock;
            expect(calls).toHaveLength(2);
            expect(calls[0][0].type).toEqual("queue/get/pending");
            expect(calls[1][0].type).toEqual("queue/get/rejected");
        });
    });
})