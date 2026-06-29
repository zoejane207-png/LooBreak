const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../../db/db");
const Lootip = require("../../models/lootips");

const lootips = [
    { lootip: "Flush once, not twice — one good flush should do the job" },
    { lootip: "Close the lid before flushing to stop germs spreading" }
];

describe ('internal database call', () => {
    beforeAll(async () => {
        await connectToDatabase();
        await Lootip.deleteMany({});
        await Lootip.insertMany(lootips);
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    it('responds with data in this structure', async () => {
        const lootipdata = await request(app).get("/lootips");

        expect(lootipdata.status).toBe(200);
        expect(lootipdata.body.looTip).toBeDefined();
        expect(lootipdata.body.looTip).toHaveProperty("lootip");
        expect(Array.isArray(lootipdata.body.looTip)).toBe(false); // to ensure this is not an array, so it should be a single object
});
});
