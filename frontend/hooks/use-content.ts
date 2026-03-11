import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const API_BASE = '';

async function fetchContent<T>(endpoint: string, lang: string): Promise<T> {
    const response = await fetch(`${API_BASE}/api/content/${lang}/${endpoint}`);
    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return response.json();
}

export interface Service {
    id: string;
    order: number;
    title: string;
    description: string;
    type: string;
    published: boolean;
    createdAt?: string | Date;

}

export function useServices() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Service[]>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['services', language],
        queryFn: () => fetchContent<Service[]>('services', language),
    });
}

export function useService(id: string) {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Service>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['service', id, language],
        queryFn: () => fetchContent<Service>(`services/${id}`, language),
        enabled: !!id,
    });
}

export interface Project {
    id: string;
    order: number;
    images?: string[];
    category: string;
    title: string;
    description: string;
    featured: boolean;
    published: boolean;
    status: string;
    createdAt?: string | Date;
}

export function useProjects(featured?: boolean) {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Project[]>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['projects', language, featured],
        queryFn: async () => {
            const all = await fetchContent<Project[]>('projects', language);
            return featured ? all.filter(p => p.featured) : all;
        },
    });
}

export function useProject(id: string) {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Project>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['project', id, language],
        queryFn: () => fetchContent<Project>(`projects/${id}`, language),
        enabled: !!id,
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
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['testimonials', language],
        queryFn: () => fetchContent<Testimonial[]>('testimonials', language),
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
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['platformUpdates', language],
        queryFn: () => fetchContent<PlatformUpdate[]>('platform-updates', language),
    });
}

// Industries
export interface Industry {
    id: string;
    order: number;
    title: string;
    type?: string;
    description: string;
    published: boolean;
    createdAt?: string | Date;
    solutions?: Solution[];
}

export function useIndustries() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Industry[]>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['industries', language],
        queryFn: () => fetchContent<Industry[]>('industries', language),
    });
}

export function useIndustry(id: string) {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Industry>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['industry', id, language],
        queryFn: () => fetchContent<Industry>(`industries/${id}`, language),
        enabled: !!id,
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
    industryId?: string | null;
}

export function useSolutions() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Solution[]>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['solutions', language],
        queryFn: () => fetchContent<Solution[]>('solutions', language),
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
    portfolioUrl?: string;
    linkedinUrl?: string;
    published: boolean;
}

export function useTeamMembers() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<TeamMember[]>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['teamMembers', language],
        queryFn: () => fetchContent<TeamMember[]>('team', language),
    });
}

// Packages
export interface Package {
    id: string;
    order: number;
    title: string;
    description?: string;
    published: boolean;
    createdAt?: string | Date;

}

export function usePackages() {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Package[]>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['packages', language],
        queryFn: () => fetchContent<Package[]>('packages', language),
    });
}

export function usePackage(id: string) {
    const { i18n } = useTranslation();
    const language = i18n.language as 'en' | 'ar';
    return useQuery<Package>({
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        queryKey: ['package', id, language],
        queryFn: () => fetchContent<Package>(`packages/${id}`, language),
        enabled: !!id,
    });
}

