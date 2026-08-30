"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Project } from "@/hooks/use-content";

export default function AdminProjects() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        images: [] as string[],
        categoryEn: "",
        categoryAr: "",
        titleEn: "",
        titleAr: "",
        descriptionEn: "",
        descriptionAr: "",
        liveUrl: "",
        keywordsEn: "",
        keywordsAr: "",
        beforeEn: [] as string[],
        beforeAr: [] as string[],
        afterEn: [] as string[],
        afterAr: [] as string[],
        metrics: [] as Array<{ value: string; labelEn: string; labelAr: string; descEn?: string; descAr?: string }>,
        featured: false,
        order: 1,
        published: true,
    });

    const { data: projects = [], isLoading } = useQuery<Project[]>({
        queryKey: ["admin-projects"],
        queryFn: async () => {
            const res = await fetch("/api/admin/projects");
            const json = await res.json();
            return json.data ?? json;
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: Record<string, unknown>) => {
            const res = await fetch("/api/admin/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    const resetForm = () => {
        setFormData({
            images: [],
            categoryEn: "",
            categoryAr: "",
            titleEn: "",
            titleAr: "",
            descriptionEn: "",
            descriptionAr: "",
            liveUrl: "",
            keywordsEn: "",
            keywordsAr: "",
            beforeEn: [],
            beforeAr: [],
            afterEn: [],
            afterAr: [],
            metrics: [],
            featured: false,
            order: 1,
            published: true,
        });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.images || formData.images.length === 0) {
            alert("Please select at least one image");
            return;
        }
        if (editingId) {
            updateMutation.mutate({ id: editingId, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            const json = await res.json();
            if (json.success && json.data?.url) {
                setFormData((prev) => ({ ...prev, images: [...prev.images, json.data.url] }));
            } else {
                const errorMsg = json.error?.message || "Upload failed";
                console.error("Upload failed:", json.error);
                alert(`Upload failed: ${errorMsg}`);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image. Please check your connection.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (project: Project) => {
        const raw = project as unknown as Record<string, unknown>;
        setFormData({
            images: (raw.images as string[] | undefined) ?? (raw.imageUrl ? [raw.imageUrl as string] : []),
            categoryEn: (raw.categoryEn ?? project.category ?? "") as string,
            categoryAr: (raw.categoryAr ?? project.category ?? "") as string,
            titleEn: (raw.titleEn ?? project.title ?? "") as string,
            titleAr: (raw.titleAr ?? project.title ?? "") as string,
            descriptionEn: (raw.descriptionEn ?? project.description ?? "") as string,
            descriptionAr: (raw.descriptionAr ?? project.description ?? "") as string,
            liveUrl: (project.liveUrl ?? "") as string,
            keywordsEn: (raw.keywordsEn ?? "") as string,
            keywordsAr: (raw.keywordsAr ?? "") as string,
            beforeEn: (raw.beforeEn as string[] | undefined) ?? [],
            beforeAr: (raw.beforeAr as string[] | undefined) ?? [],
            afterEn: (raw.afterEn as string[] | undefined) ?? [],
            afterAr: (raw.afterAr as string[] | undefined) ?? [],
            metrics: (raw.metrics as Array<{ value: string; labelEn: string; labelAr: string; descEn?: string; descAr?: string }> | undefined) ?? [],
            featured: project.featured,
            order: project.order,
            published: project.published,
        });
        setEditingId(project.id);
        setIsEditing(true);
    };

    if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Add New"}
                    </Button>
                </div>

                {isEditing && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Project Image</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={isUploading}
                                    className="cursor-pointer"
                                />
                                {isUploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
                                {formData.images.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.images.map((img, idx) => (
                                            <div key={idx} className="relative group">
                                                {img ? (
                                                    <Image
                                                        src={img}
                                                        alt={`Preview ${idx + 1}`}
                                                        width={128}
                                                        height={64}
                                                        className="h-16 w-32 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="h-16 w-32 bg-muted flex flex-col items-center justify-center rounded border border-dashed text-xs text-muted-foreground p-1 text-center">
                                                        <span>Invalid</span>
                                                        <span>Image</span>
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Order</label>
                                <Input
                                    type="number"
                                    placeholder="Order"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Category (English)"
                                value={formData.categoryEn}
                                onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                                required
                            />
                            <Input
                                placeholder="Category (Arabic)"
                                value={formData.categoryAr}
                                onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
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

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Keywords (English) - comma separated"
                                value={formData.keywordsEn}
                                onChange={(e) => setFormData({ ...formData, keywordsEn: e.target.value })}
                            />
                            <Input
                                placeholder="Keywords (Arabic) - comma separated"
                                value={formData.keywordsAr}
                                onChange={(e) => setFormData({ ...formData, keywordsAr: e.target.value })}
                            />
                        </div>

                        <div className="border border-border/80 rounded-lg p-4 space-y-4 bg-background/50">
                            <h4 className="font-semibold text-sm text-foreground">Operational Transformation Points (Before vs After)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-muted-foreground">Before Points (English - 1 item per line)</label>
                                    <Textarea
                                        rows={3}
                                        placeholder={"Manual ledgers & stock discrepancies\nInternet outage delays\nReport delays"}
                                        value={formData.beforeEn.join("\n")}
                                        onChange={(e) => setFormData({ ...formData, beforeEn: e.target.value.split("\n") })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-muted-foreground">Before Points (Arabic - 1 item per line)</label>
                                    <Textarea
                                        rows={3}
                                        dir="rtl"
                                        placeholder={"سجلات ورقية وتضارب في حسابات الفروع\nتوقف العمليات عند انقطاع الإنترنت\nتأخر التقارير المالية"}
                                        value={formData.beforeAr.join("\n")}
                                        onChange={(e) => setFormData({ ...formData, beforeAr: e.target.value.split("\n") })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-muted-foreground">After Points (English - 1 item per line)</label>
                                    <Textarea
                                        rows={3}
                                        placeholder={"Automated zero-touch sync\n100% continuous sales flow\nReal-time analytics"}
                                        value={formData.afterEn.join("\n")}
                                        onChange={(e) => setFormData({ ...formData, afterEn: e.target.value.split("\n") })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-muted-foreground">After Points (Arabic - 1 item per line)</label>
                                    <Textarea
                                        rows={3}
                                        dir="rtl"
                                        placeholder={"مزامنة تلقائية فورية دون تدخل بشري\nعمليات بيع ومخازن مستمرة 100%\nلوحة تحكم لحظية لجميع الفروع"}
                                        value={formData.afterAr.join("\n")}
                                        onChange={(e) => setFormData({ ...formData, afterAr: e.target.value.split("\n") })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border border-border/80 rounded-lg p-4 space-y-4 bg-background/50">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-sm text-foreground">Quantitative Impact & ROI Metrics</h4>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFormData({
                                        ...formData,
                                        metrics: [...formData.metrics, { value: "", labelEn: "", labelAr: "", descEn: "", descAr: "" }]
                                    })}
                                >
                                    <Plus className="w-3.5 h-3.5 mr-1" />
                                    Add Metric
                                </Button>
                            </div>

                            {formData.metrics.length === 0 ? (
                                <p className="text-xs text-muted-foreground italic">No ROI metrics added for this project yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {formData.metrics.map((metric, idx) => (
                                        <div key={idx} className="p-3 border border-border rounded-md bg-background relative space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-semibold text-primary">Metric #{idx + 1}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 w-7 p-0 text-destructive"
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        metrics: formData.metrics.filter((_, i) => i !== idx)
                                                    })}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                <Input
                                                    placeholder="Value (e.g. +45%, 99.9%)"
                                                    value={metric.value}
                                                    onChange={(e) => {
                                                        const updated = [...formData.metrics];
                                                        updated[idx].value = e.target.value;
                                                        setFormData({ ...formData, metrics: updated });
                                                    }}
                                                />
                                                <Input
                                                    placeholder="Label (English)"
                                                    value={metric.labelEn}
                                                    onChange={(e) => {
                                                        const updated = [...formData.metrics];
                                                        updated[idx].labelEn = e.target.value;
                                                        setFormData({ ...formData, metrics: updated });
                                                    }}
                                                />
                                                <Input
                                                    placeholder="Label (Arabic)"
                                                    dir="rtl"
                                                    value={metric.labelAr}
                                                    onChange={(e) => {
                                                        const updated = [...formData.metrics];
                                                        updated[idx].labelAr = e.target.value;
                                                        setFormData({ ...formData, metrics: updated });
                                                    }}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Input
                                                    placeholder="Description (English)"
                                                    value={metric.descEn ?? ""}
                                                    onChange={(e) => {
                                                        const updated = [...formData.metrics];
                                                        updated[idx].descEn = e.target.value;
                                                        setFormData({ ...formData, metrics: updated });
                                                    }}
                                                />
                                                <Input
                                                    placeholder="Description (Arabic)"
                                                    dir="rtl"
                                                    value={metric.descAr ?? ""}
                                                    onChange={(e) => {
                                                        const updated = [...formData.metrics];
                                                        updated[idx].descAr = e.target.value;
                                                        setFormData({ ...formData, metrics: updated });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Live URL (Optional)</label>
                            <Input
                                placeholder="https://..."
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                />
                                Featured
                            </label>
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
                            {editingId ? "Update" : "Create"} Project
                        </Button>
                    </form>
                )}

                <div className="space-y-4">
                    {projects.map((project: Project) => {
                        const raw = project as unknown as Record<string, unknown>;
                        return (
                        <div key={project.id} className="p-6 bg-muted rounded-lg flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-muted-foreground">Order: {project.order}</span>
                                    {project.published && (
                                        <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Published</span>
                                    )}
                                    {project.featured && (
                                        <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded">Featured</span>
                                    )}
                                    <span className="text-xs bg-purple-500/20 text-purple-600 px-2 py-1 rounded">{(raw.categoryEn as string) || project.category}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{project.title || (raw.titleEn as string)}</h3>
                                <p className="text-sm mb-2">{project.description || (raw.descriptionEn as string)}</p>
                                <p className="text-xs text-muted-foreground">Images: {project.images?.length || 0}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteMutation.mutate(project.id)}
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}
