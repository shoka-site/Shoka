import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const API_BASE = '';

async function fetchContent<T>(endpoint: string, lang: string): Promise<T> {
    const response = await fetch(`${API_BASE}/api/content/${endpoint}?lang=${lang}`);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return response.json();
}

export interface HeroSlide {
    id: string;
    order: number;
    imageUrl: string;
    badge: string;
    title: string;
    description: string;
    published: boolean;
}

export function useHeroSlides() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<HeroSlide[]>({
        queryKey: ['heroSlides', language],
        queryFn: () => fetchContent<HeroSlide[]>('hero-slides', language),
    });
}

export interface Stat {
    id: string;
    key: string;
    number: string;
    label: string;
    order: number;
}

export function useStats() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Stat[]>({
        queryKey: ['stats', language],
        queryFn: () => fetchContent<Stat[]>('stats', language),
    });
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

export interface WhyShokaPoint {
    id: string;
    order: number;
    iconName: string;
    title: string;
    description: string;
    published: boolean;
}

export function useWhyShokaPoints() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<WhyShokaPoint[]>({
        queryKey: ['whyShokaPoints', language],
        queryFn: () => fetchContent<WhyShokaPoint[]>('why-shoka', language),
    });
}

export interface ProcessStep {
    id: string;
    order: number;
    stepNumber: string;
    title: string;
    description: string;
    published: boolean;
}

export function useProcessSteps() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<ProcessStep[]>({
        queryKey: ['processSteps', language],
        queryFn: () => fetchContent<ProcessStep[]>('process-steps', language),
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
