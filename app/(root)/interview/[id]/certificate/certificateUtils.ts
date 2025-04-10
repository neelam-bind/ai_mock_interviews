// app/interview/[id]/certificate/certificateUtils.ts

import { Feedback, Interview, User } from "./certificateTypes";

// Mock function to simulate fetching data from an API or database
export async function fetchFeedback(interviewId: string): Promise<Feedback | null> {
    // Simulate fetching feedback data
    return {
        certificateId: `CERT-${interviewId}`,
        createdAt: new Date().toISOString(),
        totalScore: 85,
        finalAssessment: "Well done, great performance!",
    };
}

export async function fetchInterview(interviewId: string): Promise<Interview | null> {
    // Simulate fetching interview data
    return { role: "Software Engineer" };
}

export async function fetchUser(userId: string): Promise<User | null> {
    // Simulate fetching user data
    return { id: userId };
}
