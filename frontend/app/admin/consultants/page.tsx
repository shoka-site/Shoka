"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Camera } from "lucide-react";
import type { Consultant } from "@/hooks/use-content";

export default function AdminConsultants() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nameEn: "",
        nameAr: "",
        roleEn: "",
        roleAr: "",
        bioEn: "",
        bioAr: "",
        imageUrl: "",
        socialButtons: "[]",
        order: 1,
        published: true,
    });

    const { data: consultants = [], isLoading } = useQuery<Consultant[]>({
        queryKey: ["admin-consultants"],
        queryFn: async () => {
            const res = await fetch("/api/content/consultants?lang=en");
            return res.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/admin/consultants", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-consultants"] });
            queryClient.invalidateQueries({ queryKey: ["consultants"] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const res = await fetch(`/api/admin/consultants/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-consultants"] });
            queryClient.invalidateQueries({ queryKey: ["consultants"] });
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/consultants/${id}`, { method: "DELETE" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-consultants"] });
            queryClient.invalidateQueries({ queryKey: ["consultants"] });
        },
    });

    const resetForm = () => {
        setFormData({
            nameEn: "",
            nameAr: "",
            roleEn: "",
            roleAr: "",
            bioEn: "",
            bioAr: "",
            imageUrl: "",
            socialButtons: "[]",
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

    const handleEdit = (consultant: any) => {
        setFormData({
            nameEn: consultant.nameEn || consultant.name,
            nameAr: consultant.nameAr || consultant.name,
            roleEn: consultant.roleEn || consultant.role,
            roleAr: consultant.roleAr || consultant.role,
            bioEn: consultant.bioEn || consultant.bio,
            bioAr: consultant.bioAr || consultant.bio,
            imageUrl: consultant.imageUrl,
            socialButtons: consultant.socialButtons || "[]",
            order: consultant.order,
            published: consultant.published,
        });
        setEditingId(consultant.id);
        setIsEditing(true);
    };

    if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Consultants</h1>
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Add New Consultant"}
                    </Button>
                </div>

                {isEditing && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Image URL</label>
                                <Input
                                    placeholder="/uploads/avatar.png"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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
                                <label className="text-sm font-medium mb-1 block">Name (English)</label>
                                <Input
                                    placeholder="Name (English)"
                                    value={formData.nameEn}
                                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Name (Arabic)</label>
                                <Input
                                    placeholder="Name (Arabic)"
                                    value={formData.nameAr}
                                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Role (English)</label>
                                <Input
                                    placeholder="Role (English)"
                                    value={formData.roleEn}
                                    onChange={(e) => setFormData({ ...formData, roleEn: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Role (Arabic)</label>
                                <Input
                                    placeholder="Role (Arabic)"
                                    value={formData.roleAr}
                                    onChange={(e) => setFormData({ ...formData, roleAr: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Bio (English)</label>
                                <Textarea
                                    placeholder="Bio (English)"
                                    value={formData.bioEn}
                                    onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Bio (Arabic)</label>
                                <Textarea
                                    placeholder="Bio (Arabic)"
                                    value={formData.bioAr}
                                    onChange={(e) => setFormData({ ...formData, bioAr: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Social Buttons (JSON Array)</label>
                            <Textarea
                                placeholder='[{"platform": "linkedin", "url": "..."}]'
                                value={formData.socialButtons}
                                onChange={(e) => setFormData({ ...formData, socialButtons: e.target.value })}
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
                            {editingId ? "Update" : "Create"} Consultant
                        </Button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {consultants.map((consultant: any) => (
                        <div key={consultant.id} className="p-6 bg-muted rounded-lg relative group">
                            <div className="flex items-start gap-4">
                                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {consultant.imageUrl ? (
                                        <img src={consultant.imageUrl} alt={consultant.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera className="w-8 h-8 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-muted-foreground"># {consultant.order}</span>
                                        {consultant.published && (
                                            <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded">Published</span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold truncate">{consultant.name || consultant.nameEn}</h3>
                                    <p className="text-xs text-primary mb-2 font-medium">{consultant.role || consultant.roleEn}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{consultant.bio || consultant.bioEn}</p>
                                </div>
                            </div>

                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(consultant)}>
                                    <Edit className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => deleteMutation.mutate(consultant.id)}
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {consultants.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/50 rounded-lg">
                            No consultants found. Click &quot;Add New Consultant&quot; to create one.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
