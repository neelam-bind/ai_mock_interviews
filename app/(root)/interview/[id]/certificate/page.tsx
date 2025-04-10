"use client";

import { useEffect, useRef, useState } from "react";
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const CertificatePage = ({ params }: { params: { id: string } }) => {
    const [user, setUser] = useState<any>(null);
    const [interview, setInterview] = useState<any>(null);
    const [feedback, setFeedback] = useState<any>(null);
    const certificateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await getCurrentUser();
            const interviewData = await getInterviewById(params.id);
            const feedbackData = await getFeedbackByInterviewId({
                interviewId: params.id,
                userId: currentUser?.id!,
            });

            setUser(currentUser);
            setInterview(interviewData);
            setFeedback(feedbackData);
        };

        fetchData();
    }, [params.id]);

    const handleDownload = async () => {
        const element = certificateRef.current;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2, // improves quality
                useCORS: true,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("landscape", "pt", "a4");

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("Certificate.pdf");
        } catch (error) {
            console.error("PDF generation error:", error);
        }
    };


    if (!interview) return <p>Interview not found</p>;
    if (!feedback || feedback.totalScore < 10) {
        return (
            <p className="text-red-500 text-center mt-10">
                You didn’t meet the 60% mark. No certificate generated.
            </p>
        );
    }

    return (
        <div className="p-6">
            <div
                ref={certificateRef}
                className="relative bg-[#f9fbfd] max-w-4xl mx-auto p-10 rounded-xl shadow-lg text-center font-serif overflow-hidden"
            >
                {/* Reduced Top-left wave */}
                <div
                    className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-900 to-blue-600 z-0"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 60% 40%, 0% 100%)",
                    }}
                />

                {/* Reduced Bottom-right wave */}
                <div
                    className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-blue-900 to-blue-600 z-0"
                    style={{
                        clipPath: "polygon(100% 100%, 0 100%, 40% 60%, 100% 0)",
                    }}
                />

                {/* Certificate Content */}
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold text-gray-900 tracking-wide">CERTIFICATE</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-[0.3em] mt-1 mb-4">OF ACHIEVEMENT</h2>

                    <div className="w-20 mx-auto border-t border-gray-400 mb-6 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl text-gray-400">❧</span>
                    </div>

                    <p className="uppercase text-sm text-gray-700 tracking-wider mb-4">
                        This certificate is proudly presented to
                    </p>

                    <h3 className="text-4xl mb-6 text-gray-800 font-[cursive] italic">{user?.name}</h3>

                    <p className="text-sm text-gray-700 max-w-xl mx-auto mb-10 leading-relaxed">
                        for successfully completing the mock interview for <span className="font-semibold">{interview.role}</span>
                        with an outstanding score of{" "}
                        <span className="text-green-700 font-bold">{feedback.totalScore}/100</span> on{" "}
                        {dayjs(feedback.createdAt).format("MMMM D, YYYY")}
                    </p>

                    {/* Signature section */}
                    <div className="flex justify-between items-center px-10 mt-8">
                        {/* Left Signature */}
                        <div className="text-center">
                            <div className="h-10 border-t border-gray-500 w-40 mx-auto mb-1" />
                            <p className="font-semibold text-gray-800">Rufus Stewart</p>
                            <p className="text-sm text-gray-500">Representatives</p>
                        </div>

                        {/* Seal Image (no border) */}
                        <div className="w-20 h-20 mx-4 overflow-hidden rounded-full">
                            <Image
                                src="/seal.jpeg"
                                alt="Seal"
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Right Signature */}
                        <div className="text-center">
                            <div className="h-10 border-t border-gray-500 w-40 mx-auto mb-1" />
                            <p className="font-semibold text-gray-800">Olivia Wilson</p>
                            <p className="text-sm text-gray-500">Representatives</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <div className="text-center mt-6">
                <Button onClick={handleDownload}>Download as PDF</Button>
            </div>
        </div>
    );
};

export default CertificatePage;
