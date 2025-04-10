"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

// Dummy server-side simulation (replace with real import in prod)
const getCurrentUser = async () => {
    return { id: "user_123" }; // Replace with real auth
};

const getStudentDashboardData = async (userId: string) => {
    // Replace this with actual DB call
    const mockFeedbacks = [
        {
            createdAt: new Date("2025-01-10"),
            categoryScores: [
                { name: "Communication", score: 70 },
                { name: "Problem Solving", score: 75 },
                { name: "Technical Knowledge", score: 80 },
                { name: "Confidence", score: 65 },
                { name: "Time Management", score: 68 },
            ],
        },
        {
            createdAt: new Date("2025-03-15"),
            categoryScores: [
                { name: "Communication", score: 85 },
                { name: "Problem Solving", score: 88 },
                { name: "Technical Knowledge", score: 92 },
                { name: "Confidence", score: 80 },
                { name: "Time Management", score: 84 },
            ],
        },
    ];

    const latestFeedback = mockFeedbacks[mockFeedbacks.length - 1];
    const metrics = ["Communication", "Problem Solving", "Technical Knowledge", "Confidence", "Time Management"];

    const metricScores = metrics.map(metric => {
        const found = latestFeedback.categoryScores.find(c => c.name === metric);
        return { name: metric, value: found?.score || 0 };
    });

    const progress = mockFeedbacks.map(fb => {
        const avg =
            fb.categoryScores.reduce((acc, cur) => acc + cur.score, 0) / fb.categoryScores.length;
        return {
            name: dayjs(fb.createdAt).format("MMM YYYY"),
            score: Math.round(avg),
        };
    });

    return { metrics: metricScores, progress };
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

const DashboardPage = () => {
    const [donutData, setDonutData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const user = await getCurrentUser();
            if (!user) return redirect("/");

            const data = await getStudentDashboardData(user.id);
            setDonutData(data.metrics);
            setBarData(data.progress);
            setLoading(false);
        };

        init();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <section className="p-6 md:p-10 space-y-10">
            <h1 className="text-3xl font-bold text-center">Your Performance Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Donut Chart */}
                <div className="rounded-2xl shadow-lg p-6 bg-white">
                    <h2 className="text-xl font-semibold mb-4">Performance Breakdown</h2>
                    <PieChart width={350} height={300}>
                        <Pie
                            data={donutData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            label
                        >
                            {donutData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                {/* Bar Chart */}
                <div className="rounded-2xl shadow-lg p-6 bg-white">
                    <h2 className="text-xl font-semibold mb-4">Growth Over Time</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="score" fill="#4F46E5" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;
