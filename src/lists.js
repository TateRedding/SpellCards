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