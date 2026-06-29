const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../../db/db");
const Icebreaker = require("../../models/icebreaker");

const icebreakers = [
    { icebreaker: "Count how many toilet rolls are in the bathroom" },
    { icebreaker: "Guess the brand of the hand soap without looking at the label" }
];

describe ('internal database call', () => {
    beforeAll(async () => {
        await connectToDatabase();
        await Icebreaker.deleteMany({});
        await Icebreaker.insertMany(icebreakers);
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    it('responds with data in this structure', async () => {
        const icebreakerdata = await request(app).get("/icebreaker");

        expect(icebreakerdata.status).toBe(200);
        expect(icebreakerdata.body.iceBreaker).toBeDefined();
        expect(icebreakerdata.body.iceBreaker).toHaveProperty("icebreaker");
        expect(Array.isArray(icebreakerdata.body.iceBreaker)).toBe(false); // to ensure this is not an array, so it should be a single object
});
});