export interface UserData {
    name: string;
    jobTitle: string;
    phone: string;
    email: string;
    github: string;
    about: string;
    education: {
        institution: string;
        degree: string;
        status: string;
    };
    skills: {
        languages: string[];
        frameworks: string[];
    };
    achievements: string;
}

