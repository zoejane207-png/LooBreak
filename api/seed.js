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
    { icebreaker: "Have you ever tried to stealth-unwrap a new roll of toilet paper in a quiet house?" },
  { icebreaker: "What is the absolute worst pattern you could put on novelty toilet paper?" },
  { icebreaker: "Do you fold your toilet paper into neat squares or chaotic scrunches?" },
  { icebreaker: "If you had to replace toilet paper with a type of leaf, what leaf are you choosing?" },
  { icebreaker: "What is your stance on people who leave one single square of toilet paper on the roll?" },
  { icebreaker: "Have you ever had to use a coffee filter in a bathroom emergency?" },
  { icebreaker: "What's the longest you've ever had to wait for someone to finish in the bathroom?" },
  { icebreaker: "If bidets became mandatory tomorrow, how would you feel about it?" },
  { icebreaker: "What is the most awkward eye contact you've made through the crack of a public stall?" },
  { icebreaker: "Have you ever walked into a public restroom, smelled it, and immediately walked out?" },
  { icebreaker: "What is your go-to fake cough sound to mask bathroom noises?" },
  { icebreaker: "Do you trust the automatic flush sensors, or do you always hit the manual button?" },
  { icebreaker: "What is the worst song to have playing on the speakers in a public restroom?" },
  { icebreaker: "Have you ever had the lights go out on you while using a motion-sensor bathroom?" },
  { icebreaker: "What is your strategy when you realize there is no toilet paper *after* you sit down?" },
  { icebreaker: "Do you build a 'bird's nest' on the public toilet seat or just risk it?" },
  { icebreaker: "What is the most stressful airplane bathroom experience you've ever had?" },
  { icebreaker: "Have you ever used a porta-potty in the middle of a hot summer day?" },
  { icebreaker: "What is the most unhinged piece of bathroom stall graffiti you've ever read?" },
  { icebreaker: "How do you handle someone knocking on your stall door? 'Occupied' or pure silence?" },
  { icebreaker: "Have you ever dropped something valuable in the toilet? Did you retrieve it?" },
  { icebreaker: "What is your personal record for fastest shower taken when running late?" },
  { icebreaker: "Do you face the showerhead or face away from it while washing?" },
  { icebreaker: "Is it a crime to leave your hair on the shower wall?" },
  { icebreaker: "What is the weirdest thought you've ever had while standing in the shower?" },
  { icebreaker: "Do you ever practice arguments you'll never actually have while showering?" },
  { icebreaker: "If your bathroom mirror could record your pep talks, how embarrassing would it be?" },
  { icebreaker: "Do you squeeze the toothpaste from the bottom or just strangle it from the middle?" },
  { icebreaker: "What is the most aggressive toothbrushing face you make in the mirror?" },
  { icebreaker: "Have you ever accidentally used someone else's toothbrush and not told them?" },
  { icebreaker: "How many half-empty shampoo bottles are currently residing in your shower?" },
  { icebreaker: "What is the correct order of operations: wash hair first, or wash body first?" },
  { icebreaker: "Do you wash your legs in the shower, or just let the soapy water run down?" },
  { icebreaker: "What is your opinion on 2-in-1 shampoo and conditioner combinations?" },
  { icebreaker: "If you could have a waterproof TV in the shower, what would you watch?" },
  { icebreaker: "Do you check behind the shower curtain for serial killers before using the toilet?" },
  { icebreaker: "What is the most ridiculous thing you've ever tried to flush down a toilet?" },
  { icebreaker: "Have you ever successfully unclogged a toilet at a party without anyone knowing?" },
  { icebreaker: "If toilets could rate their users on a 5-star scale, what would your rating be?" },
  { icebreaker: "Would you rather have a toilet that talks to you or one that plays jazz when you sit?" },
  { icebreaker: "What is the worst possible theme for a novelty bathroom? (e.g., underwater, clown)" },
  { icebreaker: "Do you think carpet in a bathroom is a cozy luxury or a hygiene nightmare?" },
  { icebreaker: "Have you ever encountered a fuzzy toilet seat cover? What was your reaction?" },
  { icebreaker: "If you had an unlimited budget, what unnecessary luxury would you add to your bathroom?" },
  { icebreaker: "What is the most dramatic way to exit a bathroom after a long shower?" },
  { icebreaker: "Do you dry off inside the shower cubicle or step onto the mat dripping wet?" },
  { icebreaker: "How often do you genuinely believe bath towels need to be washed?" },
  { icebreaker: "What is your favorite bathroom-related slang term?" },
  { icebreaker: "If you had to write a Yelp review for your own bathroom, what would it say?" },
  { icebreaker: "Have you ever tried to read a shampoo bottle label because you forgot your phone?" },
  { icebreaker: "What is the absolute longest you have ever doomscrolled while sitting on the toilet?" },
  { icebreaker: "Have your legs ever fallen asleep from sitting on the porcelain throne too long?" },
  { icebreaker: "Do you think 'Squatty Potties' are a brilliant invention or a silly scam?" },
  { icebreaker: "What is the most unusual piece of reading material you've kept by the toilet?" },
  { icebreaker: "Have you ever taken a work conference call from the bathroom?" },
  { icebreaker: "What is the most embarrassing noise your plumbing has ever made when you had guests over?" },
  { icebreaker: "If you were a plumber, what would your catchy business slogan be?" },
  { icebreaker: "What is the worst color a bathroom sink could possibly be?" },
  { icebreaker: "Do you prefer a heavy, solid bar of soap or foamy liquid soap?" },
  { icebreaker: "Have you ever slipped in the shower and had to play it cool by yourself?" },
  { icebreaker: "What is the most panic-inducing thing to see scuttling across a bathroom floor?" },
  { icebreaker: "If you had to hide a million dollars in a bathroom, where would you stash it?" },
  { icebreaker: "What is your stance on people who keep their toothbrushes right next to the toilet?" },
  { icebreaker: "Do you put the lid down before you flush, or do you like to live dangerously?" },
  { icebreaker: "What is the worst bathroom emergency you've ever managed to narrowly escape?" },
  { icebreaker: "Have you ever been trapped in a bathroom because the lock jammed?" },
  { icebreaker: "Would you rather use a terrifying outhouse in the woods or a busy gas station restroom?" },
  { icebreaker: "What is the most questionable hygiene practice you've witnessed in a gym locker room?" },
  { icebreaker: "Do you wear flip-flops in hotel showers, or do you trust the cleaning staff?" },
  { icebreaker: "What is the tiniest, most useless free soap you've ever gotten from a hotel?" },
  { icebreaker: "Have you ever flooded a bathroom? Who did you blame?" },
  { icebreaker: "What is the most intense plunging experience of your life?" },
  { icebreaker: "If you could instantly teleport between any two bathrooms in the world, which would they be?" },
  { icebreaker: "What is the saddest looking bath mat you've ever stepped on?" },
  { icebreaker: "Do you think bath bombs actually clean you, or just make you smell like a craft store?" },
  { icebreaker: "Have you ever tried to take a relaxing bath and gotten instantly bored?" },
  { icebreaker: "What is the optimal water temperature for a shower: scalding hot or lukewarm?" },
  { icebreaker: "Have you ever finished a shower only to realize you forgot to bring a towel in?" },
  { icebreaker: "What is the weirdest makeshift towel you've ever had to use to dry off?" },
  { icebreaker: "If you could change the sound a toilet makes when it flushes, what sound would you pick?" },
  { icebreaker: "What is your opinion on 'his and hers' double sinks in a bathroom?" },
  { icebreaker: "Have you ever accidentally spit toothpaste on your shirt while brushing?" },
  { icebreaker: "What is the most aggressive setting on a multi-setting showerhead?" },
  { icebreaker: "Do you think loofahs are essential exfoliating tools or just bacteria traps?" },
  { icebreaker: "Have you ever used body wash as shampoo in a moment of sheer desperation?" },
  { icebreaker: "What is the most frustrating thing about sharing a bathroom with someone else?" },
  { icebreaker: "Do you leave the bathroom door open or closed when you aren't home?" },
  { icebreaker: "What is the creepiest thing to see staring back at you in the bathroom mirror?" },
  { icebreaker: "Have you ever tried to cut your own hair over the bathroom sink?" },
  { icebreaker: "What is the worst bathroom-related injury you can imagine?" },
  { icebreaker: "Do you think it's acceptable for a restaurant to require a key code for the restroom?" },
  { icebreaker: "What is your reaction when you see someone leave a public stall without washing their hands?" },
  { icebreaker: "Have you ever used the hand dryer to actually dry water off your clothes?" },
  { icebreaker: "What is the most aggressive jet-engine hand dryer you've ever used?" },
  { icebreaker: "Do you use a paper towel to open the door handle when leaving a public restroom?" },
  { icebreaker: "What is the most awkward conversation you've had while standing at a urinal or sink?" },
  { icebreaker: "Have you ever accidentally walked into the restroom of the opposite gender?" },
  { icebreaker: "What is the most confusing set of 'Men' and 'Women' bathroom symbols you've seen?" },
  { icebreaker: "If your bathroom was a nightclub, what would the VIP section be?" },
  { icebreaker: "What is the one bathroom habit you wish you could break?" }
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
      `${tips.length} tips, and ${icebreakers.length} icebreakers.`
  );

  // Close the connection so the script exits cleanly.
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
