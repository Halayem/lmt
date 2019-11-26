export interface Project {
    subject:        string;
    description:    string;
    enterpriseName: string;
    startDate:      Date;
    endDate:        Date;
    roles:          Profile[];
    skills:         Skill[];
};

export interface Profile {
    id:     number;
    name:   string;
};

export interface Skill {
    id:     number;
    name:   string;
};
