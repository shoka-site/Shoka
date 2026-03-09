import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [
            services,
            projects,
            testimonials,
            updates,
            industries,
            solutions,
            packages
        ] = await Promise.all([
            storage.getServiceCount(),
            storage.getProjectCount(),
            storage.getTestimonialCount(),
            storage.getPlatformUpdateCount(),
            storage.getIndustryCount(),
            storage.getSolutionCount(),
            storage.getPackageCount(),
        ]);

        return NextResponse.json({
            services,
            projects,
            testimonials,
            updates,
            industries,
            solutions,
            packages
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
    }
}
