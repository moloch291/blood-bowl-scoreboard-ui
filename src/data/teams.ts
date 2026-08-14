import type { Team } from "../types/team";

import templeLogo from "../assets/temple-serpents/logo.png";
import templeIcon from "../assets/temple-serpents/icon.png";
import templeWordmark from "../assets/temple-serpents/wordmark.png";
import templeTouchdown from "../assets/temple-serpents/touchdown.png";

import reapersLogo from "../assets/blackwood-reapers/logo.png";
import reapersIcon from "../assets/blackwood-reapers/icon.png";
import reapersWordmark from "../assets/blackwood-reapers/wordmark.png";
import reapersTouchdown from "../assets/blackwood-reapers/touchdown.png";

import neonpunksLogo from "../assets/mordheim-neonpunks/logo.png";
import neonpunksIcon from "../assets/mordheim-neonpunks/icon.png";
import neonpunksWordmark from "../assets/mordheim-neonpunks/wordmark.png";
import neonpunksTouchdown from "../assets/mordheim-neonpunks/touchdown.png";

import owlsLogo from "../assets/oakenbrow-owls/logo.png";
import owlsIcon from "../assets/oakenbrow-owls/icon.png";
import owlsWordmark from "../assets/oakenbrow-owls/wordmark.png";
import owlsTouchdown from "../assets/oakenbrow-owls/touchdown.png";

import cometsLogo from "../assets/lothern-comets/logo.png"
import cometsIcon from "../assets/lothern-comets/icon.png"
import cometsWordmark from "../assets/lothern-comets/wordmark.png"
import cometsTouchdown from "../assets/lothern-comets/touchdown.png"

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

export const mordheimNeonpunks: Team = {
    id: "mordheim-neonpukns",
    name: "Mordheim NeonPunks",
    shortName: "Punks",

    colors: {
        primary: "#190B2E",
        secondary: "#F20A9B",
        accent: "#BFFF00",
        text: "#F5E7C6",
    },

    assets: {
        logo: neonpunksLogo,
        icon: neonpunksIcon,
        wordmark: neonpunksWordmark,
        touchdownImage: neonpunksTouchdown,
    },
};

export const oakenbrowOwls: Team = {
    id: "oakenbrow-owls",
    name: "Oakenbrow Owls",
    shortName: "OWLS",

    colors: {
        primary: "#0F5C4A",
        secondary: "#6F9A61",
        accent: "#C6A34A",
        text: "#E8E0CC",
    },

    assets: {
        logo: owlsLogo,
        icon: owlsIcon,
        wordmark: owlsWordmark,
        touchdownImage: owlsTouchdown,
    },
};

export const lothernComets: Team = {
    id: "lothern-comets",
    name: "Lothern Comets",
    shortName: "Comets",

    colors: {
        primary: "#4B1D7A",
        secondary: "#F8F1DC",
        accent: "#D4A635",
        text: "#FFFFFF",
    },

    assets: {
        logo: cometsLogo,
        icon: cometsIcon,
        wordmark: cometsWordmark,
        touchdownImage: cometsTouchdown,
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
    mordheimNeonpunks,
    oakenbrowOwls,
    lothernComets,
    victims
];