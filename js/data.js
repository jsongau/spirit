/* ============================================================
   THE PRIMAL ORACLE — data engine
   The 144 grid, the twelve Sun signs, the twelve Year animals,
   the five elements, stones, and the lunar-year boundary table.
   All readings are composed from these parts at runtime.
   ============================================================ */

const ORACLE = (function () {

  /* ---- The twelve Sun signs (Western, daylight self) ---- */
  const WEST = {
    Aries:       { dates:[3,21,4,19],  element:"Fire",  ruler:"Mars",            keyword:"the spark",      light:"courage and momentum", shadow:"impatience that burns its own bridges", stand:"You are mid-ignition. Something in you wants to start before the ground is ready.", need:"to finish one thing before lighting the next" },
    Taurus:      { dates:[4,20,5,20],  element:"Earth", ruler:"Venus",           keyword:"the builder",    light:"steadiness and devotion", shadow:"a stubbornness that calls itself loyalty", stand:"You are holding ground you have quietly outgrown, because holding feels safer than moving.", need:"to let one comfortable thing change" },
    Gemini:      { dates:[5,21,6,21],  element:"Air",   ruler:"Mercury",         keyword:"the messenger",  light:"quickness and range", shadow:"a scattering that mistakes motion for progress", stand:"You are holding two truths and reaching for a third, and the reaching is wearing you thin.", need:"to choose one thread and follow it down" },
    Cancer:      { dates:[6,22,7,22],  element:"Water", ruler:"the Moon",         keyword:"the tide",       light:"deep feeling and care", shadow:"a guardedness that keeps love at arm's length", stand:"You feel more than you let anyone see, and the hiding has become its own kind of weight.", need:"to be let in, and to let yourself be helped" },
    Leo:         { dates:[7,23,8,22],  element:"Fire",  ruler:"the Sun",          keyword:"the heart",      light:"warmth and presence", shadow:"a pride that needs the room's eyes to feel real", stand:"You are waiting to be seen before you let yourself act, and the waiting is costing you.", need:"to create for its own sake, not for applause" },
    Virgo:       { dates:[8,23,9,22],  element:"Earth", ruler:"Mercury",         keyword:"the craftsman",  light:"precision and service", shadow:"a self-criticism that never rests", stand:"You are improving everything around you and refusing yourself the same patience.", need:"to call something good enough and move" },
    Libra:       { dates:[9,23,10,23], element:"Air",   ruler:"Venus",           keyword:"the scale",      light:"grace and fairness", shadow:"an indecision that hides behind keeping the peace", stand:"You are weighing a choice you already made, waiting for permission you can only give yourself.", need:"to disappoint someone a little and act anyway" },
    Scorpio:     { dates:[10,24,11,21],element:"Water", ruler:"Mars and Pluto",  keyword:"the still water",light:"intensity and depth", shadow:"a control that reads everyone and trusts no one", stand:"You are holding a current most people never notice, and guarding it like a wound.", need:"to release one grip and survive the falling" },
    Sagittarius: { dates:[11,22,12,21],element:"Fire",  ruler:"Jupiter",         keyword:"the archer",     light:"vision and faith", shadow:"a restlessness that runs before it arrives", stand:"You are aimed at a far horizon while the ground in front of you waits unattended.", need:"to stay long enough for one thing to root" },
    Capricorn:   { dates:[12,22,1,19], element:"Earth", ruler:"Saturn",          keyword:"the climber",    light:"discipline and endurance", shadow:"a coldness that measures love in summits", stand:"You are climbing well and feeling little, because feeling was never on the schedule.", need:"to let one summit be enough for now" },
    Aquarius:    { dates:[1,20,2,18],  element:"Air",   ruler:"Saturn and Uranus",keyword:"the visionary", light:"originality and vision", shadow:"a distance that keeps people at a theory's length", stand:"You are living a little ahead of everyone, and the solitude has started to feel like proof.", need:"to come down into one real connection" },
    Pisces:      { dates:[2,19,3,20],  element:"Water", ruler:"Jupiter and Neptune",keyword:"the ocean",   light:"compassion and imagination", shadow:"an escapism that dissolves its own edges", stand:"You are feeling every current that joins you and losing the shoreline of yourself.", need:"to draw one boundary and keep it" }
  };

  /* ---- The twelve Year animals (Eastern, midnight self) ---- */
  const EAST = {
    Rat:     { polarity:"Yang", instinct:"survive and acquire", light:"cleverness and resourcefulness", shadow:"an anxiety that hoards", trine:["Dragon","Monkey"], secret:"Ox",     clash:"Horse",  harm:"Goat" },
    Ox:      { polarity:"Yin",  instinct:"endure and build",    light:"reliability and quiet strength", shadow:"a rigidity slow to bend",  trine:["Snake","Rooster"],secret:"Rat",    clash:"Goat",   harm:"Horse" },
    Tiger:   { polarity:"Yang", instinct:"seize and defend",    light:"courage and charisma",           shadow:"a recklessness that leaps early", trine:["Horse","Dog"], secret:"Pig",   clash:"Monkey", harm:"Snake" },
    Rabbit:  { polarity:"Yin",  instinct:"soothe and evade",    light:"gentleness and diplomacy",       shadow:"an avoidance that calls retreat peace", trine:["Goat","Pig"], secret:"Dog",  clash:"Rooster",harm:"Dragon" },
    Dragon:  { polarity:"Yang", instinct:"command and inspire", light:"power and vision",                shadow:"a pride that expects the sky", trine:["Rat","Monkey"], secret:"Rooster",clash:"Dog",  harm:"Rabbit" },
    Snake:   { polarity:"Yin",  instinct:"sense and strike",    light:"intuition and strategy",         shadow:"a secrecy that suspects", trine:["Ox","Rooster"], secret:"Monkey", clash:"Pig",   harm:"Tiger" },
    Horse:   { polarity:"Yang", instinct:"run and be free",     light:"energy and independence",        shadow:"an impatience that cannot be fenced", trine:["Tiger","Dog"], secret:"Goat", clash:"Rat",   harm:"Ox" },
    Goat:    { polarity:"Yin",  instinct:"create and belong",   light:"tenderness and artistry",        shadow:"a worry that leans too hard on others", trine:["Rabbit","Pig"], secret:"Horse",clash:"Ox",  harm:"Rat" },
    Monkey:  { polarity:"Yang", instinct:"solve and play",      light:"wit and ingenuity",              shadow:"a restlessness that turns walls into games", trine:["Rat","Dragon"], secret:"Snake",clash:"Tiger",harm:"Pig" },
    Rooster: { polarity:"Yin",  instinct:"order and display",   light:"precision and confidence",       shadow:"a vanity quick to criticize", trine:["Ox","Snake"], secret:"Dragon", clash:"Rabbit",harm:"Dog" },
    Dog:     { polarity:"Yang", instinct:"protect and be loyal",light:"devotion and a sense of justice",shadow:"an anxiety that expects the worst", trine:["Tiger","Horse"], secret:"Rabbit",clash:"Dragon",harm:"Rooster" },
    Pig:     { polarity:"Yin",  instinct:"enjoy and give",      light:"generosity and sincerity",       shadow:"an indulgence that assumes the best too freely", trine:["Rabbit","Goat"], secret:"Tiger",clash:"Snake",harm:"Monkey" }
  };

  /* ---- The five elements (Chinese birth-element, by year last digit) ---- */
  const ELEMENTS = {
    Wood:  { quality:"growth and vision",    stone:"Green Jade",     note:"generous, reaching, idealistic" },
    Fire:  { quality:"drive and charisma",   stone:"Carnelian",      note:"dynamic, magnetic, restless" },
    Earth: { quality:"patience and ground",  stone:"Smoky Quartz",   note:"steady, reliable, slow and sure" },
    Metal: { quality:"will and structure",   stone:"Hematite",       note:"disciplined, sharp, unyielding" },
    Water: { quality:"depth and intuition",  stone:"Moonstone",      note:"sensitive, persuasive, flowing" }
  };
  const ELEMENT_BY_DIGIT = { 0:"Metal",1:"Metal",2:"Water",3:"Water",4:"Wood",5:"Wood",6:"Fire",7:"Fire",8:"Earth",9:"Earth" };

  /* ---- Sun Stone per Western sign (from chamber 19) ---- */
  const SUN_STONE = {
    Aries:"Carnelian", Taurus:"Rose Quartz", Gemini:"Citrine", Cancer:"Moonstone", Leo:"Tiger's Eye",
    Virgo:"Amazonite", Libra:"Lapis Lazuli", Scorpio:"Obsidian", Sagittarius:"Turquoise",
    Capricorn:"Garnet", Aquarius:"Amethyst", Pisces:"Aquamarine"
  };

  /* ---- The 144 grid. Rows = Sun sign, columns in CHINESE_ORDER ---- */
  const CHINESE_ORDER = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  const WEST_ORDER = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

  const GRID = {
    Aries:       ["Piranha","Hippopotamus","Rhinoceros","Llama","Tyrannosaurus Rex","Praying Mantis","Hammerhead Shark","Catfish","Gorilla","Goldfinch","Doberman Pinscher","Dodo"],
    Taurus:      ["Squirrel","Yak","Wolf","Hedgehog","Rattlesnake","Jackal","Kangaroo","Buffalo","Ostrich","Beaver","Seagull","Wombat"],
    Gemini:      ["Chipmunk","Coyote","Chimpanzee","Toucan","Hummingbird","Lemur","Great White Shark","Centipede","Seal","Parrot","Deer","Cricket"],
    Cancer:      ["Seahorse","Black Bear","Vampire Bat","Turtle","Hornet","Snail","Hermit Crab","Duck","Emperor Tamarin","Iguana","Pit Bull","Lobster"],
    Leo:         ["Otter","Sun Bear","Wolverine","Angora Rabbit","Orca","Fox","Hyena","Swan","Ferret","Peacock","Shih Tzu","Quetzal"],
    Virgo:       ["Mouse","Sea Star","Narwhal","Earthworm","Polar Bear","Jellyfish","Giraffe","Flamingo","Penguin","Corgi","Salamander","Gazelle"],
    Libra:       ["Vulture","Elephant","Tasmanian Devil","Butterfly","Porcupine","Ladybug","Goose","Clownfish","Axolotl","Pelican","Crane","Marmot"],
    Scorpio:     ["Anaconda","Platypus","Honey Badger","Koala","Jaguar","Anglerfish","Dragonfly","Panda","Raven","Owl","Octopus","Squid"],
    Sagittarius: ["Skunk","Raccoon","Mongoose","Sugar Glider","Whale","Tarantula","Dove","Tortoise","Roadrunner","Swordfish","Golden Retriever","Camel"],
    Capricorn:   ["Aardvark","Ant","Komodo Dragon","Weaver Finch","Eagle","Alligator","Salmon","Mole","Woodpecker","Bee","Boxer","Spider"],
    Aquarius:    ["Meerkat","Walrus","Panther","Sloth","Leopard","Boa Constrictor","Unicorn","Handfish","Dolphin","Bird-of-Paradise","Chameleon","Pufferfish"],
    Pisces:      ["Lemming","Moose","Stingray","Silkworm","Firefly","Frog","Gecko","Leafy Seadragon","Cheetah","Ocelot","Tarsier","Zebra"]
  };

  /* ---- Lunar New Year boundary dates (effective Year-animal switch) ----
     If a birthday falls before this month/day, the person belongs to the
     previous lunar year's animal. Covers 1940-2032. ---- */
  const CNY = {
    1940:[2,8],1941:[1,27],1942:[2,15],1943:[2,5],1944:[1,25],1945:[2,13],1946:[2,2],1947:[1,22],
    1948:[2,10],1949:[1,29],1950:[2,17],1951:[2,6],1952:[1,27],1953:[2,14],1954:[2,3],1955:[1,24],
    1956:[2,12],1957:[1,31],1958:[2,18],1959:[2,8],1960:[1,28],1961:[2,15],1962:[2,5],1963:[1,25],
    1964:[2,13],1965:[2,2],1966:[1,21],1967:[2,9],1968:[1,30],1969:[2,17],1970:[2,6],1971:[1,27],
    1972:[2,15],1973:[2,3],1974:[1,23],1975:[2,11],1976:[1,31],1977:[2,18],1978:[2,7],1979:[1,28],
    1980:[2,16],1981:[2,5],1982:[1,25],1983:[2,13],1984:[2,2],1985:[2,20],1986:[2,9],1987:[1,29],
    1988:[2,17],1989:[2,6],1990:[1,27],1991:[2,15],1992:[2,4],1993:[1,23],1994:[2,10],1995:[1,31],
    1996:[2,19],1997:[2,7],1998:[1,28],1999:[2,16],2000:[2,5],2001:[1,24],2002:[2,12],2003:[2,1],
    2004:[1,22],2005:[2,9],2006:[1,29],2007:[2,18],2008:[2,7],2009:[1,26],2010:[2,14],2011:[2,3],
    2012:[1,23],2013:[2,10],2014:[1,31],2015:[2,19],2016:[2,8],2017:[1,28],2018:[2,16],2019:[2,5],
    2020:[1,25],2021:[2,12],2022:[2,1],2023:[1,22],2024:[2,10],2025:[1,29],2026:[2,17],2027:[2,6],
    2028:[1,26],2029:[2,13],2030:[2,3],2031:[1,23],2032:[2,11]
  };

  /* ---- A deeper, hand-written reading for the Snail (Cancer + Snake) ---- */
  const DEEP = {
    Snail: {
      essence:"the soft seer who carries home on his back",
      stand:"You feel everything at a depth almost no one around you registers, and you have made a quiet art of not letting it show. That concealment kept you safe and made you sharp. It is also the wall between you and what you most want.",
      need:"To be let in. Not to let out, which you have trained against for years, but to be helped. One or two people permitted inside the shell, on purpose, while the door is open and you are not pretending to be fine.",
      plan:"Tell one person you already trust one true sentence you would normally seal away. Then choose one path in front of you and stop shopping for a better one for a full lunar cycle. Plant the shell. Stay.",
      beware:"The seal that calls itself self-protection. When something touches you unexpectedly you retract, then narrate the retreat as wisdom. A real pause has a return date. A flinch does not. Watch your moods and your sudden urges to start over.",
      godly:"The Snail awake still feels everything, but shows the weather instead of hiding it, and finds that showing it is what lets people love the real thing. The shell becomes a door you open and close at will. You carry home wherever you go, so there is no room you cannot make safe by entering it.",
      keystone:"Once each lunar cycle, near the new moon, tell one chosen person one true thing. Twelve true things a year. In three years you are a freer creature.",
      stones:["Moonstone","Labradorite","Ammonite (fossil)","Black Tourmaline","Rose Quartz"]
    }
  };

  /* ---- Glyphs for the reveal ---- */
  const GLYPH_WEST = { Aries:"♈", Taurus:"♉", Gemini:"♊", Cancer:"♋", Leo:"♌", Virgo:"♍", Libra:"♎", Scorpio:"♏", Sagittarius:"♐", Capricorn:"♑", Aquarius:"♒", Pisces:"♓" };
  const CN_EAST = { Rat:"鼠", Ox:"牛", Tiger:"虎", Rabbit:"兔", Dragon:"龙", Snake:"蛇", Horse:"马", Goat:"羊", Monkey:"猴", Rooster:"鸡", Dog:"狗", Pig:"猪" };

  return { WEST, EAST, ELEMENTS, ELEMENT_BY_DIGIT, SUN_STONE, GRID, CHINESE_ORDER, WEST_ORDER, CNY, DEEP, GLYPH_WEST, CN_EAST };
})();
