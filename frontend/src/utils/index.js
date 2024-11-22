// MONSTERS AND ABILITIES IMAGES

// Flamewrym
import flamewyrm from "../assets/images/flamewyrm/flamewyrm.png";
import flameclaw from '../assets/images/flamewyrm/flameclaw.jpg';
import infernoblast from '../assets/images/flamewyrm/infernobust.jpg';
import fireshield from '../assets/images/flamewyrm/fireshield.jpg';
import emberheal from '../assets/images/flamewyrm/emberheal.png';
import blazingamor from '../assets/images/flamewyrm/balzingamor.jpg'

// Dragonoid
import dragonoid from "../assets/images/dragonoid/dragonoid.png";
import boosteddragon from '../assets/images/dragonoid/boosteddragon.jpg';
import firetornado from '../assets/images/dragonoid/firetonado.jpg';
import dragonshield from '../assets/images/dragonoid/dragonshield.jpg';
import flamearmor from '../assets/images/dragonoid/flamearmor.png';
import dragonheart from '../assets/images/dragonoid/dragonheart.jpg';

// Aqualon
import aqualon from "../assets/images/aqualon/aqualon.png";
import tidalwave from '../assets/images/aqualon/tidalwave.png';
import waterstrike from '../assets/images/aqualon/waterstrike.png';
import aquabarrier from '../assets/images/aqualon/aquabarrier.jpg';
import surgingwaters from '../assets/images/aqualon/surgingwaters.jpg';
import oceanicrecovery from '../assets/images/aqualon/oceanicrecovery.jpg';

// Terradon
import terradon from "../assets/images/terradon/terradon.png";
import earthquakeslam from '../assets/images/terradon/earthquakeslam.jpg';
import rockcrush from '../assets/images/terradon/rockcrush.jpg';
import rockarmor from '../assets/images/terradon/rockarmor.jpg';
import stonewall from '../assets/images/terradon/stonewall.jpg';
import terraregenerate from '../assets/images/terradon/terraregenerate.png';

// Stormstrike
import stormstrike from "../assets/images/stormstrike/stormstrike.png";
import lightningstrike from '../assets/images/stormstrike/lightningstrike.jpg';
import windslash from '../assets/images/stormstrike/windslash.png';
import windgust from '../assets/images/stormstrike/windgust.jpg';
import airshield from '../assets/images/stormstrike/airshield.jpg';
import skybreeze from '../assets/images/stormstrike/skybreeze.jpg';

// Glacierhorn
import glacierhorn from "../assets/images/glacierhorn/glacierhorn.png";
import frostbitecharge from '../assets/images/glacierhorn/frostbitecharge.png';
import icystomp from '../assets/images/glacierhorn/icystomp.png';
import icewall from '../assets/images/glacierhorn/icewall.png';
import frozenbarrier from '../assets/images/glacierhorn/frozenbarrier.jpg';
import coldrestoration from '../assets/images/glacierhorn/coldrestoration.png';

// Haos
// import haos from "../assets/images/haos/haos.png";
// import luminousstrike from '../assets/images/haos/luminousstrike.jpg';
// import lightburst from '../assets/images/haos/lightburst.jpg';
// import lightshield from '../assets/images/haos/lightshield.jpg';
// import radiantbarrier from '../assets/images/haos/radiantbarrier.jpg';
// import solarheal from '../assets/images/haos/solarheal.jpg';

// Preyas
// import preyas from "../assets/images/preyas/preyas.png";
// import aquajet from '../assets/images/preyas/aquajet.jpg';
// import attributechange from '../assets/images/preyas/attributechange.jpg';
// import watervail from '../assets/images/preyas/watervail.jpg';
// import adaptiveshield from '../assets/images/preyas/adaptiveshield.jpg';
// import aquarecovery from '../assets/images/preyas/aquarecovery.jpg';

// Tigrerra
// import tigrerra from "../assets/images/tigrerra/tigrerra.png";
// import velocityfang from '../assets/images/tigrerra/velocityfang.jpg';
// import lightningslash from '../assets/images/tigrerra/lightningslash.jpg';
// import nobleshield from '../assets/images/tigrerra/nobleshield.jpg';
// import lightbarrier from '../assets/images/tigrerra/lightbarrier.jpg';
// import swiftrecovery from '../assets/images/tigrerra/swiftrecovery.jpg';

// Gorem
// import gorem from "../assets/images/gorem/gorem.png";
// import grandimpact from '../assets/images/gorem/grandimpact.jpg';
// import seismiccrush from '../assets/images/gorem/seismiccrush.jpg';
// import terrashield from '../assets/images/gorem/terrashield.jpg';
// import stonefortress from '../assets/images/gorem/stonefortress.jpg';
// import earthrestore from '../assets/images/gorem/earthrestore.jpg';




export const monsters = [
  {
    id: 1,
    name: "Flamewyrm",
    image: flamewyrm,
    type: "Fire",
    description:
      "A fiery dragon with molten scales and the ability to summon firestorms.",
    abilities: {
      attack: [
        {
          name: "Inferno Blast",
          damage: 45,
          description:
            "Unleashes a devastating concentrated beam of intense flames that can melt through solid steel. The heat generated creates a vacuum effect that pulls enemies into the blast radius.",
          image: infernoblast,
        },
        {
          name: "Flame Claw",
          damage: 30,
          description:
            "Enhances claws with searing flames that not only slash opponents but also leave burning wounds that continue to deal damage over time.",
          image: flameclaw,
        },
      ],
      defense: [
        {
          name: "Fire Shield",
          block: 35,
          description:
            "Creates a rotating barrier of pure flame that incinerates incoming projectiles and reflects energy-based attacks back at the attacker.",
          image: fireshield,
        },
        {
          name: "Blazing Armor",
          block: 25,
          description:
            "Covers the body in a layer of compressed flame that hardens into a protective shell, reducing incoming damage while burning anything that makes contact.",
          image: blazingamor,
        },
      ],
      healing: {
        name: "Ember Heal",
        heal: 20,
        description:
          "Channels internal flame energy to accelerate cellular regeneration, closing wounds and restoring vitality through controlled heat manipulation.",
        image: emberheal,
      },
    },
    power: {
      attack: 90,
      defense: 75,
      speed: 80,
    },
    rarity: "Epic",
    element: "Fire",
    weaknesses: ["Water", "Ice"],
    resistance: ["Earth", "Metal"],
  },
  {
    id: 2,
    name: "Aqualon",
    image: aqualon,
    type: "Water",
    description:
      "A serpent-like sea monster with the power to control ocean currents.",
    abilities: {
      attack: [
        {
          name: "Tidal Wave",
          damage: 40,
          description:
            "Summons a massive wall of pressurized water that crashes down on opponents with the force of a thousand tons, creating a widespread area of effect damage.",
            image: tidalwave,
        },
        {
          name: "Water Strike",
          damage: 35,
          description:
            "Launches precise jets of high-pressure water that can cut through solid rock, targeting multiple weak points simultaneously.",
            image: waterstrike,
        },
      ],
      defense: [
        {
          name: "Aqua Barrier",
          block: 30,
          description:
            "Forms a spherical shield of dense water that absorbs kinetic energy and disperses elemental attacks through molecular redistribution.",
            image: aquabarrier,
        },
        {
          name: "Surging Waters",
          block: 20,
          description:
            "Creates a swirling vortex of water around the body that deflects incoming attacks and disorients nearby enemies with its powerful currents.",
            image: surgingwaters,
        },
      ],
      healing: {
        name: "Oceanic Recovery",
        heal: 25,
        description:
          "Harnesses the life-giving properties of water to restore health, purifying toxins and accelerating natural healing through hydration enhancement.",
          image: oceanicrecovery,
      },
    },
    power: {
      attack: 85,
      defense: 80,
      speed: 85,
    },
    rarity: "Legendary",
    element: "Water",
    weaknesses: ["Electric", "Grass"],
    resistance: ["Fire", "Ice"],
  },
  {
    id: 3,
    name: "Terradon",
    type: "Earth",
    image: terradon,
    description:
      "A colossal stone beast with immense strength, capable of triggering earthquakes.",
    abilities: {
      attack: [
        {
          name: "Earthquake Slam",
          damage: 50,
          description:
            "Strikes the ground with tremendous force, creating seismic waves that shatter the battlefield and knock enemies off balance while dealing massive damage to grounded targets.",
            image: earthquakeslam,
        },
        {
          name: "Rock Crush",
          damage: 35,
          description:
            "Compresses surrounding earth into dense projectiles that explode on impact, showering targets with razor-sharp stone shrapnel.",
            image: rockcrush,
        },
      ],
      defense: [
        {
          name: "Rock Armor",
          block: 40,
          description:
            "Encases the body in layers of compressed minerals and stone, providing near-impenetrable defense that grows stronger as it absorbs impact energy.",
            image: rockarmor,
        },
        {
          name: "Stone Wall",
          block: 30,
          description:
            "Raises massive barriers of solid rock from the ground that can withstand extreme punishment and be used as tactical cover or offensive projectiles.",
            image: stonewall,
        },
      ],
      healing: {
        name: "Terra Regenerate",
        heal: 15,
        description:
          "Absorbs minerals from the surrounding earth to repair and strengthen the body, creating a crystalline healing matrix that gradually restores health.",
          image: terraregenerate,
      },
    },
    power: {
      attack: 95,
      defense: 90,
      speed: 60,
    },
    rarity: "Rare",
    element: "Earth",
    weaknesses: ["Wind", "Water"],
    resistance: ["Electric", "Fire"],
  },
  {
    id: 4,
    name: "Stormstrike",
    type: "Air",
    image: stormstrike,
    description:
      "A swift and agile aerial creature that controls powerful winds and lightning.",
    abilities: {
      attack: [
        {
          name: "Lightning Strike",
          damage: 40,
          description:
            "Channels atmospheric electricity into a precise bolt of lightning that can chain between multiple targets and temporarily paralyze enemies with its electromagnetic charge.",
            image: lightningstrike,
        },
        {
          name: "Wind Slash",
          damage: 35,
          description:
            "Creates razor-sharp blades of compressed air that cut through defenses and can be controlled remotely to attack from multiple angles.",
            image: windslash,
        },
      ],
      defense: [
        {
          name: "Wind Gust",
          block: 25,
          description:
            "Generates powerful updrafts that deflect incoming attacks and can be used to achieve temporary flight or create distance from enemies.",
            image: windgust,
        },
        {
          name: "Air Shield",
          block: 20,
          description:
            "Forms a swirling vortex of high-pressure air that disperses energy attacks and creates a vacuum barrier against physical threats.",
            image: airshield,
        },
      ],
      healing: {
        name: "Sky Breeze",
        heal: 15,
        description:
          "Uses purified air currents to restore stamina and vitality, clearing status effects and providing temporary immunity to airborne debuffs.",
          image: skybreeze,
      },
    },
    power: {
      attack: 80,
      defense: 70,
      speed: 95,
    },
    rarity: "Ultra Rare",
    element: "Air",
    weaknesses: ["Fire", "Metal"],
    resistance: ["Water", "Earth"],
  },
  {
    id: 5,
    name: "Glacierhorn",
    type: "Ice",
    image: glacierhorn,
    description:
      "A massive, icy mammoth with freezing powers that can immobilize opponents.",
    abilities: {
      attack: [
        {
          name: "Frostbite Charge",
          damage: 45,
          description:
            "Rushes forward while emanating waves of absolute zero temperature, freezing everything in its path and causing brittle fractures in frozen targets.",
            image: frostbitecharge,
        },
        {
          name: "Icy Stomp",
          damage: 30,
          description:
            "Creates a shockwave of freezing energy that spreads across the ground, forming deadly ice spikes and reducing enemy movement speed.",
            image: icystomp,
        },
      ],
      defense: [
        {
          name: "Ice Wall",
          block: 35,
          description:
            "Conjures a thick barrier of magically reinforced ice that absorbs thermal energy from attacks and can reflect beam-based abilities.",
            image: icewall,
        },
        {
          name: "Frozen Barrier",
          block: 25,
          description:
            "Surrounds the body with a layer of supercooled air that instantly freezes incoming projectiles and creates a numbing field around the user.",
            image: frozenbarrier,
        },
      ],
      healing: {
        name: "Cold Restoration",
        heal: 20,
        description:
          "Uses cryogenic energy to preserve and restore damaged tissue, creating an ice crystal matrix that accelerates healing and reduces inflammation.",
          image: coldrestoration,
      },
    },
    power: {
      attack: 85,
      defense: 85,
      speed: 70,
    },
    rarity: "Epic",
    element: "Ice",
    weaknesses: ["Fire", "Electric"],
    resistance: ["Water", "Earth"],
  },
  {
    id: 6,
    name: "Dragonoid",
    type: "Pyrus",
    image: dragonoid,
    description:
      "A powerful dragon warrior of fire, known for its incredible strength and burning spirit.",
    abilities: {
      attack: [
        {
          name: "Boosted Dragon",
          damage: 50,
          description:
            "Channels the primal power of ancient dragons into a devastating fire blast that grows stronger with each consecutive use.",
            image: boosteddragon,
        },
        {
          name: "Fire Tornado",
          damage: 45,
          description:
            "Creates a massive vortex of flames that pulls in enemies while bombarding them with superheated air and molten debris.",
            image: firetornado,
        },
      ],
      defense: [
        {
          name: "Dragon Shield",
          block: 35,
          description:
            "Manifests the scales of an elder dragon as an impenetrable defense, growing stronger when health is low.",
            image: dragonshield,
        },
        {
          name: "Flame Armor",
          block: 30,
          description:
            "Wraps the body in dragon fire that acts as both armor and weapon, burning enemies that attempt close combat.",
            image: flamearmor,
        },
      ],
      healing: {
        name: "Dragon Heart",
        heal: 25,
        description:
          "Taps into the immortal essence of dragons to rapidly regenerate health and temporarily boost all abilities.",
          image: dragonheart,
      },
    },
    power: {
      attack: 95,
      defense: 80,
      speed: 85,
    },
    rarity: "Legendary",
    element: "Fire",
    weaknesses: ["Water", "Earth"],
    resistance: ["Plant", "Light"],
  },
  // {
  //   id: 7,
  //   name: "Tigrerra",
  //   type: "Haos",
  //   image: tigrerra,
  //   description:
  //     "A swift and noble warrior with razor-sharp claws and lightning-fast attacks.",
  //   abilities: {
  //     attack: [
  //       {
  //         name: "Velocity Fang",
  //         damage: 45,
  //         description:
  //           "Executes a series of lightning-fast strikes that appear simultaneous to the naked eye, targeting vital points with precision.",
  //           image: velocityfang,
  //       },
  //       {
  //         name: "Lightning Slash",
  //         damage: 40,
  //         description:
  //           "Imbues claws with light energy to deliver electrified slashes that can paralyze enemies and disrupt their energy flow.",
  //           image: lightningslash,
  //       },
  //     ],
  //     defense: [
  //       {
  //         name: "Noble Shield",
  //         block: 30,
  //         description:
  //           "Creates a dignified barrier of light that grows stronger with the user's honor and determination in battle.",
  //           image: nobleshield,
  //       },
  //       {
  //         name: "Light Barrier",
  //         block: 25,
  //         description:
  //           "Projects a field of protective light that increases evasion and can briefly phase through attacks.",
  //           image: lightbarrier,
  //       },
  //     ],
  //     healing: {
  //       name: "Swift Recovery",
  //       heal: 20,
  //       description:
  //         "Uses accelerated light particles to speed up natural healing processes and restore mobility after taking damage.",
  //         image: swiftrecovery,
  //     },
  //   },
  //   power: {
  //     attack: 85,
  //     defense: 75,
  //     speed: 95,
  //   },
  //   rarity: "Ultra Rare",
  //   element: "Light",
  //   weaknesses: ["Dark", "Earth"],
  //   resistance: ["Fire", "Wind"],
  // },
  // {
  //   id: 8,
  //   name: "Gorem",
  //   type: "Subterra",
  //   image: gorem,
  //   description:
  //     "A mighty earth warrior with incredible defensive capabilities and ground-shaking attacks.",
  //   abilities: {
  //     attack: [
  //       {
  //         name: "Grand Impact",
  //         damage: 40,
  //         description:
  //           "Channels the weight of the earth into a single devastating punch that creates shockwaves and can shatter any defense.",
  //           image: grandimpact,
  //       },
  //       {
  //         name: "Seismic Crush",
  //         damage: 45,
  //         description:
  //           "Manipulates tectonic forces to create localized earthquakes that trap and crush enemies between shifting earth plates.",
  //           image: seismiccrush,
  //       },
  //     ],
  //     defense: [
  //       {
  //         name: "Terra Shield",
  //         block: 40,
  //         description:
  //           "Summons ancient bedrock to form an ultimate defense that grows stronger as it absorbs more damage.",
  //           image: terrashield,
  //       },
  //       {
  //         name: "Stone Fortress",
  //         block: 35,
  //         description:
  //           "Creates multiple layers of reinforced earth that can be used both defensively and as ammunition for counter-attacks.",
  //           image: stonefortress,
  //       },
  //     ],
  //     healing: {
  //       name: "Earth Restore",
  //       heal: 25,
  //       description:
  //         "Draws upon the planet's natural energy to repair damage and strengthen the body with mineral reinforcement.",
  //         image: earthrestore,
  //     },
  //   },
  //   power: {
  //     attack: 80,
  //     defense: 95,
  //     speed: 65,
  //   },
  //   rarity: "Epic",
  //   element: "Earth",
  //   weaknesses: ["Water", "Ice"],
  //   resistance: ["Electric", "Fire"],
  // },
  // {
  //   id: 9,
  //   name: "Haos",
  //   type: "Light",
  //   image: haos,
  //   description:
  //     "A luminous warrior of light with blinding speed and radiant attacks.",
  //   abilities: {
  //     attack: [
  //       {
  //         name: "Luminous Strike",
  //         damage: 40,
  //         description:
  //           "Concentrates pure light energy into a piercing beam that can penetrate multiple targets and temporarily blind enemies caught in its radiance.",
  //           image: luminousstrike,
  //       },
  //       {
  //         name: "Light Burst",
  //         damage: 35,
  //         description:
  //           "Creates an explosion of intense light that damages enemies while revealing invisible threats and dispelling darkness-based abilities.",
  //           image: lightburst,
  //       },
  //     ],
  //     defense: [
  //       {
  //         name: "Light Shield",
  //         block: 30,
  //         description:
  //           "Projects a barrier of solidified light that refracts incoming attacks and can be expanded to protect allies within its radius.",
  //           image: lightshield,
  //       },
  //       {
  //         name: "Radiant Barrier",
  //         block: 25,
  //         description:
  //           "Emits a constant field of purifying light that weakens dark attacks and provides resistance to status effects.",
  //           image: radiantbarrier,
  //       },
  //     ],
  //     healing: {
  //       name: "Solar Heal",
  //       heal: 20,
  //       description:
  //         "Channels solar energy to restore health and vitality, providing additional healing power during daylight hours and cleansing negative effects.",
  //         image: solarheal,
  //     },
  //   },
  //   power: {
  //     attack: 75,
  //     defense: 75,
  //     speed: 90,
  //   },
  //   rarity: "Rare",
  //   element: "Light",
  //   weaknesses: ["Dark", "Shadow"],
  //   resistance: ["Pyrus", "Ventus"],
  // },
  // {
  //   id: 10,
  //   name: "Preyas",
  //   type: "Aquos",
  //   image: preyas,
  //   description:
  //     "A versatile aquatic warrior with the ability to change attributes and adapt to any situation.",
  //   abilities: {
  //     attack: [
  //       {
  //         name: "Aqua Jet",
  //         damage: 35,
  //         description:
  //           "Propels through water or air using high-pressure water streams, delivering powerful ramming attacks while maintaining perfect maneuverability.",
  //           image: aquajet,
  //       },
  //       {
  //         name: "Attribute Change",
  //         damage: 40,
  //         description:
  //           "Rapidly alters elemental properties to counter enemy weaknesses, gaining temporary resistance to the opponent's attack type.",
  //           image: attributechange,
  //       },
  //     ],
  //     defense: [
  //       {
  //         name: "Water Veil",
  //         block: 25,
  //         description:
  //           "Creates a flowing shield of water that adapts its density to absorb impacts and can split into multiple protective layers.",
  //           image: watervail,
  //       },
  //       {
  //         name: "Adaptable Shield",
  //         block: 30,
  //         description:
  //           "Generates a defensive barrier that changes its properties based on incoming attacks, providing optimal protection against any threat.",
  //           image: adaptiveshield,
  //       },
  //     ],
  //     healing: {
  //       name: "Aqua Recovery",
  //       heal: 25,
  //       description:
  //         "Uses moisture in the air to create a regenerative mist that continuously heals wounds and can be shared with nearby allies.",
  //         image: aquarecovery,
  //     },
  //   },
  //   power: {
  //     attack: 70,
  //     defense: 80,
  //     speed: 85,
  //   },
  //   rarity: "Epic",
  //   element: "Water",
  //   weaknesses: ["Electric", "Plant"],
  //   resistance: ["Fire", "Ice"],
  // },
];
