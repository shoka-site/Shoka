import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { HeroSlide } from "@/hooks/use-content";

export default function AdminHeroSlides() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        imageUrl: "",
        badgeEn: "",
        badgeAr: "",
        titleEn: "",
        titleAr: "",
        descriptionEn: "",
        descriptionAr: "",
        order: 1,
        published: true,
    });

    // Fetch all hero slides
    const { data: slides = [], isLoading } = useQuery<HeroSlide[]>({
        queryKey: ["admin-hero-slides"],
        queryFn: async () => {
            const res = await fetch("/api/content/hero-slides?lang=en");
            return res.json();
        },
    });

    // Create mutation
    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/admin/hero-slides", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
            queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
            resetForm();
        },
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const res = await fetch(`/api/admin/hero-slides/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
            queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
            resetForm();
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/hero-slides/${id}`, { method: "DELETE" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
            queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
        },
    });

    const resetForm = () => {
        setFormData({
            imageUrl: "",
            badgeEn: "",
            badgeAr: "",
            titleEn: "",
            titleAr: "",
            descriptionEn: "",
            descriptionAr: "",
            order: 1,
            published: true,
        });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateMutation.mutate({ id: editingId, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleEdit = (slide: any) => {
        setFormData({
            imageUrl: slide.imageUrl,
            badgeEn: slide.badgeEn || slide.badge,
            badgeAr: slide.badgeAr || slide.badge,
            titleEn: slide.titleEn || slide.title,
            titleAr: slide.titleAr || slide.title,
            descriptionEn: slide.descriptionEn || slide.description,
            descriptionAr: slide.descriptionAr || slide.description,
            order: slide.order,
            published: slide.published,
        });
        setEditingId(slide.id);
        setIsEditing(true);
    };

    if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Hero Slides</h1>
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Add New"}
                    </Button>
                </div>

                {isEditing && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Image URL"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                required
                            />
                            <Input
                                type="number"
                                placeholder="Order"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Badge (English)"
                                value={formData.badgeEn}
                                onChange={(e) => setFormData({ ...formData, badgeEn: e.target.value })}
                                required
                            />
                            <Input
                                placeholder="Badge (Arabic)"
                                value={formData.badgeAr}
                                onChange={(e) => setFormData({ ...formData, badgeAr: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Title (English)"
                                value={formData.titleEn}
                                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                required
                            />
                            <Input
                                placeholder="Title (Arabic)"
                                value={formData.titleAr}
                                onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Textarea
                                placeholder="Description (English)"
                                value={formData.descriptionEn}
                                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                required
                            />
                            <Textarea
                                placeholder="Description (Arabic)"
                                value={formData.descriptionAr}
                                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                />
                                Published
                            </label>
                        </div>

                        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                            {editingId ? "Update" : "Create"} Slide
                        </Button>
                    </form>
                )}

                <div className="space-y-4">
                    {slides.map((slide: any) => (
                        <div key={slide.id} className="p-6 bg-muted rounded-lg flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-muted-foreground">Order: {slide.order}</span>
                                    {slide.published && (
                                        <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Published</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{slide.title || slide.titleEn}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{slide.badge || slide.badgeEn}</p>
                                <p className="text-sm">{slide.description || slide.descriptionEn}</p>
                                <p className="text-xs text-muted-foreground mt-2">Image: {slide.imageUrl}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(slide)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteMutation.mutate(slide.id)}
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
