const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../../db/db");
const Icebreaker = require("../../models/icebreaker");

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [] }),
  }),
);

const icebreakers = [
  { icebreaker: "Count how many toilet rolls are in the bathroom" },
  {
    icebreaker: "Guess the brand of the hand soap without looking at the label",
  },
  {
    icebreaker:
      "Find the most unusual item anyone's kept on their bathroom shelf",
  },
];

describe("internal database call", () => {
  beforeAll(async () => {
    await connectToDatabase();
    await Icebreaker.deleteMany({});
    await Icebreaker.insertMany(icebreakers);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("responds with three icebreakers from the database in the correct structure", async () => {
    const icebreakerdata = await request(app).get("/icebreaker/batch");

    expect(icebreakerdata.status).toBe(200);
    expect(icebreakerdata.body).toHaveProperty("iceBreakers");
    expect(Array.isArray(icebreakerdata.body.iceBreakers)).toBe(true);
    expect(icebreakerdata.body.iceBreakers).toHaveLength(3);
    expect(icebreakerdata.body.iceBreakers[0]).toHaveProperty("icebreaker");
  });
});
