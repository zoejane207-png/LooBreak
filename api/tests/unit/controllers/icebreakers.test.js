
const IcebreakerController = require("../../../controllers/icebreaker");
const Icebreaker = require("../../../models/icebreaker");

jest.mock("../../../models/icebreaker");

describe("IcebreakerController", () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    test("getRandomIcebreakers returns 3 items and 200 status", async () => {
        const mockData = [
            { icebreaker: "Test 1" },
            { icebreaker: "Test 2" },
            { icebreaker: "Test 3" }
        ];

        Icebreaker.aggregate.mockResolvedValue(mockData);

        await IcebreakerController.getRandomIcebreakers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ iceBreakers: mockData });
    });

    test("getRandomIcebreakers handles errors", async () => {
        Icebreaker.aggregate.mockRejectedValue(new Error("DB Error"));

        await IcebreakerController.getRandomIcebreakers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
})