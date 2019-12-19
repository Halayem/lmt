
export interface Project {
    id:             number;
    entitle:        string;
    description:    string;
    enterprise:     Enterprise;
    startDate:      Date;
    endDate:        Date;
    profileIds:     number[];
    skillIds:       number[];
};

export interface Enterprise {
    id:     number;
    name:   string;
};

export interface Profile {
    id:     number;
    name:   string;
};

export interface Skill {
    id:     number;
    name:   string;
};