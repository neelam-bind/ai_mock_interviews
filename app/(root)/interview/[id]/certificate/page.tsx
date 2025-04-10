"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            if (currentUser?.id) {
                const data = await getInterviewsByUserId(currentUser.id);
                setInterviews(data || []);
            }
        };

        fetchData();
    }, []);

    // ----- Growth Chart (Line) -----
    const growthData = interviews.map((interview: any) => ({
        date: new Date(interview.createdAt).toLocaleDateString(),
        score: interview.feedback?.totalScore ?? 0,
    }));

    // ----- Donut Chart (Average of Metrics) -----
    const metricTotals: Record<string, number> = {
        communication: 0,
        problemSolving: 0,
        technicalSkill: 0,
        cultureFit: 0,
    };

    let interviewCount = 0;

    interviews.forEach((interview: any) => {
        const fb = interview.feedback;
        if (fb) {
            metricTotals.communication += fb.communication || 0;
            metricTotals.problemSolving += fb.problemSolving || 0;
            metricTotals.technicalSkill += fb.technicalSkill || 0;
            metricTotals.cultureFit += fb.cultureFit || 0;
            interviewCount++;
        }
    });

    const donutData = Object.keys(metricTotals).map((key) => ({
        name: key,
        value: Number((metricTotals[key] / interviewCount).toFixed(1)) || 0,
    }));

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Welcome, {user?.name}</h2>

            {/* Line Chart - Growth */}
            <div className="bg-white p-4 rounded-xl shadow mb-8">
                <h3 className="text-xl font-medium mb-4">Performance Growth Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={growthData}>
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Donut Chart - Metric Averages */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-xl font-medium mb-4">Interview Metrics Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={donutData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {donutData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardPage;
