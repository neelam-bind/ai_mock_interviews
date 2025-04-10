// app/interview/[id]/certificate/certificateTypes.ts

export interface Feedback {
    certificateId: string;
    createdAt: string;
    totalScore: number;
    finalAssessment: string;
}

export interface Interview {
    role: string;
}

export interface User {
    id: string;
}
