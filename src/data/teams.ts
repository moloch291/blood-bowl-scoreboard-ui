import type { Team } from "../types/team";

import templeLogo from "../assets/temple-serpents/logo.png";
import templeIcon from "../assets/temple-serpents/icon.png";
import templeWordmark from "../assets/temple-serpents/wordmark.png";
import templeTouchdown from "../assets/temple-serpents/touchdown.png";

import nightmaresLogo from "../assets/sylvania-nightmares/logo.png";
import nightmresIcon from "../assets/sylvania-nightmares/icon.png";
import nightmresWordmark from "../assets/sylvania-nightmares/wordmark.png";
import nightmresTouchdown from "../assets/sylvania-nightmares/touchdown.png";

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

import scarabsLogo from "../assets/khemri-scarabs/logo.png"
import scarabsIcon from "../assets/khemri-scarabs/icon.png"
import scarabsWordmark from "../assets/khemri-scarabs/wordmark.png"
import scarabsTouchdown from "../assets/khemri-scarabs/touchdown.png"

import saursLogo from "../assets/meghbah-saurs/logo.png"
import saursIcon from "../assets/meghbah-saurs/icon.png"
import saursWordmark from "../assets/meghbah-saurs/wordmark.png"
import saursTouchdown from "../assets/meghbah-saurs/touchdown.png"

import templarsLogo from "../assets/parravon-templars/logo.png"
import templarsIcon from "../assets/parravon-templars/icon.png"
import templarsWordmark from "../assets/parravon-templars/wordmark.png"
import templarsTouchdown from "../assets/parravon-templars/touchdown.png"

import reaversLogo from "../assets/skeggi-reavers/logo.png"
import reaversIcon from "../assets/skeggi-reavers/icon.png"
import reaversWordmark from "../assets/skeggi-reavers/wordmark.png"
import reaversTouchdown from "../assets/skeggi-reavers/touchdown.png"

import astralsLogo from "../assets/xlanhuapec-astrals/logo.png"
import astralsIcon from "../assets/xlanhuapec-astrals/icon.png"
import astralsWordmark from "../assets/xlanhuapec-astrals/wordmark.png"
import astralsTouchdown from "../assets/xlanhuapec-astrals/touchdown.png"

import hellcatsLogo from "../assets/har-ganeth-hell-cats/logo.png"
import hellcatsIcon from "../assets/har-ganeth-hell-cats/icon.png"
import hellcatsWordmark from "../assets/har-ganeth-hell-cats/wordmark.png"
import hellcatsTouchdown from "../assets/har-ganeth-hell-cats/touchdown.png"

import victimsLogo from "../assets/victims/logo.png";
import victimsIcon from "../assets/victims/icon.png";
import victimsWordmark from "../assets/victims/wordmark.png";
import victimsTouchdown from "../assets/victims/touchdown.png";

export const templeSerpents: Team = {
    id: "temple-serpents",
    name: "Temple Serpents",
    shortName: "SERPENTS",

    colors: {
        primary: "#F1E8D2",
        secondary: "#D9A514",
        accent: "#08734F",
        text: "#ffffff",
    },

    assets: {
        logo: templeLogo,
        icon: templeIcon,
        wordmark: templeWordmark,
        touchdownImage: templeTouchdown,
    },
};

export const sylvaniaNightmares: Team = {
    id: "sylvania-nightmares",
    name: "Sylvania Nightmares",
    shortName: "NGHTMRS",

    colors: {
        primary: "#39735B",
        secondary: "#17171C",
        accent: "#8B78A8",
        text: "#72D69A",
    },

    assets: {
        logo: nightmaresLogo,
        icon: nightmresIcon,
        wordmark: nightmresWordmark,
        touchdownImage: nightmresTouchdown,
    },
};

export const mordheimNeonpunks: Team = {
    id: "mordheim-neonpukns",
    name: "Mordheim NeonPunks",
    shortName: "NEONPUNKS",

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
    shortName: "COMETS",

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

export const khemriScarabs: Team = {
    id: "khemri-scarabs",
    name: "Khemri Scarabs",
    shortName: "SCARABS",

    colors: {
        primary: "#D6A62E",
        secondary: "#0E9C91",
        accent: "#075A59",
        text: "#F0DFC0",
    },

    assets: {
        logo: scarabsLogo,
        icon: scarabsIcon,
        wordmark: scarabsWordmark,
        touchdownImage: scarabsTouchdown,
    },
};

export const meghbahSaurs: Team = {
    id: "megh'bah-saurs",
    name: "Megh'bah' Saurs",
    shortName: "SAURS",

    colors: {
        primary: "#1256A0",
        secondary: "#168FC4",
        accent: "#071B35",
        text: "#E8DFC6",
    },

    assets: {
        logo: saursLogo,
        icon: saursIcon,
        wordmark: saursWordmark,
        touchdownImage: saursTouchdown,
    },
};

export const parravonTemplars: Team = {
    id: "parravon-templars",
    name: "Parravon Templars",
    shortName: "TEMPLARS",

    colors: {
        primary: "#A51F32",
        secondary: "#171A1F",
        accent: "#AEB7C2",
        text: "#E2E5E8",
    },

    assets: {
        logo: templarsLogo,
        icon: templarsIcon,
        wordmark: templarsWordmark,
        touchdownImage: templarsTouchdown,
    },
};

export const skeggiReavers: Team = {
    id: "skeggi-reavers",
    name: "Skeggi Reavers",
    shortName: "REAVERS",

    colors: {
        primary: "#075A63",
        secondary: "#11181A",
        accent: "#58C7D8",
        text: "#F1E5C8",
    },

    assets: {
        logo: reaversLogo,
        icon: reaversIcon,
        wordmark: reaversWordmark,
        touchdownImage: reaversTouchdown,
    },
};

export const xlanhuapecAstrals: Team = {
    id: "xlanhuapec-astrals",
    name: "Xlanhuapec Astrals",
    shortName: "ASTRALS",

    colors: {
        primary: "#29245C",
        secondary: "#20A58A",
        accent: "#F2C84B",
        text: "#F3E9CE",
    },

    assets: {
        logo: astralsLogo,
        icon: astralsIcon,
        wordmark: astralsWordmark,
        touchdownImage: astralsTouchdown,
    },
};

export const harganethHellcats: Team = {
    id: "har-ganeth-hell-cats",
    name: "Har Ganeth Hell-Cats",
    shortName: "HELL-CATS",

    colors: {
        primary: "#54205F",
        secondary: "#15171D",
        accent: "#C42D4A",
        text: "#E0E2DF"
    },

    assets: {
        logo: hellcatsLogo,
        icon: hellcatsIcon,
        wordmark: hellcatsWordmark,
        touchdownImage: hellcatsTouchdown,
    },
};

export const victims: Team = { // random away team for guests
    id: "victims",
    name: "Victims",
    shortName: "VICTIMS",

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
    sylvaniaNightmares,
    mordheimNeonpunks,
    oakenbrowOwls,
    lothernComets,
    khemriScarabs,
    meghbahSaurs,
    parravonTemplars,
    skeggiReavers,
    xlanhuapecAstrals,
    harganethHellcats,
    victims
];