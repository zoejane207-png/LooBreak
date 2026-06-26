require("dotenv").config();
const mongoose = require("mongoose");
const { connectToDatabase } = require("./db/db");
const Player = require("./models/player");
const Quiz = require("./models/quiz");
const Tip = require("./models/tip");
const Icebreaker = require("./models/icebreaker");

const players = [
  { playername: "alice", score: 10 },
  { playername: "bob", score: 9 },
  { playername: "charlie", score: 8 },
  { playername: "diana", score: 7 },
  { playername: "ethan", score: 6 },
  { playername: "fiona", score: 12 },
  { playername: "george", score: 4 },
  { playername: "hana", score: 15 },
  { playername: "ivan", score: 3 },
  { playername: "julia", score: 11 },
];

const quizzes = [
  {
    question: "Red Vines is a brand of what type of candy?",
    correct_answer: "Licorice",
    incorrect_answers: ["Lollipop", "Chocolate", "Bubblegum"],
  },
  {
    question: "What is the largest planet in our solar system?",
    correct_answer: "Jupiter",
    incorrect_answers: ["Saturn", "Earth", "Mars"],
  },
  {
    question: "Which gas do plants primarily absorb from the atmosphere?",
    correct_answer: "Carbon dioxide",
    incorrect_answers: ["Oxygen", "Nitrogen", "Hydrogen"],
  },
  {
    question: "In which country would you find the Eiffel Tower?",
    correct_answer: "France",
    incorrect_answers: ["Italy", "Spain", "Germany"],
  },
  {
    question: "How many continents are there on Earth?",
    correct_answer: "Seven",
    incorrect_answers: ["Five", "Six", "Eight"],
  },
  {
    question: "What is the chemical symbol for gold?",
    correct_answer: "Au",
    incorrect_answers: ["Ag", "Gd", "Go"],
  },
  {
    question: "Who painted the Mona Lisa?",
    correct_answer: "Leonardo da Vinci",
    incorrect_answers: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
  },
  {
    question: "What is the smallest prime number?",
    correct_answer: "2",
    incorrect_answers: ["1", "3", "0"],
  },
  {
    question: "Which ocean is the largest?",
    correct_answer: "Pacific",
    incorrect_answers: ["Atlantic", "Indian", "Arctic"],
  },
  {
    question: "What language has the most native speakers worldwide?",
    correct_answer: "Mandarin Chinese",
    incorrect_answers: ["English", "Spanish", "Hindi"],
  },
];

const tips = [
  {
    tip: "Flush once, not twice — Save water by avoiding double flushes. One good flush should do the job.",
  },
  {
    tip: "Keep a plunger nearby — Always have one accessible to handle clogs before they worsen.",
  },
  {
    tip: "Use the half-flush option — Modern toilets often have dual-flush buttons. Use the smaller button for liquids only.",
  },
  {
    tip: "Wash your hands for 20 seconds — Hum 'Happy Birthday' twice to make sure you scrub long enough.",
  },
  {
    tip: "Close the lid before flushing — It helps stop germs from spreading into the air.",
  },
  {
    tip: "Don't flush wipes — Even 'flushable' wipes can clog pipes. Bin them instead.",
  },
  {
    tip: "Check for leaks — A running toilet can waste hundreds of litres a day. Listen for hissing.",
  },
  {
    tip: "Keep a small bin in the bathroom — Avoid the temptation to flush things that shouldn't be flushed.",
  },
  {
    tip: "Refill the toilet roll — Be kind to the next person and replace the empty roll.",
  },
  {
    tip: "Open a window or use the fan — Good ventilation keeps the bathroom fresh and reduces mould.",
  },
];

const icebreakers = [
  { icebreaker: "Count how many toilet rolls are in the bathroom" },
  {
    icebreaker: "Guess the brand of the hand soap without looking at the label",
  },
  {
    icebreaker:
      "Find the most unusual item anyone's kept on their bathroom shelf",
  },
  { icebreaker: "Name three things you could do in under a minute right now" },
  { icebreaker: "What's the strangest place you've ever had to use a toilet?" },
  { icebreaker: "If your bathroom had a theme song, what would it be?" },
  { icebreaker: "Describe your ideal bathroom in three words" },
  { icebreaker: "What's one item you always forget to restock?" },
  {
    icebreaker:
      "Spot the oldest product in the bathroom and check its expiry date",
  },
  {
    icebreaker:
      "If you could add one gadget to this bathroom, what would it be?",
  },
];

async function seed() {
  await connectToDatabase();

  // Clear out any existing data so re-running the seed gives a clean slate.
  await Player.deleteMany({});
  await Quiz.deleteMany({});
  await Tip.deleteMany({});
  await Icebreaker.deleteMany({});

  // Insert the seed data.
  await Player.insertMany(players);
  await Quiz.insertMany(quizzes);
  await Tip.insertMany(tips);
  await Icebreaker.insertMany(icebreakers);

  console.log(
    `Seeded ${players.length} players, ${quizzes.length} quizzes, ` +
      `${tips.length} tips, and ${icebreakers.length} icebreakers.`,
  );

  // Close the connection so the script exits cleanly.
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
