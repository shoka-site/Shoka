import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const API_BASE = '';

async function fetchContent<T>(endpoint: string, lang: string): Promise<T> {
    const response = await fetch(`${API_BASE}/api/content/${endpoint}?lang=${lang}`);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return response.json();
}

export interface Service {
    id: string;
    order: number;
    iconName: string;
    title: string;
    description: string;
    published: boolean;
}

export function useServices() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Service[]>({
        queryKey: ['services', language],
        queryFn: () => fetchContent<Service[]>('services', language),
    });
}

export interface Project {
    id: string;
    order: number;
    imageUrl: string;
    category: string;
    title: string;
    description: string;
    featured: boolean;
    published: boolean;
    status: string;
}

export function useProjects(featured?: boolean) {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    const endpoint = featured ? `projects?featured=true` : 'projects';
    return useQuery<Project[]>({
        queryKey: ['projects', language, featured],
        queryFn: () => fetchContent<Project[]>(endpoint, language),
    });
}

export interface Testimonial {
    id: string;
    order: number;
    quote: string;
    author: string;
    role: string;
    rating: number;
    published: boolean;
}

export function useTestimonials() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Testimonial[]>({
        queryKey: ['testimonials', language],
        queryFn: () => fetchContent<Testimonial[]>('testimonials', language),
    });
}

export interface InsightTopic {
    id: string;
    order: number;
    title: string;
    description: string;
    readTime: string;
    published: boolean;
}

export function useInsightTopics() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<InsightTopic[]>({
        queryKey: ['insightTopics', language],
        queryFn: () => fetchContent<InsightTopic[]>('insights', language),
    });
}

export interface PlatformUpdate {
    id: string;
    order: number;
    type: 'news' | 'achievement' | 'event' | 'new';
    title: string;
    summary: string;
    date: string;
    published: boolean;
}

export function usePlatformUpdates() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<PlatformUpdate[]>({
        queryKey: ['platformUpdates', language],
        queryFn: () => fetchContent<PlatformUpdate[]>('platform-updates', language),
    });
}

// Industries
export interface Industry {
    id: string;
    order: number;
    iconName: string;
    title: string;
    description: string;
    published: boolean;
}

export function useIndustries() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Industry[]>({
        queryKey: ['industries', language],
        queryFn: () => fetchContent<Industry[]>('industries', language),
    });
}

// Solutions
export interface Solution {
    id: string;
    order: number;
    iconName: string;
    title: string;
    description: string;
    published: boolean;
}

export function useSolutions() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Solution[]>({
        queryKey: ['solutions', language],
        queryFn: () => fetchContent<Solution[]>('solutions', language),
    });
}

// Consultants
export interface Consultant {
    id: string;
    order: number;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    socialButtons: string; // JSON string
    published: boolean;
}

export function useConsultants() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Consultant[]>({
        queryKey: ['consultants', language],
        queryFn: () => fetchContent<Consultant[]>('consultants', language),
    });
}

// Team Members
export interface TeamMember {
    id: string;
    order: number;
    name: string;
    role: string;
    bio: string;
    description?: string;
    imageUrl: string;
    resumeUrl?: string;
    published: boolean;
}

export function useTeamMembers() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<TeamMember[]>({
        queryKey: ['teamMembers', language],
        queryFn: () => fetchContent<TeamMember[]>('team', language),
    });
}
