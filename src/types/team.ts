export interface TeamColors {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
}

export interface TeamAssets {
    logo: string;
    icon: string;
    wordmark: string;
    touchdownImage: string;
}

export interface Team {
    id: string;
    name: string;
    shortName: string;
    colors: TeamColors;
    assets: TeamAssets;
}