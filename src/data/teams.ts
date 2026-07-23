import type { Team } from "../types/team";

import templeLogo from "../assets/temple-serpents/logo.png";
import templeIcon from "../assets/temple-serpents/icon.png";
import templeWordmark from "../assets/temple-serpents/wordmark.png";
import templeTouchdown from "../assets/temple-serpents/touchdown.png";

import reapersLogo from "../assets/blackwood-reapers/logo.png";
import reapersIcon from "../assets/blackwood-reapers/icon.png";
import reapersWordmark from "../assets/blackwood-reapers/wordmark.png";
import reapersTouchdown from "../assets/blackwood-reapers/touchdown.png";

import victimsLogo from "../assets/victims/logo.png";
import victimsIcon from "../assets/victims/icon.png";
import victimsWordmark from "../assets/victims/wordmark.png";
import victimsTouchdown from "../assets/victims/touchdown.png";

export const templeSerpents: Team = {
    id: "temple-serpents",
    name: "Temple Serpents",
    shortName: "SERPENTS",

    colors: {
        primary: "#0b6b57",
        secondary: "#149b8b",
        accent: "#d4aa45",
        text: "#ffffff",
    },

    assets: {
        logo: templeLogo,
        icon: templeIcon,
        wordmark: templeWordmark,
        touchdownImage: templeTouchdown,
    },
};

export const blackwoodReapers: Team = {
    id: "blackwood-reapers",
    name: "Blackwood Reapers",
    shortName: "REAPERS",

    colors: {
        primary: "#25143f",
        secondary: "#5a2f85",
        accent: "#9f75d5",
        text: "#ffffff",
    },

    assets: {
        logo: reapersLogo,
        icon: reapersIcon,
        wordmark: reapersWordmark,
        touchdownImage: reapersTouchdown,
    },
};

export const victims: Team = { // random away team for guests
    id: "victims",
    name: "Victims",
    shortName: "Victims",

    colors: {
        primary: "#241A18",
        secondary: "#7A1716",
        accent: "#E7D9BF",
        text: "#F6F1E7",
    },

    assets: {
        logo: victimsLogo,
        icon: victimsIcon,
        wordmark: victimsWordmark,
        touchdownImage: victimsTouchdown,
    },
};

export const teams: Team[] = [
    templeSerpents,
    blackwoodReapers,
    victims
];