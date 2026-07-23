export interface Team {
    id: string;
    name: string;
    shortName: string;
    logo: string;
    touchdownImage: string;

    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
}
