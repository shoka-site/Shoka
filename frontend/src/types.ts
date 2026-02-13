export interface Service {
    id: number;
    title: string;
    category: string;
    description: string;
    features: string[]; // Parsed JSON
    pricing_model?: string;
    created_at: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[]; // Parsed JSON
    industry?: string;
    results?: string;
    images: string[]; // Parsed JSON
    created_at: string;
}

export interface TeamMember {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    role: string;
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    phone?: string;
    inquiry_type: string;
    selected_service?: string;
    message: string;
    status: string;
    created_at: string;
}

export interface Booking {
    id: number;
    name: string;
    email: string;
    date: string;
    time: string;
    service_type: string;
    status: string;
}
