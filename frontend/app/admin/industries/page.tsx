"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Industry } from "@/hooks/use-content";

export default function AdminIndustries() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        iconName: "",
        titleEn: "",
        titleAr: "",
        descriptionEn: "",
        descriptionAr: "",
        order: 1,
        published: true,
    });

    const { data: industries = [], isLoading } = useQuery<Industry[]>({
        queryKey: ["admin-industries"],
        queryFn: async () => {
            const res = await fetch("/api/content/industries?lang=en");
            return res.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/admin/industries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-industries"] });
            queryClient.invalidateQueries({ queryKey: ["industries"] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const res = await fetch(`/api/admin/industries/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-industries"] });
            queryClient.invalidateQueries({ queryKey: ["industries"] });
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/industries/${id}`, { method: "DELETE" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-industries"] });
            queryClient.invalidateQueries({ queryKey: ["industries"] });
        },
    });

    const resetForm = () => {
        setFormData({
            iconName: "",
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

    const handleEdit = (industry: any) => {
        setFormData({
            iconName: industry.iconName,
            titleEn: industry.titleEn || industry.title,
            titleAr: industry.titleAr || industry.title,
            descriptionEn: industry.descriptionEn || industry.description,
            descriptionAr: industry.descriptionAr || industry.description,
            order: industry.order,
            published: industry.published,
        });
        setEditingId(industry.id);
        setIsEditing(true);
    };

    if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Industries</h1>
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Add New"}
                    </Button>
                </div>

                {isEditing && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Icon Name (e.g., Code, Database)"
                                value={formData.iconName}
                                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
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
                            {editingId ? "Update" : "Create"} Industry
                        </Button>
                    </form>
                )}

                <div className="space-y-4">
                    {industries.map((industry: any) => (
                        <div key={industry.id} className="p-6 bg-muted rounded-lg flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-muted-foreground">Order: {industry.order}</span>
                                    {industry.published && (
                                        <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Published</span>
                                    )}
                                    <span className="text-xs bg-blue-500/20 text-blue-600 px-2 py-1 rounded">Icon: {industry.iconName}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{industry.title || industry.titleEn}</h3>
                                <p className="text-sm">{industry.description || industry.descriptionEn}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(industry)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteMutation.mutate(industry.id)}
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {industries.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground bg-muted/50 rounded-lg">
                            No industries found. Click "Add New" to create one.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
