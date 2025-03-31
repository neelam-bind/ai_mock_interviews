import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/interviewCard";
import Image from "next/image";

const Page = () => {
    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>

                    <p className="text-lg">
                        Practice on a real interview questions and get instant feedback
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an inteview</Link>
                    </Button>
                </div>

                <Image src="/robot.png" alt="robot-dude" width={400} height={400} className="max-sm:hidden" />
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interview</h2>
                <div className="interview-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                    {/*<p>You haven&apos;t taken any interview yet</p>*/}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an interview</h2>
                <div className="interview-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                </div>
            </section>
        </>
    )
}
export default Page;