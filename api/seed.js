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
  { playername: "fiona", score: 2 },
  { playername: "george", score: 4 },
  { playername: "hana", score: 5 },
];

const quizzes = [
  {
    question: "Red Vines is a brand of what type of candy?",
    correct_answer: "Licorice",
    incorrect_answers: ["Lollipop", "Chocolate", "Bubblegum"],
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
  {
    icebreaker: "Would you rather have heated floors or a heated toilet seat?",
  },
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
  {
    icebreaker: "What's the strangest thing you've seen in a public restroom?",
  },
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
  {
    icebreaker: "Would you rather have rainbow toilet paper or rainbow towels?",
  },
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
  {
    icebreaker:
      "If this bathroom had a celebrity spokesperson, who would it be?",
  },
  { icebreaker: "What's a small purchase that was totally worth it?" },
  { icebreaker: "What's your favourite thing to do while waiting?" },
  { icebreaker: "What's a household rule everyone should follow?" },
  { icebreaker: "What's the cleanest place you've ever seen?" },
  { icebreaker: "What's one thing you're looking forward to this week?" },
  { icebreaker: "What's your favourite thing about modern technology?" },
  { icebreaker: "If you could rename toilet paper, what would you call it?" },
  {
    icebreaker:
      "Have you ever tried to stealth-unwrap a new roll of toilet paper in a quiet house?",
  },
  {
    icebreaker:
      "What is the absolute worst pattern you could put on novelty toilet paper?",
  },
  {
    icebreaker:
      "Do you fold your toilet paper into neat squares or chaotic scrunches?",
  },
  {
    icebreaker:
      "If you had to replace toilet paper with a type of leaf, what leaf are you choosing?",
  },
  {
    icebreaker:
      "What is your stance on people who leave one single square of toilet paper on the roll?",
  },
  {
    icebreaker:
      "Have you ever had to use a coffee filter in a bathroom emergency?",
  },
  {
    icebreaker:
      "What's the longest you've ever had to wait for someone to finish in the bathroom?",
  },
  {
    icebreaker:
      "If bidets became mandatory tomorrow, how would you feel about it?",
  },
  {
    icebreaker:
      "What is the most awkward eye contact you've made through the crack of a public stall?",
  },
  {
    icebreaker:
      "Have you ever walked into a public restroom, smelled it, and immediately walked out?",
  },
  {
    icebreaker: "What is your go-to fake cough sound to mask bathroom noises?",
  },
  {
    icebreaker:
      "Do you trust the automatic flush sensors, or do you always hit the manual button?",
  },
  {
    icebreaker:
      "What is the worst song to have playing on the speakers in a public restroom?",
  },
  {
    icebreaker:
      "Have you ever had the lights go out on you while using a motion-sensor bathroom?",
  },
  {
    icebreaker:
      "What is your strategy when you realize there is no toilet paper *after* you sit down?",
  },
  {
    icebreaker:
      "Do you build a 'bird's nest' on the public toilet seat or just risk it?",
  },
  {
    icebreaker:
      "What is the most stressful airplane bathroom experience you've ever had?",
  },
  {
    icebreaker:
      "Have you ever used a porta-potty in the middle of a hot summer day?",
  },
  {
    icebreaker:
      "What is the most unhinged piece of bathroom stall graffiti you've ever read?",
  },
  {
    icebreaker:
      "How do you handle someone knocking on your stall door? 'Occupied' or pure silence?",
  },
  {
    icebreaker:
      "Have you ever dropped something valuable in the toilet? Did you retrieve it?",
  },
  {
    icebreaker:
      "What is your personal record for fastest shower taken when running late?",
  },
  {
    icebreaker:
      "Do you face the showerhead or face away from it while washing?",
  },
  { icebreaker: "Is it a crime to leave your hair on the shower wall?" },
  {
    icebreaker:
      "What is the weirdest thought you've ever had while standing in the shower?",
  },
  {
    icebreaker:
      "Do you ever practice arguments you'll never actually have while showering?",
  },
  {
    icebreaker:
      "If your bathroom mirror could record your pep talks, how embarrassing would it be?",
  },
  {
    icebreaker:
      "Do you squeeze the toothpaste from the bottom or just strangle it from the middle?",
  },
  {
    icebreaker:
      "What is the most aggressive toothbrushing face you make in the mirror?",
  },
  {
    icebreaker:
      "Have you ever accidentally used someone else's toothbrush and not told them?",
  },
  {
    icebreaker:
      "How many half-empty shampoo bottles are currently residing in your shower?",
  },
  {
    icebreaker:
      "What is the correct order of operations: wash hair first, or wash body first?",
  },
  {
    icebreaker:
      "Do you wash your legs in the shower, or just let the soapy water run down?",
  },
  {
    icebreaker:
      "What is your opinion on 2-in-1 shampoo and conditioner combinations?",
  },
  {
    icebreaker:
      "If you could have a waterproof TV in the shower, what would you watch?",
  },
  {
    icebreaker:
      "Do you check behind the shower curtain for serial killers before using the toilet?",
  },
  {
    icebreaker:
      "What is the most ridiculous thing you've ever tried to flush down a toilet?",
  },
  {
    icebreaker:
      "Have you ever successfully unclogged a toilet at a party without anyone knowing?",
  },
  {
    icebreaker:
      "If toilets could rate their users on a 5-star scale, what would your rating be?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that talks to you or one that plays jazz when you sit?",
  },
  {
    icebreaker:
      "What is the worst possible theme for a novelty bathroom? (e.g., underwater, clown)",
  },
  {
    icebreaker:
      "Do you think carpet in a bathroom is a cozy luxury or a hygiene nightmare?",
  },
  {
    icebreaker:
      "Have you ever encountered a fuzzy toilet seat cover? What was your reaction?",
  },
  {
    icebreaker:
      "If you had an unlimited budget, what unnecessary luxury would you add to your bathroom?",
  },
  {
    icebreaker:
      "What is the most dramatic way to exit a bathroom after a long shower?",
  },
  {
    icebreaker:
      "Do you dry off inside the shower cubicle or step onto the mat dripping wet?",
  },
  {
    icebreaker:
      "How often do you genuinely believe bath towels need to be washed?",
  },
  { icebreaker: "What is your favorite bathroom-related slang term?" },
  {
    icebreaker:
      "If you had to write a Yelp review for your own bathroom, what would it say?",
  },
  {
    icebreaker:
      "Have you ever tried to read a shampoo bottle label because you forgot your phone?",
  },
  {
    icebreaker:
      "What is the absolute longest you have ever doomscrolled while sitting on the toilet?",
  },
  {
    icebreaker:
      "Have your legs ever fallen asleep from sitting on the porcelain throne too long?",
  },
  {
    icebreaker:
      "Do you think 'Squatty Potties' are a brilliant invention or a silly scam?",
  },
  {
    icebreaker:
      "What is the most unusual piece of reading material you've kept by the toilet?",
  },
  {
    icebreaker: "Have you ever taken a work conference call from the bathroom?",
  },
  {
    icebreaker:
      "What is the most embarrassing noise your plumbing has ever made when you had guests over?",
  },
  {
    icebreaker:
      "If you were a plumber, what would your catchy business slogan be?",
  },
  { icebreaker: "What is the worst color a bathroom sink could possibly be?" },
  {
    icebreaker:
      "Do you prefer a heavy, solid bar of soap or foamy liquid soap?",
  },
  {
    icebreaker:
      "Have you ever slipped in the shower and had to play it cool by yourself?",
  },
  {
    icebreaker:
      "What is the most panic-inducing thing to see scuttling across a bathroom floor?",
  },
  {
    icebreaker:
      "If you had to hide a million dollars in a bathroom, where would you stash it?",
  },
  {
    icebreaker:
      "What is your stance on people who keep their toothbrushes right next to the toilet?",
  },
  {
    icebreaker:
      "Do you put the lid down before you flush, or do you like to live dangerously?",
  },
  {
    icebreaker:
      "What is the worst bathroom emergency you've ever managed to narrowly escape?",
  },
  {
    icebreaker:
      "Have you ever been trapped in a bathroom because the lock jammed?",
  },
  {
    icebreaker:
      "Would you rather use a terrifying outhouse in the woods or a busy gas station restroom?",
  },
  {
    icebreaker:
      "What is the most questionable hygiene practice you've witnessed in a gym locker room?",
  },
  {
    icebreaker:
      "Do you wear flip-flops in hotel showers, or do you trust the cleaning staff?",
  },
  {
    icebreaker:
      "What is the tiniest, most useless free soap you've ever gotten from a hotel?",
  },
  { icebreaker: "Have you ever flooded a bathroom? Who did you blame?" },
  { icebreaker: "What is the most intense plunging experience of your life?" },
  {
    icebreaker:
      "If you could instantly teleport between any two bathrooms in the world, which would they be?",
  },
  {
    icebreaker: "What is the saddest looking bath mat you've ever stepped on?",
  },
  {
    icebreaker:
      "Do you think bath bombs actually clean you, or just make you smell like a craft store?",
  },
  {
    icebreaker:
      "Have you ever tried to take a relaxing bath and gotten instantly bored?",
  },
  {
    icebreaker:
      "What is the optimal water temperature for a shower: scalding hot or lukewarm?",
  },
  {
    icebreaker:
      "Have you ever finished a shower only to realize you forgot to bring a towel in?",
  },
  {
    icebreaker:
      "What is the weirdest makeshift towel you've ever had to use to dry off?",
  },
  {
    icebreaker:
      "If you could change the sound a toilet makes when it flushes, what sound would you pick?",
  },
  {
    icebreaker:
      "What is your opinion on 'his and hers' double sinks in a bathroom?",
  },
  {
    icebreaker:
      "Have you ever accidentally spit toothpaste on your shirt while brushing?",
  },
  {
    icebreaker:
      "What is the most aggressive setting on a multi-setting showerhead?",
  },
  {
    icebreaker:
      "Do you think loofahs are essential exfoliating tools or just bacteria traps?",
  },
  {
    icebreaker:
      "Have you ever used body wash as shampoo in a moment of sheer desperation?",
  },
  {
    icebreaker:
      "What is the most frustrating thing about sharing a bathroom with someone else?",
  },
  {
    icebreaker:
      "Do you leave the bathroom door open or closed when you aren't home?",
  },
  {
    icebreaker:
      "What is the creepiest thing to see staring back at you in the bathroom mirror?",
  },
  {
    icebreaker:
      "Have you ever tried to cut your own hair over the bathroom sink?",
  },
  { icebreaker: "What is the worst bathroom-related injury you can imagine?" },
  {
    icebreaker:
      "Do you think it's acceptable for a restaurant to require a key code for the restroom?",
  },
  {
    icebreaker:
      "What is your reaction when you see someone leave a public stall without washing their hands?",
  },
  {
    icebreaker:
      "Have you ever used the hand dryer to actually dry water off your clothes?",
  },
  {
    icebreaker:
      "What is the most aggressive jet-engine hand dryer you've ever used?",
  },
  {
    icebreaker:
      "Do you use a paper towel to open the door handle when leaving a public restroom?",
  },
  {
    icebreaker:
      "What is the most awkward conversation you've had while standing at a urinal or sink?",
  },
  {
    icebreaker:
      "Have you ever accidentally walked into the restroom of the opposite gender?",
  },
  {
    icebreaker:
      "What is the most confusing set of 'Men' and 'Women' bathroom symbols you've seen?",
  },
  {
    icebreaker:
      "If your bathroom was a nightclub, what would the VIP section be?",
  },
  { icebreaker: "What is the one bathroom habit you wish you could break?" },
  {
    icebreaker:
      "Would you rather have a toilet that plays classical music or one that plays heavy metal?",
  },
  {
    icebreaker:
      "Would you rather have heated toilet paper or an automatic bidet?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is always freezing or always a sauna?",
  },
  {
    icebreaker:
      "Would you rather share a bathroom with 10 strangers or live in a house with no bathroom?",
  },
  {
    icebreaker:
      "Would you rather have a sink that only flows sparkling water or only rose water?",
  },
  {
    icebreaker:
      "Would you rather have a shower that sprays glitter or a shower that sprays confetti?",
  },
  {
    icebreaker:
      "Would you rather have unlimited fancy soap or unlimited fluffy towels?",
  },
  {
    icebreaker:
      "Would you rather have a bathtub filled with rubber ducks or a bathtub filled with jelly?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom mirror that compliments you or one that tells you jokes?",
  },
  { icebreaker: "Would you rather have a tiny toilet or a giant sink?" },
  {
    icebreaker:
      "Would you rather use a toothbrush made of wood or one made of glass?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is entirely neon or entirely beige?",
  },
  {
    icebreaker:
      "Would you rather always run out of toilet paper or always run out of hand soap?",
  },
  {
    icebreaker:
      "Would you rather have a showerhead that rotates 360 degrees or one that changes color?",
  },
  {
    icebreaker:
      "Would you rather brush your teeth with mustard or wash your hair with ketchup?",
  },
  {
    icebreaker:
      "Would you rather have a bathtub in your kitchen or a toilet in your bedroom?",
  },
  {
    icebreaker:
      "Would you rather have a voice-activated bathroom or a gesture-controlled one?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that smells like cookies or one that smells like fresh rain?",
  },
  {
    icebreaker:
      "Would you rather have a towel that dries you instantly or a robe that is always warm?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom shelf that is cluttered or completely empty?",
  },
  {
    icebreaker:
      "Would you rather have a shower that doubles as a disco or a bathtub that doubles as a boat?",
  },
  {
    icebreaker:
      "Would you rather use a bidet forever or never use toilet paper again?",
  },
  {
    icebreaker:
      "Would you rather have a gold-plated faucet or a crystal-encrusted toilet handle?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is underground or one on the top floor of a skyscraper?",
  },
  {
    icebreaker:
      "Would you rather always have clean bathroom tiles or always have a perfectly organized medicine cabinet?",
  },
  {
    icebreaker:
      "Would you rather have a bath pillow that is too soft or too firm?",
  },
  {
    icebreaker:
      "Would you rather have a shower curtain that shows a map of the world or a map of the stars?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that is too shallow or too deep?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom floor made of moss or a floor made of smooth river stones?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom with no windows or a bathroom with a glass ceiling?",
  },
  {
    icebreaker:
      "Would you rather have a toothbrush that tastes like mint or one that tastes like chocolate?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that flushes silently or one that plays a fanfare?",
  },
  {
    icebreaker:
      "Would you rather have bathroom soap that turns into a flower or soap that turns into a toy?",
  },
  {
    icebreaker:
      "Would you rather have a shower that only uses rainwater or one that uses mineral water?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom with velvet walls or a bathroom with mirror walls?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that is always perfectly dry or always perfectly wet?",
  },
  {
    icebreaker:
      "Would you rather have a showerhead that is shaped like a flower or one shaped like a star?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom mat that is memory foam or one that is cotton?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom candle that lasts forever or one that changes scents?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom trash can that is invisible or one that is a robot?",
  },
  {
    icebreaker:
      "Would you rather have a toilet seat that is always at the perfect temperature or one that self-cleans?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom mirror that shows you your past or your future?",
  },
  {
    icebreaker:
      "Would you rather have a shower that talks to you or a bathtub that sings to you?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom with an aquarium wall or a jungle wall?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that is shaped like a bowl or one shaped like a waterfall?",
  },
  {
    icebreaker:
      "Would you rather have a toothbrush that is battery-operated or hand-powered?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom scale that lies to you or one that tells you your fortune?",
  },
  {
    icebreaker:
      "Would you rather have a bathtub that is heart-shaped or star-shaped?",
  },
  {
    icebreaker: "Would you rather have a bathroom robe that is silk or fleece?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom light that changes based on your mood?",
  },
  {
    icebreaker:
      "Would you rather have a shower that provides an instant steam room effect?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that is high-tech or vintage-style?",
  },
  {
    icebreaker:
      "Would you rather have bathroom tiles that glow in the dark or tiles that change color?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom shelf that floats or one that rotates?",
  },
  {
    icebreaker:
      "Would you rather have a toothbrush holder that is a statue or a simple jar?",
  },
  {
    icebreaker:
      "Would you rather have a shower mat that is anti-slip or super soft?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is all white or all black?",
  },
  {
    icebreaker: "Would you rather have a bathtub that is portable or built-in?",
  },
  {
    icebreaker:
      "Would you rather have a sink faucet that is touchless or manual?",
  },
  { icebreaker: "Would you rather have a shower that has a built-in radio?" },
  {
    icebreaker:
      "Would you rather have a bathroom window that is tinted or transparent?",
  },
  {
    icebreaker:
      "Would you rather have a toilet paper holder that is a work of art?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is minimalist or maximalist?",
  },
  {
    icebreaker:
      "Would you rather have a showerhead that is extra-large or extra-high pressure?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom stool that is wooden or metal?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom clock that is analog or digital?",
  },
  {
    icebreaker:
      "Would you rather have a soap dispenser that is wall-mounted or countertop?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom rug that is circular or rectangular?",
  },
  {
    icebreaker: "Would you rather have a bathtub caddy that is wood or bamboo?",
  },
  {
    icebreaker:
      "Would you rather have a shower door that is sliding or swinging?",
  },
  { icebreaker: "Would you rather have a bathroom fan that is super quiet?" },
  {
    icebreaker:
      "Would you rather have a bathroom heater that is portable or wall-mounted?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom mirror that is round or rectangular?",
  },
  {
    icebreaker:
      "Would you rather have a toilet brush that is modern or traditional?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom vanity that is double or single?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom faucet that is brushed gold or chrome?",
  },
  { icebreaker: "Would you rather have a showerhead that is round or square?" },
  { icebreaker: "Would you rather have a bathroom light that is dimmable?" },
  {
    icebreaker:
      "Would you rather have a bathroom shelf that is glass or metal?",
  },
  {
    icebreaker:
      "Would you rather have a bathtub faucet that is floor-mounted or wall-mounted?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that is porcelain or stone?",
  },
  {
    icebreaker:
      "Would you rather have a towel warmer that is electric or hydronic?",
  },
  {
    icebreaker: "Would you rather have a bathroom floor that is tile or vinyl?",
  },
  {
    icebreaker:
      "Would you rather have a shower valve that is thermostatic or manual?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom vanity that is floating or floor-standing?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom mirror that is anti-fog or magnified?",
  },
  {
    icebreaker:
      "Would you rather have a toilet flush button that is on the wall or the tank?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom door that is sliding or pocket?",
  },
  {
    icebreaker:
      "Would you rather have a shower cubicle that is glass or tiled?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom ceiling that is painted or tiled?",
  },
  { icebreaker: "Would you rather have a soap dish that is ceramic or glass?" },
  { icebreaker: "Would you rather have a bathroom towel ring or a towel bar?" },
  {
    icebreaker:
      "Would you rather have a bathroom accessory set that is matching?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom wastebasket that is open or closed?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom scale that is smart or mechanical?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom window treatment that is a blind or curtain?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom wall art that is framed or unframed?",
  },
  {
    icebreaker: "Would you rather have a bathroom plant that is real or fake?",
  },
  {
    icebreaker: "Would you rather have a bathroom scent diffuser or a candle?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom where everything is glued to the ceiling or glued to the floor?",
  },
  {
    icebreaker:
      "Would you rather have to wash your hair with dish soap or your body with toothpaste?",
  },
  {
    icebreaker:
      "Would you rather have a shower that only runs for 30 seconds at a time or one that is always ice cold?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom door that refuses to lock or one that refuses to unlock?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that records your weight out loud or one that tells you your fortune?",
  },
  {
    icebreaker:
      "Would you rather have a showerhead that sprays at double pressure or half pressure?",
  },
  {
    icebreaker:
      "Would you rather use a towel that is slightly damp or a towel that is slightly sandy?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom filled with mirrors or a bathroom with no mirrors at all?",
  },
  {
    icebreaker:
      "Would you rather always have the perfect temperature shower or always have the perfect smelling bathroom?",
  },
  {
    icebreaker:
      "Would you rather have to brush your teeth with a stick or wash your face with a sponge?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is always clean but smells like onions or always dirty but smells like lavender?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that talks to you or a shower that hums along with your singing?",
  },
  {
    icebreaker:
      "Would you rather have a bathtub that is deep but narrow or wide but shallow?",
  },
  {
    icebreaker:
      "Would you rather share a bathroom with a giant spider or a giant cockroach?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that is shaped like a throne or a toilet that is shaped like a space capsule?",
  },
  {
    icebreaker:
      "Would you rather use a bar of soap that is already half-used by someone else or liquid soap that is nearly empty?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom faucet that drips all night or a toilet that runs every 5 minutes?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is open-concept or a bathroom that is completely soundproof?",
  },
  {
    icebreaker:
      "Would you rather have a shower curtain with your face on it or a bath mat with your pet's face on it?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom light that only turns on when you hum or when you whistle?",
  },
  {
    icebreaker:
      "Would you rather brush your teeth with lemon juice or wash your hands with sticky honey?",
  },
  {
    icebreaker:
      "Would you rather have a bath that is always full of bubbles or always full of flower petals?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that is gold-plated or one that is made of transparent glass?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is in the middle of a forest or on a remote beach?",
  },
  {
    icebreaker:
      "Would you rather have a toothbrush that cleans your teeth in 5 seconds but hurts or 5 minutes but is gentle?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that is too high or a toilet that is too low?",
  },
  {
    icebreaker:
      "Would you rather have a showerhead that is fixed or one that you have to hold?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is overly decorated or one that is completely empty?",
  },
  {
    icebreaker:
      "Would you rather have to use a leaf as toilet paper or a handful of grass?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom fan that sounds like a jet engine or one that makes no sound at all?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom floor that is made of ice or one made of hot sand?",
  },
  {
    icebreaker:
      "Would you rather have a shower that sprays water in colors or a bathtub that glows in the dark?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that is smart and tracks your health or a 'dumb' but indestructible one?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that overflows if you don't talk to it or a shower that stops if you stop singing?",
  },
  {
    icebreaker:
      "Would you rather have a soap that never runs out or a shampoo that makes your hair look perfect instantly?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom window that looks out onto a busy street or a blank wall?",
  },
  {
    icebreaker:
      "Would you rather have a shower that takes 20 minutes to warm up or one that is always lukewarm?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom vanity that is made of LEGOs or one made of cardboard?",
  },
  {
    icebreaker:
      "Would you rather have a toothbrush that is powered by your hand movements or a solar-powered one?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom light that is extremely bright or extremely dim?",
  },
  {
    icebreaker:
      "Would you rather have a showerhead that is high-tech or an old-fashioned bucket-and-cup setup?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom mirror that is always foggy or a mirror that is always cracked?",
  },
  {
    icebreaker:
      "Would you rather have a toilet roll that is 1 mile long or a toilet roll that is never-ending but only 1-ply?",
  },
  {
    icebreaker:
      "Would you rather have a bathtub that is made of solid wood or solid metal?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom rug that is soft as a cloud or one that dries your feet instantly?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that is rectangular or circular?",
  },
  {
    icebreaker:
      "Would you rather have a toothbrush holder that keeps your brush sterile or one that plays a melody?",
  },
  {
    icebreaker:
      "Would you rather have a shower that is entirely outdoors or a toilet that is entirely outdoors?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that has a TV or a bathroom that has a library?",
  },
  {
    icebreaker:
      "Would you rather have a shower curtain that is clear or opaque?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom vanity that is painted bright pink or neon yellow?",
  },
  {
    icebreaker:
      "Would you rather have a toothbrush that changes flavor or a toothbrush that changes shape?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that detects the perfect water temperature for you?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom floor that is anti-bacterial or a floor that is self-cleaning?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that cleans itself or a sink that clears all clogs?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom with 10 towels or 1 towel that never gets dirty?",
  },
  {
    icebreaker:
      "Would you rather have a showerhead that provides a massage or a showerhead that produces a mist?",
  },
  {
    icebreaker:
      "Would you rather have a soap that smells like bacon or soap that smells like coffee?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom light that simulates sunshine or moonlight?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom sink that is built into your bed or your couch?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that is comfortable enough to sleep on or one that is ergonomic?",
  },
  {
    icebreaker:
      "Would you rather have a toothbrush that is personalized with your name or a photo of your face?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom vanity that has 100 drawers or 1 giant drawer?",
  },
  {
    icebreaker:
      "Would you rather have a shower that plays white noise or ocean waves?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom mat that is machine washable or one that is disposable?",
  },
  {
    icebreaker: "Would you rather have a sink that is made of glass or copper?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom trash can that separates recyclables automatically?",
  },
  {
    icebreaker:
      "Would you rather have a towel that stays fluffy forever or a towel that is always ice cold?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom with high ceilings or low ceilings?",
  },
  {
    icebreaker:
      "Would you rather have a shower door that is sliding or a curtain that is fabric?",
  },
  {
    icebreaker:
      "Would you rather have a toilet seat that warms up or a toilet seat that cools down?",
  },
  {
    icebreaker:
      "Would you rather have a soap that is shaped like your favorite animal?",
  },
  {
    icebreaker:
      "Would you rather have a toothbrush that is silent or one that makes a 'ding' when clean?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that has a spa menu or a menu for snacks?",
  },
  {
    icebreaker:
      "Would you rather have a shower that fills up with bubbles or a shower that fills up with light?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that is 5 feet tall or 5 inches tall?",
  },
  {
    icebreaker:
      "Would you rather have a sink faucet that is in the middle or the side of the sink?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom mirror that gives you fashion advice?",
  },
  {
    icebreaker:
      "Would you rather have a shower curtain that is reversible or one that is transparent?",
  },
  {
    icebreaker:
      "Would you rather have a toilet paper holder that holds 10 rolls at once?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom floor that glows when you walk on it?",
  },
  {
    icebreaker:
      "Would you rather have a showerhead that is shaped like a waterfall or a geyser?",
  },
  { icebreaker: "Would you rather have a bathroom sink that is super deep?" },
  {
    icebreaker:
      "Would you rather have a toothbrush that tracks your gum health daily?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom wastebasket that is soundproof?",
  },
  {
    icebreaker: "Would you rather have a bathroom light that is solar-powered?",
  },
  {
    icebreaker:
      "Would you rather have a bathtub that is made of recycled plastic or recycled glass?",
  },
  {
    icebreaker:
      "Would you rather have a sink that drains at the speed of light?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom that is always perfectly decorated?",
  },
  {
    icebreaker:
      "Would you rather have a shower that plays your favorite podcast?",
  },
  {
    icebreaker:
      "Would you rather have a toilet that is made of comfortable foam?",
  },
  { icebreaker: "Would you rather have a soap that never dissolves?" },
  {
    icebreaker:
      "Would you rather have a toothbrush that uses sonic technology?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom vanity that has an built-in mirror?",
  },
  {
    icebreaker:
      "Would you rather have a shower that uses filtered spring water?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom floor that cleans your feet as you walk?",
  },
  {
    icebreaker:
      "Would you rather have a toilet paper that is printed with a crossword puzzle?",
  },
  {
    icebreaker:
      "Would you rather have a bathroom mat that is a mirror image of your living room rug?",
  },
  {
    icebreaker: "Would you rather have a sink faucet that uses minimal water?",
  },
  {
    icebreaker:
      "If you were suddenly tasked with decorating the bathroom using only office supplies, what would you make?",
  },
  {
    icebreaker:
      "You find a portal inside your toilet that leads to a dimension made of soap. What do you do first?",
  },
  {
    icebreaker:
      "If a squirrel walked into your bathroom while you were in there, how would you politely ask it to leave?",
  },
  {
    icebreaker:
      "You discover that your shampoo bottle is actually a disguised robot spy. What is its mission?",
  },
  {
    icebreaker:
      "If you had to conduct a full symphony orchestra using only bathroom sounds, what would be the finale?",
  },
  {
    icebreaker:
      "The floor tiles have started moving around like a sliding puzzle. How do you find the door?",
  },
  {
    icebreaker:
      "If you could replace the showerhead with any kitchen appliance, which one would provide the most interesting shower?",
  },
  {
    icebreaker:
      "You walk into the bathroom and realize you’re in a mirror universe where everything is upside down. How do you brush your teeth?",
  },
  {
    icebreaker:
      "If your bath mat was a magic carpet, where would you fly it to after your shower?",
  },
  {
    icebreaker:
      "The toilet has developed a personality and demands you tell it a secret before it flushes. What do you tell it?",
  },
  {
    icebreaker:
      "You find a tiny, hidden door behind the bathroom mirror. What is on the other side?",
  },
  {
    icebreaker:
      "If all the products in your bathroom started a political debate, who would win?",
  },
  {
    icebreaker:
      "You realize the bathtub is actually a time machine. What year do you set the dial to?",
  },
  {
    icebreaker:
      "Every time you turn on the tap, a different exotic animal noise comes out. How do you handle it?",
  },
  {
    icebreaker:
      "You have to live in your bathroom for a week with only one suitcase. What’s inside?",
  },
  {
    icebreaker: "The soap has started predicting the weather. Do you trust it?",
  },
  {
    icebreaker:
      "If you could turn the bathroom into a ball pit, how many balls would you need to fill it?",
  },
  {
    icebreaker:
      "You accidentally summon a bathroom genie. You get one wish, but it must be bathroom-related. What is it?",
  },
  {
    icebreaker:
      "The towels have started communicating via interpretive dance. What are they trying to say?",
  },
  {
    icebreaker:
      "If gravity stopped working specifically inside your bathroom, how would you use the facilities?",
  },
  {
    icebreaker:
      "You find a mysterious button on the wall that says 'Do Not Press.' Do you press it?",
  },
  {
    icebreaker:
      "The sink starts overflowing with something other than water. What is the most fun substance it could be?",
  },
  {
    icebreaker:
      "If you had to paint a masterpiece on the bathroom walls using only toothpaste, what would the subject be?",
  },
  {
    icebreaker:
      "The bathroom light bulb begins whispering ancient secrets. Do you listen?",
  },
  {
    icebreaker:
      "If you were the king or queen of the Bathroom Kingdom, what would your first royal decree be?",
  },
  {
    icebreaker:
      "You discover that your toilet is actually a high-tech communication device for aliens. What is their first message?",
  },
  {
    icebreaker:
      "If you could grow any plant in your bathroom that defied the laws of nature, what would it do?",
  },
  {
    icebreaker:
      "The medicine cabinet has become a portal to a grocery store. What do you grab?",
  },
  {
    icebreaker:
      "If the bathtub started floating, where would you take it for a cruise?",
  },
  {
    icebreaker:
      "You find a treasure map etched into the bathroom tile. Where does the 'X' mark the spot?",
  },
  {
    icebreaker:
      "If all the bathroom tiles were actually chocolate, how long would you last before eating them?",
  },
  {
    icebreaker:
      "A miniature civilization has moved into your toothbrush holder. Do you charge them rent?",
  },
  {
    icebreaker:
      "The shower curtain is now a holographic projection of your favorite movie. What are you watching?",
  },
  {
    icebreaker:
      "If you could program the toilet to play any sound effect upon flushing, what would it be?",
  },
  {
    icebreaker:
      "You find a secret tunnel behind the shower. Where does it lead?",
  },
  {
    icebreaker:
      "The bathroom mirror begins to show you your life as a cartoon character. What happens?",
  },
  {
    icebreaker:
      "If you had to host a dinner party for three bathroom appliances, who would you invite?",
  },
  {
    icebreaker:
      "The soap dispenser is suddenly full of sparkling cider. Is this a good or bad thing?",
  },
  {
    icebreaker:
      "If you could change the color of your reflection in the mirror, what color would you choose?",
  },
  {
    icebreaker:
      "You find a button that makes the bathroom gravity-defying. How do you have fun with it?",
  },
  {
    icebreaker:
      "The bathroom door has vanished and been replaced by a curtain of laser beams. How do you pass?",
  },
  {
    icebreaker:
      "If your bath bombs were actually grenades that exploded into glitter, would you use them?",
  },
  {
    icebreaker:
      "The toilet paper has become sentient and is trying to write a novel. What is the title?",
  },
  {
    icebreaker:
      "You discover that your bathroom is actually an escape pod for a spaceship. Where are you heading?",
  },
  {
    icebreaker:
      "If you could shrink yourself to the size of a bug and explore your drain, what would you find?",
  },
  {
    icebreaker:
      "The faucet starts pouring hot chocolate instead of water. What’s your move?",
  },
  {
    icebreaker:
      "If your bathroom mirror could show you the reflection of anyone in the world, who would you look at?",
  },
  {
    icebreaker:
      "The tiles are now touch-sensitive and play music when you step on them. What song do you play?",
  },
  {
    icebreaker:
      "If you had to trade your bathroom for a bathroom on the International Space Station, would you do it?",
  },
  {
    icebreaker:
      "The medicine cabinet is filled with potions from a fantasy game. Which one do you try first?",
  },
  {
    icebreaker:
      "If you could teleport to any bathroom in history, which one would you pick?",
  },
  {
    icebreaker:
      "The shower drain is actually a wormhole to a beach in Hawaii. Do you go?",
  },
  {
    icebreaker:
      "If your bathrobe gained the ability to speak, what would be its biggest complaint?",
  },
  {
    icebreaker:
      "The toilet is now a holographic interface for the internet. What do you search for?",
  },
  {
    icebreaker:
      "If you had to decorate your bathroom with only items found in a forest, what would you use?",
  },
  {
    icebreaker:
      "A genie appears and offers to make your bathroom an infinite size. What’s the first thing you put in it?",
  },
  {
    icebreaker:
      "The showerhead now sprays warm, scented air instead of water. How do you wash?",
  },
  {
    icebreaker:
      "If your toothbrush gained artificial intelligence, what would it want to talk about?",
  },
  {
    icebreaker:
      "You find a hidden staircase under the bath mat. Where does it lead?",
  },
  {
    icebreaker:
      "If you could make the bathroom walls transparent for one hour, would you do it?",
  },
  {
    icebreaker:
      "The soap has started singing opera every time it gets wet. Is it a good voice?",
  },
  {
    icebreaker:
      "If you could change the texture of the bathroom walls to anything, what would you choose?",
  },
  {
    icebreaker:
      "You discover that your bathroom is actually a simulation. How do you test the walls?",
  },
  {
    icebreaker:
      "If the toilet lid was a touch-screen monitor, what app would you open?",
  },
  {
    icebreaker:
      "The bathroom scale now tells you your 'coolness factor' instead of your weight. What do you hope it says?",
  },
  {
    icebreaker:
      "If you could make it rain inside your shower, what would you want it to rain?",
  },
  {
    icebreaker:
      "You find a button that makes the bathroom spin. How long can you handle it?",
  },
  {
    icebreaker:
      "If your bathroom mirror became a window to another planet, what would you see?",
  },
  {
    icebreaker:
      "The faucet now dispenses infinite amounts of gold coins. How do you store them?",
  },
  {
    icebreaker:
      "If you had to host a formal ball inside your bathroom, who would be the guests?",
  },
  {
    icebreaker:
      "You find a secret compartment in the wall containing a time capsule from 1920. What’s inside?",
  },
  {
    icebreaker:
      "If your bathroom towels were made of marshmallow, would you be tempted to eat them?",
  },
  {
    icebreaker:
      "The bathroom floor is now made of trampolines. How long can you stay standing?",
  },
  {
    icebreaker:
      "If you could replace the shower curtain with a waterfall, would you?",
  },
  {
    icebreaker:
      "The toilet has started writing poetry in the steam on the mirror. What is the poem about?",
  },
  {
    icebreaker:
      "If you found a golden key in the drain, what would you try to unlock?",
  },
  {
    icebreaker:
      "The bathroom vent is now a speaker playing a live feed from outer space. What do you hear?",
  },
  {
    icebreaker:
      "If your bathroom was filled with balloons, what color would they be?",
  },
  {
    icebreaker:
      "You discover that your bathroom is a secret base for superheroes. What’s your role?",
  },
  {
    icebreaker:
      "If you could change the bathroom lighting to follow your heart rate, would you?",
  },
  {
    icebreaker:
      "The bathtub is now filled with soft, fluffy clouds. Do you nap in it?",
  },
  {
    icebreaker:
      "If you had to trade places with a bathroom fixture, which one would be the most fun?",
  },
  {
    icebreaker:
      "You find a secret button that turns the bathroom into a disco. What’s the dress code?",
  },
  {
    icebreaker:
      "If the mirror reflection started walking away, would you follow it?",
  },
  {
    icebreaker:
      "The sink starts spitting out confetti every time you turn the handle. Is it a party?",
  },
  {
    icebreaker:
      "If you could change the scent of your bathroom to 'space,' what would that smell like?",
  },
  {
    icebreaker: "The toilet paper is now made of silk. Is it better or worse?",
  },
  {
    icebreaker:
      "You find a secret switch that makes the bathroom walls disappear. What’s outside?",
  },
  {
    icebreaker:
      "If your toothbrush was actually a lightsaber, would you brush more often?",
  },
  {
    icebreaker:
      "The bath mat is now a portal to the past. What era do you visit?",
  },
  {
    icebreaker:
      "If you could make your bathroom walls out of candy, what would you lick first?",
  },
  {
    icebreaker:
      "You find a tiny set of stairs leading into the drain. Who lives down there?",
  },
  {
    icebreaker:
      "If your shower had a 'random' mode that changed the water to different temperatures, would you risk it?",
  },
  {
    icebreaker:
      "The bathroom tiles have started telling riddles. Can you solve them?",
  },
  {
    icebreaker:
      "If you could have a bathroom that was also a mini-library, what would be the first book you stock?",
  },
  {
    icebreaker:
      "The shower curtain is now a giant touchscreen. What game are you playing?",
  },
  {
    icebreaker:
      "If you could make your bathroom floor invisible, would you be scared to walk on it?",
  },
  {
    icebreaker:
      "The toilet paper roll has become a long, endless scroll of ancient history. What are you reading?",
  },
  {
    icebreaker:
      "If you could make your bathroom float in the sky, what would be the view?",
  },
  {
    icebreaker:
      "You find a secret trapdoor beneath the vanity. What’s in the room below?",
  },
  {
    icebreaker:
      "If you could snap your fingers and have your bathroom magically deep-cleaned, what color would it sparkle?",
  },
  {
    icebreaker:
      "If your toilet was a portal to a random city, would you jump in just to see where it goes?",
  },
  {
    icebreaker:
      "You find a tiny knight living in your soap dish. Do you give him a tiny sword?",
  },
  {
    icebreaker:
      "If your bath towels could talk, what would be the most embarrassing thing they’d reveal about you?",
  },
  {
    icebreaker:
      "You notice your bathroom mirror reflection is a few seconds behind you. What do you do?",
  },
  {
    icebreaker:
      "If the bathroom drain started singing lullabies, would you sleep better or worse?",
  },
  {
    icebreaker:
      "You discover a secret code etched into your toothbrush. What is it for?",
  },
  {
    icebreaker:
      "If your bathroom was a spaceship, what would be your role on the crew?",
  },
  {
    icebreaker:
      "The tiles on the wall start rearranging themselves into a map of a treasure island. Are you digging up the floor?",
  },
  {
    icebreaker:
      "You walk in and find that your sink has been replaced by a fountain of fruit punch. Do you drink it?",
  },
  {
    icebreaker:
      "If your bathroom vent started blowing glitter, would you ever fix it?",
  },
  { icebreaker: "You find a tiny top hat under the sink. Who was wearing it?" },
  {
    icebreaker:
      "If you could talk to your showerhead, what would you complain about first?",
  },
  {
    icebreaker:
      "You notice your bathroom vanity is actually a giant transformer robot in disguise. What is its name?",
  },
  {
    icebreaker:
      "If the toilet paper roll was bottomless, what would you use the excess for?",
  },
  {
    icebreaker:
      "You find a hidden hatch in the bathtub that leads to a secret underground club. Do you enter?",
  },
  {
    icebreaker:
      "If you could change the sound of the toilet flush to a trumpet blast, would you do it?",
  },
  {
    icebreaker:
      "The bathroom light bulb is actually a trapped firefly. Do you set it free?",
  },
  {
    icebreaker:
      "If your bathrobe could turn into a superhero cape, what would your name be?",
  },
  {
    icebreaker:
      "You find a message in a bottle inside your medicine cabinet. Who is it from?",
  },
  {
    icebreaker:
      "If the bathroom tiles were made of touch-sensitive glass, what patterns would you draw?",
  },
  {
    icebreaker:
      "You wake up and the bathroom has been relocated to the middle of the desert. How do you find your way home?",
  },
  {
    icebreaker:
      "If your loofah was alive, what would its favorite activity be?",
  },
  {
    icebreaker:
      "You see a tiny door in the wall that is definitely for mice. Do you knock?",
  },
  {
    icebreaker:
      "If you could make it rain inside your shower at the press of a button, would you?",
  },
  {
    icebreaker:
      "The bathroom scale now gives you a 'vibe check' score. Are you afraid to stand on it?",
  },
  {
    icebreaker:
      "If you could replace the shower curtain with a waterfall, would you ever leave?",
  },
  {
    icebreaker:
      "You find a map to a hidden kingdom under the bath mat. Who rules it?",
  },
  {
    icebreaker:
      "If your toilet seat was a heated massage chair, how long would you stay?",
  },
  {
    icebreaker:
      "The faucet is now pouring liquid gold. Is it a gift or a curse?",
  },
  {
    icebreaker:
      "If you found a miniature civilization in your drain, what gift would you bring them?",
  },
  {
    icebreaker:
      "You find a switch that makes the bathroom float. Where do you steer it?",
  },
  {
    icebreaker:
      "If the bathroom mirror was actually a screen showing a live feed from the moon, would you watch it?",
  },
  {
    icebreaker:
      "You walk in and find your shampoo bottles having a meeting. What are they discussing?",
  },
  {
    icebreaker:
      "If your toothbrush could change your music playlist, what would be the first song?",
  },
  {
    icebreaker:
      "You discover a tunnel behind the tiles leading to the center of the Earth. What do you see?",
  },
  {
    icebreaker: "If your bathtub could turn into a boat, where would you sail?",
  },
  {
    icebreaker:
      "You find a secret button that turns the bathroom into a disco-tech. What is the DJ’s name?",
  },
  {
    icebreaker:
      "If the tiles could read your thoughts, would you ever shower again?",
  },
  {
    icebreaker:
      "You find a lost letter from the 1800s hidden behind your mirror. What does it say?",
  },
  {
    icebreaker:
      "If your medicine cabinet was a library for magic spells, what’s the first one you cast?",
  },
  {
    icebreaker:
      "You see your reflection start dancing while you stand perfectly still. Do you join in?",
  },
  {
    icebreaker:
      "If your toilet was also a library book drop, what would you donate?",
  },
  { icebreaker: "You find a treasure chest under the vanity. What’s inside?" },
  {
    icebreaker:
      "If you could make the bathroom wall transparent for a view of the mountains, would you?",
  },
  {
    icebreaker:
      "The shower curtain is actually a map to your future. Do you peek?",
  },
  {
    icebreaker:
      "If the soap started judging your singing, how would you respond?",
  },
  {
    icebreaker:
      "You find a secret key stuck in the door lock. What does it unlock?",
  },
  {
    icebreaker:
      "If you could teleport to your bathroom from anywhere, would you use it to hide?",
  },
  {
    icebreaker:
      "The vent is actually a portal to a world where it always snows. Do you jump?",
  },
  {
    icebreaker:
      "If your bathrobe was a time machine, what era would you wear it to?",
  },
  {
    icebreaker:
      "You find a tiny crown left on the edge of the sink. Who was it for?",
  },
  {
    icebreaker:
      "If you could make your bathroom walls out of velvet, would it be weird?",
  },
  {
    icebreaker:
      "The toilet paper has become sentient and is asking for a raise. What do you do?",
  },
  {
    icebreaker:
      "If the bathroom mirror showed you your dream version of yourself, would you stare all day?",
  },
  {
    icebreaker:
      "You find a secret compartment in your toothbrush holder. What’s in it?",
  },
  {
    icebreaker:
      "If you could make your bathroom floor out of fluffy clouds, would you walk on air?",
  },
  {
    icebreaker:
      "The sink starts speaking in riddles. Can you solve the first one?",
  },
  {
    icebreaker:
      "If you found a tiny pair of shoes in the bathtub, who are they for?",
  },
  {
    icebreaker:
      "You discover your bathroom is actually an escape capsule. What’s the mission?",
  },
  {
    icebreaker:
      "If the showerhead sprayed perfume instead of water, would you smell better or worse?",
  },
  {
    icebreaker:
      "You find a hidden staircase behind the towel rack. Where does it go?",
  },
  {
    icebreaker:
      "If your bathroom scale told you the weight of your worries, what would the number be?",
  },
  {
    icebreaker:
      "The vanity has started growing real flowers. Do you water them?",
  },
  {
    icebreaker:
      "If you could change your bathroom light to bioluminescent mushrooms, would you?",
  },
  {
    icebreaker:
      "You find a golden ticket in your toothpaste box. Where is the prize?",
  },
  {
    icebreaker: "If your bathroom door led to a library, would you ever leave?",
  },
  {
    icebreaker:
      "The soap has started predicting your future in the bubbles. Do you believe it?",
  },
  {
    icebreaker:
      "If your bathtub was a time capsule, what would you bury in it for 100 years?",
  },
  {
    icebreaker:
      "You find a secret hatch in the wall that leads to a mini-cafe. What’s on the menu?",
  },
  {
    icebreaker:
      "If the tiles started changing colors based on your mood, would you be embarrassed?",
  },
  {
    icebreaker:
      "You discover your toothbrush is actually an ancient artifact. What’s its power?",
  },
  {
    icebreaker:
      "If you could make the bathroom sink fill with anything, what would you choose?",
  },
  {
    icebreaker:
      "The mirror has a 'save' button for your reflection. Would you save your look?",
  },
  {
    icebreaker:
      "If your shower curtain was a canvas, what would you paint on it?",
  },
  {
    icebreaker:
      "You find a secret button that turns the bathroom into a zero-gravity chamber. How do you practice?",
  },
  {
    icebreaker:
      "If the medicine cabinet opened to a forest, would you go exploring?",
  },
  {
    icebreaker:
      "The toilet paper is now made of golden leaves. Is it worth using?",
  },
  {
    icebreaker:
      "You find a small, glowing stone in the drain. Do you pick it up?",
  },
  {
    icebreaker:
      "If your bathroom was on a boat, what would be the bathroom name?",
  },
  {
    icebreaker:
      "The floor tiles begin playing music as you walk. What’s the rhythm?",
  },
  {
    icebreaker:
      "If you could summon a butler to your bathroom, what would you ask for first?",
  },
  {
    icebreaker:
      "You find a hidden room behind the shower door. What do you see?",
  },
  {
    icebreaker:
      "If your bathroom light could change to a sunset color, would you use it to relax?",
  },
  {
    icebreaker:
      "The sink starts singing to you while you wash your hands. Is it a good voice?",
  },
  {
    icebreaker:
      "If you could make your bathroom walls out of mirrors, would you be scared?",
  },
  { icebreaker: "You find a tiny note in the soap dish saying 'Run'. Do you?" },
  { icebreaker: "If your bathroom vanity could fly, where would you go?" },
  {
    icebreaker:
      "The showerhead now sprays cool mountain mist. Is it refreshing?",
  },
  {
    icebreaker:
      "If the bathroom door only opened with a riddle, how long would you stay inside?",
  },
  {
    icebreaker:
      "You find a hidden compartment in the wall with a map. What is it for?",
  },
  {
    icebreaker:
      "If your towels could change color, what would be your favorite?",
  },
  {
    icebreaker:
      "The floor is now lava (but it’s just warm water). Can you make it to the door?",
  },
  {
    icebreaker:
      "If you found a miniature spaceship in the bathtub, who would be the pilot?",
  },
  {
    icebreaker:
      "You find a switch that makes the bathroom walls play movies. What’s the first film?",
  },
  {
    icebreaker:
      "If the toilet was a time machine, which century would you visit?",
  },
  {
    icebreaker:
      "The shower drain is now a portal to a world made of candy. Do you jump?",
  },
  {
    icebreaker:
      "If your bathroom was a secret base, what would be the password?",
  },
  {
    icebreaker:
      "You find a glowing key in the medicine cabinet. What does it open?",
  },
  {
    icebreaker:
      "If you could have a bathroom that was also a mini-garden, what would you grow?",
  },
  { icebreaker: "What was the very first bath toy you remember owning?" },
  {
    icebreaker:
      "Did you ever have a fear of the bathroom drain as a child? What did you think was down there?",
  },
  {
    icebreaker:
      "What was the most ridiculous haircut your parents ever gave you in the bathroom?",
  },
  {
    icebreaker:
      "Did you ever try to build a 'fort' using only bathroom towels?",
  },
  {
    icebreaker:
      "What is the funniest memory you have of a grandparent's bathroom?",
  },
  {
    icebreaker:
      "Did you ever have a specific 'potty training' reward or chart?",
  },
  {
    icebreaker:
      "What was the weirdest smell that reminds you instantly of your childhood home?",
  },
  {
    icebreaker:
      "Did you ever draw on the bathroom walls or tiles with crayons?",
  },
  {
    icebreaker:
      "What was your least favorite task you had to do in the bathroom as a kid?",
  },
  { icebreaker: "Did you ever try to give your toys a bath in the sink?" },
  {
    icebreaker:
      "What was the one bathroom product you thought looked like food when you were little?",
  },
  { icebreaker: "Do you remember your first toothbrush? What color was it?" },
  {
    icebreaker:
      "Did you ever pretend to be a mermaid or merman in the bathtub?",
  },
  {
    icebreaker:
      "What is the funniest thing you remember doing to make your hair look cool in the mirror?",
  },
  {
    icebreaker:
      "Did you ever have a favorite towel that you refused to use anything else?",
  },
  {
    icebreaker:
      "What was the most embarrassing bathroom accident you had at school?",
  },
  {
    icebreaker:
      "Did your parents ever play a specific song while giving you a bath?",
  },
  {
    icebreaker:
      "What was the 'coolest' bathroom feature in your childhood home?",
  },
  {
    icebreaker:
      "Did you ever try to mix all your parents' shampoos together to make a 'potion'?",
  },
  {
    icebreaker: "What was the weirdest bathroom decoration your parents kept?",
  },
  {
    icebreaker:
      "Did you ever use the bathroom mirror to practice your 'tough kid' face?",
  },
  {
    icebreaker:
      "What is a bathroom habit you picked up from your parents that you still do?",
  },
  {
    icebreaker:
      "Did you ever hide in the bathroom to get away from your siblings?",
  },
  {
    icebreaker:
      "What was your favorite bath-time snack, if you were allowed one?",
  },
  {
    icebreaker:
      "Did you ever try to cut your own hair in front of the bathroom mirror?",
  },
  {
    icebreaker:
      "What was the scariest bathroom-related thing you saw in a movie as a kid?",
  },
  {
    icebreaker:
      "Did you ever have a bathroom rug that you were terrified of stepping on?",
  },
  {
    icebreaker:
      "What was the most 'grown-up' bathroom item you were finally allowed to use?",
  },
  {
    icebreaker:
      "Did you ever use the bathroom to practice your singing for a school talent show?",
  },
  {
    icebreaker:
      "What is a bathroom item you remember that doesn't exist anymore?",
  },
  {
    icebreaker:
      "Did you ever use a bucket or a sink as a swimming pool for your action figures?",
  },
  {
    icebreaker:
      "What was your opinion on bubble bath as a kid—too many bubbles or never enough?",
  },
  {
    icebreaker:
      "Did you ever accidentally walk into the wrong bathroom at a public place as a kid?",
  },
  {
    icebreaker:
      "What was the most 'mysterious' thing behind your childhood medicine cabinet door?",
  },
  { icebreaker: "Did you ever have a specific towel character you loved?" },
  {
    icebreaker:
      "What was the most annoying thing about sharing a bathroom with your siblings?",
  },
  { icebreaker: "Did you ever try to use a bathroom sink to wash your pet?" },
  {
    icebreaker:
      "What was the coolest bath bomb or bath product you ever got as a gift?",
  },
  {
    icebreaker:
      "Did you ever play hide-and-seek and decide the bathroom was the perfect hiding spot?",
  },
  {
    icebreaker:
      "What is the one smell that immediately transports you back to your childhood bathroom?",
  },
  {
    icebreaker: "Did you ever have a bathroom chair that you used for reading?",
  },
  {
    icebreaker:
      "What was the weirdest thing you kept in your pockets and forgot to take out in the bathroom?",
  },
  {
    icebreaker:
      "Did you ever try to brush your teeth with something other than toothpaste?",
  },
  {
    icebreaker: "What was the 'golden rule' your parents set for the bathroom?",
  },
  {
    icebreaker: "Did you ever have a bathroom window you liked to look out of?",
  },
  {
    icebreaker:
      "What is the funniest thing you ever said to your reflection as a child?",
  },
  { icebreaker: "Did you ever feel like the bathroom was a secret clubhouse?" },
  {
    icebreaker:
      "What was your opinion on the 'family bathroom' when you were little?",
  },
  { icebreaker: "Did you ever try to redecorate your bathroom with stickers?" },
  {
    icebreaker: "What was the one bathroom chore you were proud of mastering?",
  },
  {
    icebreaker:
      "Did you ever play with the soap until it turned into a tiny sliver?",
  },
  { icebreaker: "What was your 'dream' bathroom feature as a child?" },
  {
    icebreaker:
      "Did you ever pretend the bathroom was a spaceship command center?",
  },
  {
    icebreaker:
      "What was the most 'grown-up' smell you thought your parents' bathroom had?",
  },
  { icebreaker: "Did you ever use the bathroom to practice your dance moves?" },
  {
    icebreaker:
      "What was the weirdest bathroom product your parents bought that you hated?",
  },
  { icebreaker: "Did you ever try to make your own bath salts as a kid?" },
  {
    icebreaker:
      "What is the funniest memory you have of someone walking in on you?",
  },
  {
    icebreaker:
      "Did you ever have a bathroom shelf you weren't allowed to touch?",
  },
  {
    icebreaker:
      "What was the most 'valuable' thing you owned and stored in the bathroom?",
  },
  { icebreaker: "Did you ever try to make a 'spa' for your parents?" },
  {
    icebreaker:
      "What was the worst haircut incident you ever had in a bathroom?",
  },
  {
    icebreaker:
      "Did you ever use the bathtub to sail boats you made out of paper?",
  },
  {
    icebreaker:
      "What is the one thing you remember about the bathroom lighting in your first home?",
  },
  { icebreaker: "Did you ever have a favorite soap dispenser?" },
  {
    icebreaker:
      "What was the most annoying part about being small in a big bathroom?",
  },
  {
    icebreaker:
      "Did you ever use the sink to wash your face and make a giant mess?",
  },
  {
    icebreaker:
      "What was the funniest joke you ever told yourself in the mirror?",
  },
  {
    icebreaker:
      "Did you ever feel the bathroom was haunted in the middle of the night?",
  },
  {
    icebreaker:
      "What was the one thing you always wanted to buy for the bathroom but couldn't?",
  },
  {
    icebreaker:
      "Did you ever play with the faucet handles to see how many different sounds they made?",
  },
  {
    icebreaker:
      "What is the most 'childish' bathroom product you remember using?",
  },
  {
    icebreaker:
      "Did you ever try to dye your hair in the bathroom using food coloring?",
  },
  {
    icebreaker: "What was the weirdest bathroom decoration you were afraid of?",
  },
  {
    icebreaker:
      "Did you ever use the toilet paper for something other than its intended purpose?",
  },
  { icebreaker: "What was the one bathroom product you thought was magic?" },
  {
    icebreaker: "Did you ever pretend to be a doctor using bathroom supplies?",
  },
  {
    icebreaker: "What was your favorite part of the bathroom when you were 5?",
  },
  {
    icebreaker:
      "Did you ever try to 'clean' the bathroom just to make your parents happy?",
  },
  { icebreaker: "What is the funniest sound you ever made in a bathroom?" },
  {
    icebreaker:
      "Did you ever use the bathroom to practice your 'serious' talk?",
  },
  {
    icebreaker:
      "What was the weirdest thing you saw on a bathroom shelf as a child?",
  },
  { icebreaker: "Did you ever try to make a phone out of bathroom items?" },
  {
    icebreaker:
      "What was the one thing you hated about your childhood bathroom?",
  },
  {
    icebreaker:
      "Did you ever have a specific song you sang in the shower as a kid?",
  },
  {
    icebreaker: "What is the one bathroom memory that always makes you laugh?",
  },
  {
    icebreaker:
      "Did you ever feel like the bathroom mirror was staring at you?",
  },
  {
    icebreaker:
      "What was the most 'fancy' thing about your bathroom growing up?",
  },
  {
    icebreaker: "Did you ever try to make your own face mask in the bathroom?",
  },
  {
    icebreaker: "What was the one thing you always looked for in the bathroom?",
  },
  {
    icebreaker:
      "Did you ever play with the shower curtain rings like they were jewelry?",
  },
  {
    icebreaker:
      "What is the weirdest bathroom-related question you asked your parents?",
  },
  {
    icebreaker:
      "Did you ever use the bathroom floor as a runway for your toys?",
  },
  {
    icebreaker:
      "What was the funniest thing you did to make your reflection laugh?",
  },
  { icebreaker: "Did you ever have a favorite towel color?" },
  { icebreaker: "What was the one thing you couldn't reach in the bathroom?" },
  { icebreaker: "Did you ever use the bathroom to hide from a thunderstorm?" },
  {
    icebreaker:
      "What is the one thing you remember about the shower pressure as a kid?",
  },
  {
    icebreaker:
      "Did you ever try to make a castle in the bathroom with sponges?",
  },
  {
    icebreaker:
      "What is the one thing you’ll never forget about your childhood bathroom?",
  },
  {
    icebreaker:
      "Did you ever have a specific 'nightlight' in the bathroom to keep the monsters away?",
  },
  {
    icebreaker:
      "What was the most imaginative game you ever invented while taking a bath?",
  },
  {
    icebreaker:
      "Did you ever try to write secret messages on the mirror with steam?",
  },
  {
    icebreaker:
      "What was the one bathroom product you were strictly forbidden to touch?",
  },
  {
    icebreaker:
      "Did you ever have a bathroom rug that you thought felt like real fur?",
  },
  {
    icebreaker:
      "What is the funniest thing you remember finding in the 'junk drawer' of the bathroom vanity?",
  },
  {
    icebreaker:
      "Did you ever try to make a 'perfume' by mixing all the soaps in the bathroom?",
  },
  {
    icebreaker:
      "What was your go-to hiding spot in the bathroom during a game of hide-and-seek?",
  },
  {
    icebreaker:
      "Did you ever have a toothbrush that had a character from a cartoon on it?",
  },
  {
    icebreaker:
      "What was the most complicated 'bath ritual' you performed as a kid?",
  },
  {
    icebreaker:
      "Did you ever use the bathroom scale to weigh your favorite stuffed animal?",
  },
  {
    icebreaker:
      "What was the one bathroom smell that always signaled that 'cleaning day' was happening?",
  },
  {
    icebreaker:
      "Did you ever try to see how long you could stand on one leg in the bathroom?",
  },
  {
    icebreaker:
      "What was the weirdest bathroom-related souvenir you brought home from a family trip?",
  },
  {
    icebreaker: "Did you ever try to build a tower out of toilet paper rolls?",
  },
  {
    icebreaker:
      "What was the most daring stunt you ever attempted in the bathtub?",
  },
  {
    icebreaker:
      "Did you ever have a favorite brand of bubble bath that you thought was the best in the world?",
  },
  {
    icebreaker:
      "What was the one bathroom item you thought was for adults only?",
  },
  {
    icebreaker:
      "Did you ever try to wash your doll’s hair in the bathroom sink?",
  },
  { icebreaker: "What was your reaction the first time you saw a bidet?" },
  {
    icebreaker:
      "Did you ever feel like the bathroom mirror was a portal to another world?",
  },
  {
    icebreaker:
      "What was the funniest thing your parents ever found in your pockets after a bath?",
  },
  {
    icebreaker:
      "Did you ever pretend the bathroom sink was a drinking fountain?",
  },
  {
    icebreaker:
      "What was the one bathroom chore you hated so much you’d do anything to get out of it?",
  },
  { icebreaker: "Did you ever use the towel rack as a gymnastics bar?" },
  {
    icebreaker:
      "What was the most memorable bath you ever had—the one with the most bubbles or the most toys?",
  },
  {
    icebreaker:
      "Did you ever try to 'style' your hair with soap and end up with a hard mess?",
  },
  {
    icebreaker:
      "What was the one bathroom item you were sure was going to break?",
  },
  {
    icebreaker:
      "Did you ever have a favorite towel that you took everywhere with you?",
  },
  {
    icebreaker:
      "What was the most interesting thing you ever observed from the bathroom window?",
  },
  {
    icebreaker:
      "Did you ever use the bathroom as a place to keep your 'secret' treasures?",
  },
  {
    icebreaker:
      "What was the most confusing part of your parents' bathroom routine?",
  },
  {
    icebreaker:
      "Did you ever try to make the bathroom look like a palace using random objects?",
  },
  {
    icebreaker:
      "What was the weirdest thing you ever accidentally flushed down the toilet?",
  },
  {
    icebreaker:
      "Did you ever use the bathroom to hide from a chore you were supposed to be doing?",
  },
  {
    icebreaker:
      "What was the most ridiculous thing you ever wore into the bathtub?",
  },
  {
    icebreaker:
      "Did you ever feel like you were being watched while in the bathroom?",
  },
  {
    icebreaker:
      "What was the one bathroom item that always made you feel 'grown-up'?",
  },
  {
    icebreaker:
      "Did you ever try to use a bathroom mirror to give yourself a haircut?",
  },
  {
    icebreaker:
      "What was the funniest thing you ever said while playing in the bathroom?",
  },
  {
    icebreaker:
      "Did you ever use the bathroom as your own personal music studio?",
  },
  {
    icebreaker:
      "What was the one bathroom product that you thought smelled 'fancy'?",
  },
  {
    icebreaker:
      "Did you ever try to play 'doctor' using bandages from the bathroom?",
  },
  {
    icebreaker:
      "What was the most annoying thing about the bathroom layout in your childhood home?",
  },
  {
    icebreaker:
      "Did you ever use the bathroom floor to draw elaborate maps with chalk?",
  },
  {
    icebreaker:
      "What was the funniest face you ever made in the mirror as a kid?",
  },
  {
    icebreaker:
      "Did you ever pretend to be a professional swimmer in the bathtub?",
  },
  {
    icebreaker:
      "What was the one bathroom item you thought was incredibly high-tech?",
  },
  {
    icebreaker:
      "Did you ever try to create your own 'spa' in the bathroom with whatever you could find?",
  },
  {
    icebreaker:
      "What was the one thing about your childhood bathroom that you actually miss?",
  },
  {
    icebreaker:
      "What is the weirdest thing you’ve ever found yourself doing while waiting for the shower to warm up?",
  },
  {
    icebreaker:
      "Do you have a specific 'lucky' order for washing your hair and body?",
  },
  {
    icebreaker:
      "What is the absolute longest amount of time you have spent in the bathroom to avoid talking to people?",
  },
  {
    icebreaker:
      "Are you a 'neat freak' who needs the soap bottle label facing front, or does it not matter?",
  },
  {
    icebreaker:
      "What is your secret tactic for getting through a cold bathroom floor first thing in the morning?",
  },
  {
    icebreaker:
      "If you could change one standard bathroom design feature that drives you crazy, what would it be?",
  },
  {
    icebreaker:
      "Do you prefer to read, scroll through social media, or just stare at the wall when in the bathroom?",
  },
  {
    icebreaker:
      "What is the one bathroom product you refuse to buy the generic/cheap version of?",
  },
  {
    icebreaker:
      "Have you ever blamed a weird bathroom noise on the house settling when it was actually you?",
  },
  {
    icebreaker:
      "What is your opinion on people who bring their phone into the shower to listen to podcasts?",
  },
  {
    icebreaker:
      "Do you keep your bathroom door locked even when you are home completely alone?",
  },
  {
    icebreaker:
      "What is the most unnecessary bathroom luxury you’ve ever seen in someone else's home?",
  },
  {
    icebreaker:
      "Do you squeeze the toothpaste from the bottom like a civilized human, or from the middle like a chaotic rebel?",
  },
  {
    icebreaker:
      "How many half-used bottles of shampoo do you think are currently under your sink?",
  },
  {
    icebreaker:
      "What is your go-to 'fake noise' to mask your presence in a quiet bathroom?",
  },
  {
    icebreaker:
      "Do you check for spiders in the shower every single time, or only sometimes?",
  },
  {
    icebreaker:
      "What is the one thing you always forget to pack for a trip that you only realize once you're in the hotel bathroom?",
  },
  {
    icebreaker:
      "Do you think a bathroom should be decorated with photos of family, or is that too weird?",
  },
  {
    icebreaker:
      "What is your pet peeve regarding how others leave the toilet paper roll?",
  },
  {
    icebreaker:
      "If you had to pick a bathroom scent that defines your personality, what would it be?",
  },
  {
    icebreaker:
      "Do you ever practice your 'serious face' in the bathroom mirror while brushing your teeth?",
  },
  {
    icebreaker:
      "What is the most organized item in your bathroom, and what is the absolute messiest?",
  },
  {
    icebreaker:
      "Do you prefer a heavy, solid bar of soap or foamy liquid soap?",
  },
  {
    icebreaker:
      "What is your opinion on 'double sinks'—are they a luxury or just more surface area to clean?",
  },
  {
    icebreaker:
      "Have you ever accidentally used a face cloth as a dish cloth, or vice versa?",
  },
  {
    icebreaker:
      "Do you hang your towel up neatly, or is it a crumpled heap on the floor?",
  },
  {
    icebreaker:
      "What is the one piece of bathroom advice your parents gave you that you still follow today?",
  },
  {
    icebreaker:
      "Do you ever talk to your reflection, and if so, does it ever talk back?",
  },
  {
    icebreaker:
      "What is the most 'extra' thing you do in your bathroom routine that you know is unnecessary?",
  },
  {
    icebreaker:
      "If you had to live in a house with only one bathroom, what rule would you set for the household?",
  },
  {
    icebreaker:
      "Do you think it's weird to have a clock in the bathroom, or is it essential?",
  },
  {
    icebreaker:
      "What is the first thing you notice when you walk into a bathroom at a restaurant?",
  },
  {
    icebreaker:
      "Do you prefer an extremely bright, clinical-looking bathroom, or a dim, moody one?",
  },
  {
    icebreaker:
      "Have you ever had a 'bathroom epiphany' where you solved a major life problem while showering?",
  },
  {
    icebreaker:
      "What is the one bathroom habit you wish you could break for the sake of the planet?",
  },
  {
    icebreaker: "Do you have a specific towel for your face versus your body?",
  },
  {
    icebreaker:
      "How often do you think the average person actually cleans their bathroom mirror?",
  },
  {
    icebreaker:
      "What is the weirdest bathroom-related invention you’ve seen online that you secretly want to try?",
  },
  {
    icebreaker:
      "Do you believe in bath mats, or are they just 'germ sponges' to you?",
  },
  { icebreaker: "What is the most annoying sound a bathroom can make?" },
  {
    icebreaker:
      "Do you have a 'bathroom outfit' (like a specific robe) that you feel fancy in?",
  },
  { icebreaker: "What is your stance on people who leave the toilet seat up?" },
  {
    icebreaker:
      "Have you ever been embarrassed by someone knocking on the door while you were singing in the shower?",
  },
  {
    icebreaker:
      "What is the one item you hope to never find in your bathroom sink drain?",
  },
  {
    icebreaker:
      "Do you ever use the bathroom as a 'safe space' to just sit and think for a while?",
  },
  {
    icebreaker:
      "What is the most efficient way to clean a bathroom in under 10 minutes?",
  },
  {
    icebreaker:
      "Do you prefer to store your toothbrush in a cup or a wall-mounted holder?",
  },
  {
    icebreaker:
      "What is the weirdest thing you’ve ever left behind in a public restroom?",
  },
  {
    icebreaker:
      "Do you have a favorite hand soap scent that makes you feel nostalgic?",
  },
  {
    icebreaker:
      "What is the absolute limit for how many people should be allowed to use one bathroom?",
  },
  {
    icebreaker:
      "Do you ever do full-blown concerts in the bathroom while washing your face?",
  },
  {
    icebreaker:
      "What is your favorite type of bathroom lighting—warm, cool, or color-changing?",
  },
  {
    icebreaker:
      "Do you keep your medicine cabinet organized by type of product or by how often you use it?",
  },
  { icebreaker: "What is the one bathroom 'hack' you swear by?" },
  {
    icebreaker:
      "How many spare rolls of toilet paper do you feel is a 'safe' amount to keep in stock?",
  },
  {
    icebreaker:
      "Do you think bathroom rugs should be matching or mismatched for 'vibe'?",
  },
  {
    icebreaker:
      "What is the most unusual thing you’ve seen stored in someone else’s bathroom?",
  },
  {
    icebreaker:
      "Do you have a specific song that gets you ready for the day when played in the shower?",
  },
  {
    icebreaker:
      "What is your opinion on those little rubber ducks in bathtubs—cute or creepy?",
  },
  {
    icebreaker:
      "Do you ever 'window shop' for fancy bathroom products you know you won't buy?",
  },
  { icebreaker: "What is the most relaxing thing about a bath to you?" },
  { icebreaker: "Do you prefer a walk-in shower or a tub/shower combo?" },
  {
    icebreaker:
      "How do you feel about bathroom art—should it be funny or serious?",
  },
  {
    icebreaker: "What is the weirdest place you’ve ever had to change clothes?",
  },
  {
    icebreaker:
      "Do you keep your bathroom window open for fresh air, or closed for privacy?",
  },
  {
    icebreaker:
      "What is the one bathroom feature you absolutely must have in a new home?",
  },
  {
    icebreaker:
      "How do you store your hair accessories—organized or in a big jumbled pile?",
  },
  {
    icebreaker:
      "Do you have a favorite bathroom candle, and what does it smell like?",
  },
  {
    icebreaker:
      "What is the most annoying thing about sharing a bathroom sink with someone else?",
  },
  { icebreaker: "Do you think every bathroom should have a plant in it?" },
  { icebreaker: "How often do you 'purge' your bathroom of expired products?" },
  {
    icebreaker:
      "Do you have a favorite brand of toothpaste, and will you refuse to use anything else?",
  },
  {
    icebreaker:
      "What is the most awkward thing you've said to a stranger in a public restroom?",
  },
  {
    icebreaker:
      "Do you use a squeegee to clean your shower glass, or are you not that person?",
  },
  {
    icebreaker:
      "What is the biggest difference between a 'guest bathroom' and a 'master bathroom' to you?",
  },
  {
    icebreaker:
      "Do you think it's okay to dry your hands on your pants if the hand towel is wet?",
  },
  { icebreaker: "What is your favorite bathroom color scheme?" },
  {
    icebreaker:
      "Do you ever use the bathroom mirror to practice your 'tough' face for a meeting?",
  },
  { icebreaker: "What is the one bathroom item you always lose track of?" },
  {
    icebreaker:
      "Do you have a specific order in which you use your skincare products?",
  },
  {
    icebreaker:
      "What is the most 'luxurious' feeling thing you do in the bathroom?",
  },
  {
    icebreaker:
      "Do you have a favorite bathroom towel material (cotton, microfiber, etc.)?",
  },
  { icebreaker: "What is your opinion on 'smart' bathroom scales?" },
  {
    icebreaker:
      "How many mirrors do you think you pass before you even get to the bathroom?",
  },
  {
    icebreaker:
      "Do you ever find yourself just standing in the bathroom doing nothing?",
  },
  {
    icebreaker:
      "What is the one thing you always keep in your bathroom cabinet, even if you never use it?",
  },
  { icebreaker: "Do you prefer hand soap in a pump or a bar?" },
  {
    icebreaker:
      "What is the weirdest bathroom-related fear you had as a child?",
  },
  {
    icebreaker:
      "Do you think it's important to have a specific place for everything in the bathroom?",
  },
  {
    icebreaker:
      "How do you handle a bathroom that is too small for all your stuff?",
  },
  {
    icebreaker:
      "What is the one thing you’ve learned about someone else’s bathroom habits that surprised you?",
  },
  { icebreaker: "Do you keep your hair dryer plugged in or stored away?" },
  { icebreaker: "How often do you wash your bath mat?" },
  {
    icebreaker:
      "What is your opinion on those multi-setting showerheads—do you actually use the settings?",
  },
  { icebreaker: "Do you think a bathroom should have a radio or a speaker?" },
  { icebreaker: "What is the most important quality in a bath towel?" },
  {
    icebreaker:
      "Do you ever use your phone to watch a video while in the bath?",
  },
  {
    icebreaker:
      "What is the one bathroom chore you always put off until the last minute?",
  },
  {
    icebreaker: "Do you prefer a bathroom with a window, or is a vent enough?",
  },
  {
    icebreaker:
      "What is the single most 'essential' item you’d take with you if stranded in a bathroom?",
  },
  {
    icebreaker:
      "Do you prefer your toilet paper over the top or hanging under?",
  },
  {
    icebreaker:
      "What is the absolute longest you have ever stayed in the shower just because it felt too nice to leave?",
  },
  {
    icebreaker:
      "Do you have a specific order in which you use your skincare products, or is it a free-for-all?",
  },
  {
    icebreaker:
      "Does a cluttered bathroom counter stress you out, or do you like having everything within reach?",
  },
  {
    icebreaker:
      "Are you a 'squeegee the shower glass' person, or do you let water spots build up?",
  },
  {
    icebreaker:
      "What is your biggest pet peeve when visiting someone else’s bathroom?",
  },
  {
    icebreaker:
      "Do you turn the lights off when you leave the bathroom, or do you have a habit of forgetting?",
  },
  {
    icebreaker:
      "How do you feel about people who leave their hair on the shower wall?",
  },
  {
    icebreaker:
      "Do you have a 'bathroom phone'—a specific device that never leaves the room?",
  },
  {
    icebreaker:
      "Is it a dealbreaker for you if a bathroom doesn’t have a window?",
  },
  {
    icebreaker:
      "Do you store your toothbrush out in the open or behind a closed cabinet door?",
  },
  {
    icebreaker:
      "What is the one bathroom chore you think everyone should do daily but probably doesn't?",
  },
  {
    icebreaker:
      "Do you find it satisfying to organize your bathroom cabinet by color or size?",
  },
  {
    icebreaker:
      "Do you consider a bath bomb a luxury or a messy inconvenience?",
  },
  {
    icebreaker:
      "What is the most 'controversial' bathroom habit you think you have?",
  },
  {
    icebreaker:
      "Do you use a paper towel to turn off the faucet after washing your hands?",
  },
  {
    icebreaker:
      "How long do you think a towel should be used before it needs a wash?",
  },
  {
    icebreaker:
      "Does the sound of a running toilet drive you absolutely insane?",
  },
  {
    icebreaker:
      "Do you have a preferred 'hand towel' texture, or are you not picky?",
  },
  {
    icebreaker:
      "Do you ever find yourself counting things in the bathroom while sitting there (like tiles or patterns)?",
  },
  {
    icebreaker:
      "Is it a 'no-go' to bring your phone into the bathroom, or is it a necessary tool?",
  },
  {
    icebreaker:
      "Do you prefer the bathroom door to be slightly ajar or fully closed when it’s not in use?",
  },
  {
    icebreaker:
      "What is your stance on people who leave a tiny sliver of soap in the dish?",
  },
  {
    icebreaker:
      "Does a brightly lit bathroom feel more like a hospital room to you?",
  },
  {
    icebreaker:
      "Do you have a habit of checking your reflection every single time you walk past a bathroom?",
  },
  {
    icebreaker:
      "How do you handle sharing a bathroom with someone who has a completely different cleaning style?",
  },
  {
    icebreaker:
      "Do you think bath mats should be fluffy or flat and rubberized?",
  },
  {
    icebreaker:
      "What is the one thing that instantly makes you feel like a bathroom is 'unclean'?",
  },
  {
    icebreaker:
      "Do you have a specific scent that you *must* have in the bathroom at all times?",
  },
  {
    icebreaker:
      "Do you think it’s necessary to close the shower curtain/door when not in use?",
  },
  {
    icebreaker:
      "What is your trick for keeping the mirror from fogging up entirely?",
  },
  {
    icebreaker:
      "Do you have a habit of humming or singing even when you’re not in the shower?",
  },
  {
    icebreaker:
      "Does the sight of a stray hair on the sink make you want to clean it immediately?",
  },
  {
    icebreaker:
      "Do you prefer a bathroom with a lot of counter space or a lot of storage cabinets?",
  },
  {
    icebreaker:
      "What is the weirdest habit you’ve ever witnessed a roommate have in the bathroom?",
  },
  { icebreaker: "Do you always use a fresh towel after every single shower?" },
  {
    icebreaker:
      "Is there a specific way you like to fold your towels for display?",
  },
  {
    icebreaker:
      "Does the temperature of the floor matter as much as the water temperature to you?",
  },
  {
    icebreaker:
      "Do you have a habit of reading the back of shampoo bottles while you shower?",
  },
  {
    icebreaker:
      "What is your biggest pet peeve regarding shared bathroom counter space?",
  },
  {
    icebreaker: "Do you ever leave the bathroom door open to help it dry out?",
  },
  {
    icebreaker:
      "How do you feel about people who keep their phone on the bathroom sink?",
  },
  {
    icebreaker:
      "Is there a specific 'night mode' you use for the bathroom lighting?",
  },
  {
    icebreaker:
      "Do you have a routine of cleaning the sink as soon as you finish using it?",
  },
  {
    icebreaker:
      "What do you do if you realize you’ve run out of toothpaste mid-brush?",
  },
  {
    icebreaker: "Does the idea of a bathroom without a vent make you nervous?",
  },
  { icebreaker: "Do you always align your shampoo bottles in a specific way?" },
  {
    icebreaker:
      "What is the one bathroom quirk you’ve successfully passed on to others?",
  },
  {
    icebreaker:
      "Do you think a bathroom should be completely silent, or do you need background noise?",
  },
  {
    icebreaker:
      "How do you feel about guests using your master bathroom instead of the guest one?",
  },
  {
    icebreaker:
      "What is the absolute fanciest hotel bathroom you have ever seen?",
  },
  {
    icebreaker:
      "Have you ever walked into a public restroom and immediately turned around because of the smell?",
  },
  {
    icebreaker:
      "Do you wear flip-flops in hotel showers, or do you trust the cleaning staff?",
  },
  {
    icebreaker:
      "What is the most confusing layout you’ve ever encountered in a public restroom?",
  },
  {
    icebreaker:
      "Have you ever been trapped in a public stall because the lock was broken?",
  },
  {
    icebreaker:
      "What is the most 'aggressive' hand dryer you have ever had to deal with?",
  },
  {
    icebreaker:
      "Do you always use a paper towel to open the door handle when leaving a public restroom?",
  },
  {
    icebreaker:
      "What is the tiniest, most useless free soap you’ve ever received from a hotel?",
  },
  {
    icebreaker:
      "Have you ever accidentally walked into the restroom of the opposite gender?",
  },
  {
    icebreaker:
      "What is the most awkward conversation you’ve ever had while standing at a public sink?",
  },
  {
    icebreaker:
      "Do you think it’s acceptable for a restaurant to require a key code for the restroom?",
  },
  {
    icebreaker:
      "What is your go-to strategy when a public stall has a massive gap in the door?",
  },
  {
    icebreaker:
      "Have you ever had to use an outhouse in the middle of nowhere? How did it go?",
  },
  {
    icebreaker:
      "What is the most unhinged piece of bathroom stall graffiti you’ve ever read?",
  },
  {
    icebreaker: "Do you judge a hotel based on the quality of its toiletries?",
  },
  {
    icebreaker:
      "Have you ever been in a restroom where the lights were motion-sensor and turned off on you?",
  },
  {
    icebreaker:
      "What is the most stressful airplane bathroom experience you have ever had?",
  },
  {
    icebreaker:
      "Do you prefer an airplane bathroom or a gas station restroom in an emergency?",
  },
  {
    icebreaker:
      "Have you ever taken a photo of a bathroom because it was so cool/weird?",
  },
  {
    icebreaker:
      "What is the most 'high-tech' feature you’ve seen in a public bathroom?",
  },
  {
    icebreaker:
      "Do you always check for toilet paper *before* sitting down in a public stall?",
  },
  {
    icebreaker:
      "Have you ever seen a 'men's/women's' bathroom symbol that was so confusing you didn't know which to pick?",
  },
  {
    icebreaker:
      "What is the most relaxing hotel bathroom feature you’ve ever experienced?",
  },
  {
    icebreaker:
      "Do you feel guilty about taking the extra hotel shampoo bottles home?",
  },
  { icebreaker: "What is the strangest public restroom you’ve ever visited?" },
  {
    icebreaker:
      "Do you ever leave a note for the cleaning staff in a hotel bathroom?",
  },
  {
    icebreaker:
      "What is the worst public bathroom you have ever encountered on a road trip?",
  },
  {
    icebreaker:
      "How do you feel about single-user bathrooms in public spaces versus stalls?",
  },
  {
    icebreaker:
      "Have you ever used a restroom at a fancy event and felt completely out of place?",
  },
  {
    icebreaker:
      "Do you think public restrooms are getting cleaner or dirtier over time?",
  },
  {
    icebreaker:
      "What is the most 'out-of-place' object you’ve ever seen in a public restroom?",
  },
  {
    icebreaker:
      "Have you ever been in a public restroom with music playing? Did you like it?",
  },
  {
    icebreaker: "Do you prefer the 'jet' hand dryer or the 'towel dispenser'?",
  },
  {
    icebreaker:
      "What is your opinion on automatic flush sensors—do they ever scare you?",
  },
  {
    icebreaker:
      "Have you ever had to wait in a ridiculously long line for a public restroom?",
  },
  {
    icebreaker:
      "What is the most creative way you’ve ever seen a bathroom labeled?",
  },
  {
    icebreaker:
      "Do you feel like you have to 'perform' when someone else is at the sink in a public restroom?",
  },
  {
    icebreaker:
      "What is the best feature a public restroom could have that most don't?",
  },
  { icebreaker: "Have you ever used a bathroom that had a view of the city?" },
  { icebreaker: "Do you think airplane bathrooms should be bigger?" },
  {
    icebreaker:
      "What is the one thing you always bring with you when traveling just in case the bathroom situation is bad?",
  },
  { icebreaker: "Have you ever been to a bathroom that felt like a spa?" },
  {
    icebreaker:
      "Do you have a favorite hotel chain specifically because of their bathrooms?",
  },
  {
    icebreaker:
      "What is the most unusual thing you’ve seen a traveler doing in a public bathroom?",
  },
  { icebreaker: "Do you ever sanitize the hotel bathroom before using it?" },
  {
    icebreaker:
      "Have you ever been in a public restroom with a very strange echo?",
  },
  {
    icebreaker:
      "What is the most 'homey' touch you’ve ever seen in a public restroom?",
  },
  { icebreaker: "Do you prefer automatic sinks or manual ones?" },
  { icebreaker: "Have you ever found a hidden message in a hotel bathroom?" },
  { icebreaker: "What is the most luxurious hotel amenity you’ve ever used?" },
  {
    icebreaker:
      "Do you think all public restrooms should have a 'no-touch' policy?",
  },
  {
    icebreaker:
      "Have you ever been to a restroom at a concert venue? What was it like?",
  },
  {
    icebreaker:
      "What is the weirdest bathroom experience you’ve had while camping?",
  },
  { icebreaker: "Do you ever use a portable toilet seat cover in public?" },
  {
    icebreaker: "What is the most 'high-tech' hotel bathroom you’ve stayed in?",
  },
  { icebreaker: "Do you ever notice the tiling in public restrooms?" },
  {
    icebreaker:
      "Have you ever had a bathroom door that wouldn't lock? What did you do?",
  },
  {
    icebreaker:
      "What is the most annoying thing about public restroom paper towels?",
  },
  {
    icebreaker: "Do you feel like you are 'on the clock' in a public restroom?",
  },
  { icebreaker: "Have you ever been in a restroom with a really cool sink?" },
  {
    icebreaker:
      "What is the biggest bathroom pet peeve you have while traveling?",
  },
  {
    icebreaker:
      "Do you prefer a hotel bathroom with a bathtub or just a shower?",
  },
  {
    icebreaker:
      "Have you ever seen a bathroom in a store that was clearly meant for something else?",
  },
  {
    icebreaker: "Do you ever try to avoid using public restrooms at all costs?",
  },
  {
    icebreaker:
      "What is the most unusual public bathroom design you have ever seen?",
  },
  {
    icebreaker:
      "Have you ever been in a restroom with a really strong, weird smell?",
  },
  { icebreaker: "Do you think public restrooms should have better lighting?" },
  {
    icebreaker:
      "What is the most 'scary' public restroom experience you’ve had?",
  },
  { icebreaker: "Do you ever use the hotel shampoo as body wash?" },
  { icebreaker: "Have you ever been to a restroom that had a 'waiter'?" },
  {
    icebreaker:
      "What is the one thing you would change about airplane bathrooms?",
  },
  { icebreaker: "Do you have a favorite public restroom you’ve ever used?" },
  { icebreaker: "Have you ever seen a bathroom with really fancy mirrors?" },
  { icebreaker: "Do you think airport bathrooms are generally clean?" },
  {
    icebreaker:
      "What is the most surprising thing you’ve seen in a hotel bathroom?",
  },
  {
    icebreaker:
      "Do you ever feel like you need a shower *after* using a public restroom?",
  },
  { icebreaker: "Have you ever used a restroom in a library?" },
  {
    icebreaker:
      "What is the weirdest sink faucet you’ve ever tried to operate?",
  },
  { icebreaker: "Do you ever take pictures of hotel bathrooms?" },
  {
    icebreaker:
      "Have you ever been in a public restroom with a very strange floor?",
  },
  { icebreaker: "What is the best thing about a high-end hotel bathroom?" },
  {
    icebreaker:
      "Do you ever feel like you are in a movie when in a fancy hotel bathroom?",
  },
  { icebreaker: "Have you ever been in a bathroom with really cool wall art?" },
  {
    icebreaker: "What is the most 'high-tech' thing you’ve seen in a restroom?",
  },
  { icebreaker: "Do you think all hotels should have heated bathroom floors?" },
  { icebreaker: "Have you ever seen a restroom with a really strange door?" },
  {
    icebreaker:
      "What is the most useful amenity a hotel could offer in the bathroom?",
  },
  {
    icebreaker:
      "Do you ever use the bathroom as a place to hide from the crowd?",
  },
  {
    icebreaker:
      "Have you ever been to a public restroom that felt like a dungeon?",
  },
  {
    icebreaker:
      "What is the one thing you would never use in a public restroom?",
  },
  { icebreaker: "Do you have a favorite type of public restroom floor?" },
  {
    icebreaker: "Have you ever been in a restroom with a very strange mirror?",
  },
  {
    icebreaker:
      "What is the most luxurious hotel bathroom you’ve ever stayed in?",
  },
  {
    icebreaker:
      "Do you ever use the bathroom as a place to think while traveling?",
  },
  { icebreaker: "Have you ever seen a restroom with really amazing lighting?" },
  { icebreaker: "What is the most annoying thing about airplane bathrooms?" },
  {
    icebreaker:
      "Do you ever find yourself judging the cleanliness of a hotel by its bathroom?",
  },
  {
    icebreaker:
      "Have you ever been in a public restroom with a very strange sink?",
  },
  {
    icebreaker:
      "What is the one thing you always hope for in a public restroom?",
  },
  {
    icebreaker:
      "Do you think bathrooms are the most important room in a hotel?",
  },
  {
    icebreaker:
      "If you had to curate a 'Bathroom Hall of Fame' based on your travels, what would be the defining feature of the winning entry?",
  },
  {
    icebreaker:
      "If you could have any fictional character design your ideal bathroom, who would you choose and what would their signature design element be?",
  },
];

const lootips = [
  {
    lootip:
      "Flush once, not twice — Save water by avoiding double flushes. One good flush should do the job.",
  },
  {
    lootip:
      "Keep a plunger nearby — Always have one accessible to handle clogs before they worsen.",
  },
  {
    lootip:
      "Use the half-flush option — Modern toilets often have dual-flush buttons. Use the smaller button for liquids only.",
  },
  {
    lootip:
      "Wash your hands for 20 seconds — Hum 'Happy Birthday' twice to make sure you scrub long enough.",
  },
  {
    lootip:
      "Close the lid before flushing — It helps stop germs from spreading into the air.",
  },
  {
    lootip:
      "Don't flush wipes — Even 'flushable' wipes can clog pipes. Bin them instead.",
  },
  {
    lootip:
      "Check for leaks — A running toilet can waste hundreds of litres a day. Listen for hissing.",
  },
  {
    lootip:
      "Keep a small bin in the bathroom — Avoid the temptation to flush things that shouldn't be flushed.",
  },
  {
    lootip:
      "Refill the toilet roll — Be kind to the next person and replace the empty roll.",
  },
  {
    lootip:
      "Open a window or use the fan — Good ventilation keeps the bathroom fresh and reduces mould.",
  },
  {
    lootip:
      "Clean your mobile phone properly after playing games on the loo - Stop those germs from spreading.",
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
      `and ${lootips.length} lootips.`,
  );

  // Close the connection so the script exits cleanly.
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
