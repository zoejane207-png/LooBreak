require("dotenv").config();
const mongoose = require("mongoose");
const { connectToDatabase } = require("./db/db");
const Player = require("./models/player");
const Quiz = require("./models/quiz");
const Tip = require("./models/tip");
const Icebreaker = require("./models/icebreaker");
const Lootip = require("./models/lootips");

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

  { icebreaker: "What's the fanciest bathroom you've ever visited?" },
  { icebreaker: "Would you rather have a gold toilet or a smart toilet?" },
  { icebreaker: "What's your favourite smell for hand soap?" },
  { icebreaker: "Name something everyone uses but rarely talks about" },
  { icebreaker: "What's the weirdest bathroom decoration you've seen?" },
  { icebreaker: "How many towels do you think are in this building?" },
  { icebreaker: "What's your go-to shower song?" },
  { icebreaker: "Would you rather have heated floors or a heated toilet seat?" },
  { icebreaker: "What's a household chore you secretly enjoy?" },
  { icebreaker: "What's your earliest bathroom-related memory?" },

  { icebreaker: "Name a product you buy more often than you'd like" },
  { icebreaker: "What's the most useful thing in your bathroom?" },
  { icebreaker: "What colour would you paint your dream bathroom?" },
  { icebreaker: "What's your favourite scent for a candle?" },
  { icebreaker: "What's the last thing you cleaned?" },
  { icebreaker: "What's one invention you wish existed?" },
  { icebreaker: "How long do you think you've spent in bathrooms this year?" },
  { icebreaker: "Would you rather shower in the morning or at night?" },
  { icebreaker: "What's a skill everyone should learn?" },
  { icebreaker: "Name a small luxury you appreciate every day" },

  { icebreaker: "What's the funniest warning sign you've ever seen?" },
  { icebreaker: "If toilets could talk, what would they complain about?" },
  { icebreaker: "What's your favourite thing about your home?" },
  { icebreaker: "What's the best hotel bathroom you've experienced?" },
  { icebreaker: "What's one thing that instantly makes a room feel cleaner?" },
  { icebreaker: "How many mirrors do you think are nearby?" },
  { icebreaker: "What's your favourite household gadget?" },
  { icebreaker: "What's the oddest thing you've carried in your pocket?" },
  { icebreaker: "If you could automate one daily task, what would it be?" },
  { icebreaker: "What's a smell that reminds you of childhood?" },

  { icebreaker: "Name a product you couldn't live without for a week" },
  { icebreaker: "What's the best compliment you've received recently?" },
  { icebreaker: "What's your favourite way to relax?" },
  { icebreaker: "Would you rather have unlimited soap or unlimited shampoo?" },
  { icebreaker: "What's the most organised room in your home?" },
  { icebreaker: "What's something you've lost and never found?" },
  { icebreaker: "What's your favourite season and why?" },
  { icebreaker: "What's the strangest thing you've seen in a public restroom?" },
  { icebreaker: "What's a tiny thing that makes your day better?" },
  { icebreaker: "How many bathroom tiles do you estimate are in this room?" },

  { icebreaker: "What's the most useful life hack you've learned?" },
  { icebreaker: "What's a product that exceeded your expectations?" },
  { icebreaker: "If your bathroom could have a mascot, what would it be?" },
  { icebreaker: "What's your favourite board game?" },
  { icebreaker: "What's one thing you'd put in a time capsule today?" },
  { icebreaker: "What's your least favourite household task?" },
  { icebreaker: "What's a smell you absolutely love?" },
  { icebreaker: "What's something people always borrow from you?" },
  { icebreaker: "What's the funniest household accident you've had?" },
  { icebreaker: "Name a song everyone seems to know" },

  { icebreaker: "Would you rather have a giant sink or a giant shower?" },
  { icebreaker: "What's your favourite comfort food?" },
  { icebreaker: "What's the most random fact you know?" },
  { icebreaker: "What's something you've never understood the appeal of?" },
  { icebreaker: "How many bottles are currently visible in the bathroom?" },
  { icebreaker: "What's the best gift you've ever received?" },
  { icebreaker: "What's your favourite thing to do on a rainy day?" },
  { icebreaker: "What household item do you replace most often?" },
  { icebreaker: "What's a trend you'd like to see return?" },
  { icebreaker: "What's your favourite breakfast?" },

  { icebreaker: "If soap had flavours, what would be the worst one?" },
  { icebreaker: "What's the longest queue you've ever waited in?" },
  { icebreaker: "What's your favourite room in a house?" },
  { icebreaker: "What's something you've become better at recently?" },
  { icebreaker: "What's the most unusual thing you've seen on a shelf?" },
  { icebreaker: "Would you rather have rainbow toilet paper or rainbow towels?" },
  { icebreaker: "What's a smell that instantly relaxes you?" },
  { icebreaker: "What's the best advice you've ever received?" },
  { icebreaker: "What's your favourite thing about weekends?" },
  { icebreaker: "How many taps do you think are in this building?" },

  { icebreaker: "What's a simple pleasure you never get tired of?" },
  { icebreaker: "What's your favourite cleaning product smell?" },
  { icebreaker: "What's the funniest thing you've overheard in public?" },
  { icebreaker: "What's a household item you own too many of?" },
  { icebreaker: "What's your favourite holiday tradition?" },
  { icebreaker: "What's something that always makes you laugh?" },
  { icebreaker: "What's your dream bathroom feature?" },
  { icebreaker: "Name a movie you've watched more than three times" },
  { icebreaker: "What's the most useful app on your phone?" },
  { icebreaker: "What's your favourite type of weather?" },

  { icebreaker: "What's one thing you always keep stocked at home?" },
  { icebreaker: "What's the strangest product you've ever bought?" },
  { icebreaker: "If this bathroom had a celebrity spokesperson, who would it be?" },
  { icebreaker: "What's a small purchase that was totally worth it?" },
  { icebreaker: "What's your favourite thing to do while waiting?" },
  { icebreaker: "What's a household rule everyone should follow?" },
  { icebreaker: "What's the cleanest place you've ever seen?" },
  { icebreaker: "What's one thing you're looking forward to this week?" },
  { icebreaker: "What's your favourite thing about modern technology?" },
  { icebreaker: "If you could rename toilet paper, what would you call it?" },
];

const lootips = [
  {
    lootip: "Flush once, not twice — Save water by avoiding double flushes. One good flush should do the job.",
  },
  {
    lootip: "Keep a plunger nearby — Always have one accessible to handle clogs before they worsen.",
  },
  {
    lootip: "Use the half-flush option — Modern toilets often have dual-flush buttons. Use the smaller button for liquids only.",
  },
  {
    lootip: "Wash your hands for 20 seconds — Hum 'Happy Birthday' twice to make sure you scrub long enough.",
  },
  {
    lootip: "Close the lid before flushing — It helps stop germs from spreading into the air.",
  },
  {
    lootip: "Don't flush wipes — Even 'flushable' wipes can clog pipes. Bin them instead.",
  },
  {
    lootip: "Check for leaks — A running toilet can waste hundreds of litres a day. Listen for hissing.",
  },
  {
    lootip: "Keep a small bin in the bathroom — Avoid the temptation to flush things that shouldn't be flushed.",
  },
  {
    lootip: "Refill the toilet roll — Be kind to the next person and replace the empty roll.",
  },
  {
    lootip: "Open a window or use the fan — Good ventilation keeps the bathroom fresh and reduces mould.",
  },
];

async function seed() {
  await connectToDatabase();

  // Clear out any existing data so re-running the seed gives a clean slate.
  await Player.deleteMany({});
  await Quiz.deleteMany({});
  await Tip.deleteMany({});
  await Icebreaker.deleteMany({});
  await Lootip.deleteMany({});

  // Insert the seed data.
  await Player.insertMany(players);
  await Quiz.insertMany(quizzes);
  await Tip.insertMany(tips);
  await Icebreaker.insertMany(icebreakers);
  await Lootip.insertMany(lootips);

  console.log(
    `Seeded ${players.length} players, ${quizzes.length} quizzes, ` +
      `${tips.length} tips, ${icebreakers.length} icebreakers, ` +
      `and ${lootips.length} lootips.`
  );

  // Close the connection so the script exits cleanly.
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
