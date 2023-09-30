export const activePlayers = [
    "Khirun of the S.C.",
    "Robi Xenon Li",
    "Thrall Frostskin",
    "Torment"
];

export const classes = [
    {
        name: "Barbarian",
        subclasses: ["Berserker", "Storm Herald", "Totem Warrior", "Zealot"]
    },
    {
        name: "Bard",
        subclasses: ["Lore", "Valor"]
    },
    {
        name: "Cleric",
        subclasses: ["Knowledge", "Life", "Light", "Nature", "Tempest", "Trickery", "War"]
    },
    {
        name: "Druid",
        subclasses: ["Land", "Moon"]
    },
    {
        name: "Fighter",
        subclasses: ["Battle Master", "Champion", "Eldritch Knight"]
    },
    {
        name: "Monk",
        subclasses: ["Four Elements", "Open Hand", "Shadow"]
    },
    {
        name: "Paladin",
        subclasses: ["Ancients", "Devotion", "Vengeance"]
    },
    {
        name: "Ranger",
        subclasses: ["Beast Master", "Hunter"]
    },
    {
        name: "Rogue",
        subclasses: ["Arcane Trickster", "Assassin", "Thief"]
    },
    {
        name: "Sorcerer",
        subclasses: ["Draconic", "Wild Magic"]
    },
    {
        name: "Warlock",
        subclasses: ["Archfey", "Fiend", "Great Old One"]
    },
    {
        name: "Wizard",
        subclasses: ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"]
    }
];

export const itemCategories = [
    "Armor",
    "Potion",
    "Ring",
    "Rod",
    "Scroll",
    "Staff",
    "Wand",
    "Weapon",
    "Wonderous Item"
];

export const rarities = [
    "Common",
    "Uncommon",
    "Rare",
    "Very rare",
    "Legendary"
];

export const schools = [
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation"
];

export const species = [
    {
        name: "Dragonborn",
        subspecies: []
    },
    {
        name: "Dwarf",
        subspecies: ["Hill Dwarf", "Mountain Dwarf"]
    },
    {
        name: "Elf",
        subspecies: ["Dark Elf", "High Elf", "Wood Elf"]
    },
    {
        name: "Gnome",
        subspecies: ["Forest Gnome", "Rock Gnome"]
    },
    {
        name: "Genasi",
        subspecies: ["Air Genasi", "Earth Genasi", "Fire Genasi", "Water Genasi"]
    },
    {
        name: "Half-Elf",
        subspecies: []
    },
    {
        name: "Half-Orc",
        subspecies: []
    },
    {
        name: "Halfling",
        subspecies: ["Lightfoot Halfling", "Stout Halfling"]
    },
    {
        name: "Human",
        subspecies: []
    },
    {
        name: "Kalashtar",
        subspecies: []
    },
    {
        name: "Tiefling",
        subspecies: []
    }
];

export const allSortingFunctions = [
    {
        name: "A to Z",
        func: (a, b) => {
            if (a.completed === b.completed) {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            } else {
                return a.completed > b.completed ? 1 : -1
            };
        }
    },
    {
        name: "Z to A",
        func: (a, b) => {
            if (a.completed === b.completed) {
                return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
            } else {
                return a.completed > b.completed ? 1 : -1
            }
        }
    },
    {
        name: "Spell Level: Low to High",
        func: (a, b) => a.level > b.level ? 1 : -1
    },
    {
        name: "Spell Level: High to Low",
        func: (a, b) => a.level < b.level ? 1 : -1
    }
];

export const spellLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];