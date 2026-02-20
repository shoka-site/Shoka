"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import type { PlatformUpdate } from "@/hooks/use-content";

export default function AdminPlatformUpdates() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        type: "news" as 'news' | 'achievement' | 'event' | 'new',
        titleEn: "",
        titleAr: "",
        summaryEn: "",
        summaryAr: "",
        date: new Date().toISOString().split('T')[0],
        order: 0,
        published: true,
    });

    const { data: updates = [], isLoading } = useQuery<PlatformUpdate[]>({
        queryKey: ["admin-platform-updates"],
        queryFn: async () => {
            const res = await fetch("/api/content/platform-updates?lang=en");
            return res.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
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
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
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
        });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            ...formData,
            date: new Date(formData.date).toISOString()
        };
        if (editingId) {
            updateMutation.mutate({ id: editingId, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleEdit = (update: any) => {
        setFormData({
            type: update.type,
            titleEn: update.titleEn || update.title,
            titleAr: update.titleAr || update.title,
            summaryEn: update.summaryEn || update.summary,
            summaryAr: update.summaryAr || update.summary,
            date: new Date(update.date).toISOString().split('T')[0],
            order: update.order,
            published: update.published,
        });
        setEditingId(update.id);
        setIsEditing(true);
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
                                    onValueChange={(val: any) => setFormData({ ...formData, type: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="news">News</SelectItem>
                                        <SelectItem value="achievement">Achievement</SelectItem>
                                        <SelectItem value="event">Event</SelectItem>
                                        <SelectItem value="new">New Feature</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Date</label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Order</label>
                                <Input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Title (English)</label>
                                <Input
                                    placeholder="Title (English)"
                                    value={formData.titleEn}
                                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Title (Arabic)</label>
                                <Input
                                    placeholder="Title (Arabic)"
                                    value={formData.titleAr}
                                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, summaryEn: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Summary (Arabic)</label>
                                <Textarea
                                    placeholder="Summary (Arabic)"
                                    value={formData.summaryAr}
                                    onChange={(e) => setFormData({ ...formData, summaryAr: e.target.value })}
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
                    {updates.map((update: any) => (
                        <div key={update.id} className="p-6 bg-muted rounded-lg flex justify-between items-start">
                            <div className="flex-1">
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
                                <h3 className="text-xl font-bold mb-2">{update.title || update.titleEn}</h3>
                                <p className="text-sm text-muted-foreground">{update.summary || update.summaryEn}</p>
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
                    ))}
                    {updates.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground bg-muted/50 rounded-lg">
                            No platform updates found. Click "Add New Update" to create one.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
