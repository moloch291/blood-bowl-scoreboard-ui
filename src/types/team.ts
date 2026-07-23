export interface TeamColors {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
}

export interface Team {
    id: string;
    name: string;
    shortName: string;
    logo: string;
    touchdownImage: string;
    colors: TeamColors;
}