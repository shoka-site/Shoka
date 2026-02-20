import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [
            services,
            projects,
            testimonials,
            insights,
            updates,
            industries,
            solutions,
            consultants
        ] = await Promise.all([
            storage.getServiceCount(),
            storage.getProjectCount(),
            storage.getTestimonialCount(),
            storage.getInsightTopicCount(),
            storage.getPlatformUpdateCount(),
            storage.getIndustryCount(),
            storage.getSolutionCount(),
            storage.getConsultantCount(),
        ]);

        return NextResponse.json({
            services,
            projects,
            testimonials,
            insights,
            updates,
            industries,
            solutions,
            consultants
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
    }
}
