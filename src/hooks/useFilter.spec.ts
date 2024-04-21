import { renderHook } from "@testing-library/react";
import { updateFilter, useFilterItems, useFilterOptions } from './useFilter';

const sidesOnly = [
    {
        id: '456',
        name: 'Fries',
        pricing: 5.5,
        description: "mock",
        category: 'sideDish',
        imagePath: 'chickenRice.jpg',
    },
    {
        id: '789',
        name: 'Fried mock',
        pricing: 5.5,
        description: "mock dish",
        category: 'sideDish',
        imagePath: 'mockImage.jpg',
    },
];

const riceOnly = [
    {
        id: '456',
        name: 'Chicken rice',
        pricing: 5.5,
        description: "mock",
        category: 'Rice',
        imagePath: 'chickenRice.jpg',
    },
    {
        id: '789',
        name: 'Fried rice',
        pricing: 5.5,
        description: "mock meat",
        category: 'Rice',
        imagePath: 'mockImage.jpg',
    },
];

const noodleOnly = [
    {
        id: '123',
        name: 'Bee hoon',
        pricing: 4.5,
        description: "Testing my bee hoon",
        category: 'Noodle',
        imagePath: 'beehoon.jpg',
    },
    {
        id: '124',
        name: 'Mock noodles',
        pricing: 4.5,
        description: "Testing mock",
        category: 'Noodle',
        imagePath: 'mocky.jpg',
    },
]

describe("useFilter", () => {
    describe("useFilterItem", () => {
        const menuItems = riceOnly.concat(noodleOnly).concat(sidesOnly);
        describe("when all is selected", () => {
            it('should return the full menu items', () => {
                const { result } = renderHook(() => useFilterItems(menuItems, ['All']));
                expect(result.current).toStrictEqual(menuItems);
            });
        });

        describe("When a single option is selected", () => {
            it("should return rice only, when rice is selected", () => {
                const { result } = renderHook(() => useFilterItems(menuItems, ['Rice']));
                expect(result.current).toStrictEqual(riceOnly);
            });

            it("should return noodle only, when noodle is selected", () => {
                const { result } = renderHook(() => useFilterItems(menuItems, ['Noodle']));
                expect(result.current).toStrictEqual(noodleOnly);
            });

            it("should return side dishes only, when side dish is selected", () => {
                const { result } = renderHook(() => useFilterItems(menuItems, ['sideDish']));
                expect(result.current).toStrictEqual(sidesOnly);
            });
        });

        describe("When multiple options are selected", () => {
            it("should return rice + noodle, when rice + noodle are selected", () => {
                const { result } = renderHook(() => useFilterItems(menuItems, ['Rice', 'Noodle']));
                expect(result.current).toStrictEqual(riceOnly.concat(noodleOnly));
            });

            it("should return noodle + side dish only, when noodle + side dish selected", () => {
                const { result } = renderHook(() => useFilterItems(menuItems, ['Noodle', 'sideDish']));
                expect(result.current).toStrictEqual(noodleOnly.concat(sidesOnly));
            });

            it("should return side dishes + rice, when rice + side dish is selected", () => {
                const { result } = renderHook(() => useFilterItems(menuItems, ['Rice', 'sideDish']));
                expect(result.current).toStrictEqual(riceOnly.concat(sidesOnly));
            });
        });
    });

    describe("useFilterOptions", () => {
        it("initialises the checked selection with All", () => {
            const { result } = renderHook(() => useFilterOptions(['All', 'Rice', 'Noodle', 'Side dish']));
            expect(result.current.checkedSelection).toEqual(['All']);
        });
    });

    describe("updateFilter", () => {
        describe("Current selection is [All]", () => {
            it("deselects All when another filter option is chosen", () => {
                expect(updateFilter(['All'], 'Rice')).toEqual(['Rice']);
            });
        });

        describe("Current selection is [Rice]", () => {
            it("adds the new filter selection if the new selection is not All", () => {
                expect(updateFilter(['Rice'], 'Noodle')).toEqual(['Rice', 'Noodle']);
            });

            it("updates back to All if rice is selected again", () => {
                expect(updateFilter(['Rice'], 'Rice')).toEqual(['All']);
            });
        });

        describe("Current selection is [Rice, Noodle]", () => {
            it("adds the new filter selection if the new selection is not All", () => {
                expect(updateFilter(['Rice', 'Noodle'], 'Side Dish')).toEqual(['Rice', 'Noodle', 'Side Dish']);
            });

            it("removes Rice if rice is selected again", () => {
                expect(updateFilter(['Rice', 'Noodle'], 'Rice')).toEqual(['Noodle']);
            });

            it("removes Rice if All is selected", () => {
                expect(updateFilter(['Rice', 'Noodle'], 'All')).toEqual(['All']);
            });
        });
    });
});
