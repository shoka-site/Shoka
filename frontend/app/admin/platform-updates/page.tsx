"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Calendar, Camera } from "lucide-react";
import Image from "next/image";
import type { PlatformUpdate } from "@shared/schema";

export default function AdminPlatformUpdates() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        type: "news" as 'news' | 'achievement' | 'event' | 'new' | 'project' | 'service',
        titleEn: "",
        titleAr: "",
        summaryEn: "",
        summaryAr: "",
        date: new Date().toISOString().split('T')[0],
        order: 0,
        published: true,
        images: [] as string[],
        projectId: "",
        serviceId: "",
    });

    const { data: projects = [] } = useQuery({
        queryKey: ["admin-projects"],
        queryFn: async () => {
            const res = await fetch("/api/admin/projects");
            const json = await res.json();
            return json.data ?? [];
        },
    });

    const { data: services = [] } = useQuery({
        queryKey: ["admin-services"],
        queryFn: async () => {
            const res = await fetch("/api/admin/services");
            const json = await res.json();
            return json.data ?? [];
        },
    });

    const { data: updates = [], isLoading } = useQuery<PlatformUpdate[]>({
        queryKey: ["admin-platform-updates"],
        queryFn: async () => {
            const res = await fetch("/api/admin/platform-updates");
            const json = await res.json();
            return json.data ?? [];
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: Record<string, unknown>) => {
            const res = await fetch("/api/admin/platform-updates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-platform-updates"] });
            queryClient.invalidateQueries({ queryKey: ["platformUpdates"] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
            const res = await fetch(`/api/admin/platform-updates/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-platform-updates"] });
            queryClient.invalidateQueries({ queryKey: ["platformUpdates"] });
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/platform-updates/${id}`, { method: "DELETE" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-platform-updates"] });
            queryClient.invalidateQueries({ queryKey: ["platformUpdates"] });
        },
    });

    const resetForm = () => {
        setFormData({
            type: "news",
            titleEn: "",
            titleAr: "",
            summaryEn: "",
            summaryAr: "",
            date: new Date().toISOString().split('T')[0],
            order: 0,
            published: true,
            images: [],
            projectId: "",
            serviceId: "",
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
        const data = {
            ...formData,
            date: new Date(formData.date).toISOString(),
            projectId: formData.type === 'project' && formData.projectId ? formData.projectId : null,
            serviceId: formData.type === 'service' && formData.serviceId ? formData.serviceId : null,
        };
        if (editingId) {
            updateMutation.mutate({ id: editingId, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleEdit = (update: PlatformUpdate) => {
        const raw = update as unknown as Record<string, unknown>;
        setFormData({
            type: update.type,
            titleEn: update.titleEn || "",
            titleAr: update.titleAr || "",
            summaryEn: update.summaryEn || "",
            summaryAr: update.summaryAr || "",
            date: new Date(update.date).toISOString().split('T')[0],
            order: update.order,
            published: update.published,
            images: (raw.images as string[] | undefined) ?? (raw.imageUrl ? [raw.imageUrl as string] : []),
            projectId: update.projectId || "",
            serviceId: update.serviceId || "",
        });
        setEditingId(update.id);
        setIsEditing(true);
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

    if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Platform Updates</h1>
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Add New Update"}
                    </Button>
                </div>

                {isEditing && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-lg space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Type</label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, type: val as any }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="news">News</SelectItem>
                                        <SelectItem value="achievement">Achievement</SelectItem>
                                        <SelectItem value="event">Event</SelectItem>
                                        <SelectItem value="new">New Feature</SelectItem>
                                        <SelectItem value="project">New Project</SelectItem>
                                        <SelectItem value="service">New Service</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Date</label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Order</label>
                                <Input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        setFormData(prev => ({ ...prev, order: isNaN(val) ? 0 : val }));
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {formData.type === "project" && (
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Select Project</label>
                                    <Select
                                        value={formData.projectId}
                                        onValueChange={(val) => setFormData(prev => ({ ...prev, projectId: val }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projects.map((p: any) => (
                                                <SelectItem key={p.id} value={p.id}>{p.titleEn}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {formData.type === "service" && (
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Select Service</label>
                                    <Select
                                        value={formData.serviceId}
                                        onValueChange={(val) => setFormData(prev => ({ ...prev, serviceId: val }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {services.map((s: any) => (
                                                <SelectItem key={s.id} value={s.id}>{s.titleEn}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Update Images</label>
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

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Title (English)</label>
                                <Input
                                    placeholder="Title (English)"
                                    value={formData.titleEn}
                                    onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Title (Arabic)</label>
                                <Input
                                    placeholder="Title (Arabic)"
                                    value={formData.titleAr}
                                    onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
                                    dir="rtl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Summary (English)</label>
                                <Textarea
                                    placeholder="Summary (English)"
                                    value={formData.summaryEn}
                                    onChange={(e) => setFormData(prev => ({ ...prev, summaryEn: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Summary (Arabic)</label>
                                <Textarea
                                    placeholder="Summary (Arabic)"
                                    value={formData.summaryAr}
                                    onChange={(e) => setFormData(prev => ({ ...prev, summaryAr: e.target.value }))}
                                    dir="rtl"
                                    required
                                />
                            </div>
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

                        <div className="flex gap-2">
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                {editingId ? "Update" : "Create"} Update
                            </Button>
                            <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                        </div>
                    </form>
                )}

                <div className="space-y-4">
                    {updates.map((update: PlatformUpdate) => {
                        const raw = update as unknown as Record<string, unknown>;
                        return (
                        <div key={update.id} className="p-6 bg-muted rounded-lg flex justify-between items-start">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="w-20 h-20 rounded-md bg-accent/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {raw.images && (raw.images as string[]).length > 0 ? (
                                        <Image
                                            src={(raw.images as string[])[0]}
                                            alt={update.titleEn || ""}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1451187530220-a095f9737559?q=80&w=2070";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted/50 flex flex-col items-center justify-center text-center p-1">
                                            <Camera className="w-6 h-6 text-muted-foreground/40 mb-1" />
                                            <span className="text-[8px] text-muted-foreground/60 uppercase font-bold">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs text-muted-foreground">Images: {(raw.images as string[])?.length || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded capitalize">{update.type}</span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {new Date(update.date).toLocaleDateString()}
                                    </span>
                                    {update.published && (
                                        <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">Published</span>
                                    )}
                                    <span className="text-xs text-muted-foreground">Order: {update.order}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 truncate">{update.titleEn}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{update.summaryEn}</p>
                            </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(update)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteMutation.mutate(update.id)}
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        );
                    })}
                    {updates.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground bg-muted/50 rounded-lg">
                            No platform updates found. Click &quot;Add New Update&quot; to create one.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
