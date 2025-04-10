import React from "react";
import Link from "next/link";
import Image from "next/image";

import {Button} from "@/components/ui/button";
import InterviewCard from "@/components/interviewCard";

import {getCurrentUser} from "@/lib/actions/auth.action";
import {
    getInterviewsByUserId,
    getLatestInterviews,
} from "@/lib/actions/general.action";



const Page = async () => {
    const user = await getCurrentUser();

    const [userInterviews, latestInterviews] = await Promise.all([
        await getInterviewsByUserId(user?.id!),
        await getLatestInterviews({ userId: user?.id! })
    ]);


    const hasPastInterviews = userInterviews?.length! > 0;
    const hasUpcomingInterviews  = latestInterviews?.length! > 0;
    return (
        <>

            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>

                    <p className="text-lg">
                        Practice on a real interview questions and get instant feedback
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an interview</Link>
                    </Button>
                </div>

                <Image src="/robot.png" alt="robot-dude" width={400} height={400} className="max-sm:hidden" />
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interview</h2>
                <div className="interview-section">
                    { hasPastInterviews ? (
                            userInterviews?.map((interview) => (
                                <InterviewCard {...interview} key={interview.id} />
                            ))) : (
                            <p>You haven&apos;t taken any interview yet</p>
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an interview</h2>
                <div className="interview-section">
                    { hasUpcomingInterviews ? (
                        latestInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))) : (
                        <p>There are no new interviews available.</p>
                    )}
                </div>
            </section>
        </>
    )
}
export default Page;