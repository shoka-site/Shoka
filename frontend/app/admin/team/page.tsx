"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Camera, FileText } from "lucide-react";
import type { TeamMember } from "@/hooks/use-content";

export default function AdminTeam() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isUploadingResume, setIsUploadingResume] = useState(false);
    const [formData, setFormData] = useState({
        nameEn: "",
        nameAr: "",
        roleEn: "",
        roleAr: "",
        bioEn: "",
        bioAr: "",
        descriptionEn: "",
        descriptionAr: "",
        imageUrl: "",
        resumeUrl: "",
        order: 1,
        published: true,
    });

    const { data: members = [], isLoading } = useQuery<any[]>({
        queryKey: ["admin-team"],
        queryFn: async () => {
            const res = await fetch("/api/admin/team");
            return res.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/admin/team", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-team"] });
            queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const res = await fetch(`/api/admin/team/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-team"] });
            queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-team"] });
            queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
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
            descriptionEn: "",
            descriptionAr: "",
            imageUrl: "",
            resumeUrl: "",
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json();
            if (data.url) {
                setFormData((prev) => ({ ...prev, imageUrl: data.url }));
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingResume(true);
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json();
            if (data.url) {
                setFormData((prev) => ({ ...prev, resumeUrl: data.url }));
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload resume");
        } finally {
            setIsUploadingResume(false);
        }
    };

    const handleEdit = (member: any) => {
        setFormData({
            nameEn: member.nameEn,
            nameAr: member.nameAr,
            roleEn: member.roleEn,
            roleAr: member.roleAr,
            bioEn: member.bioEn,
            bioAr: member.bioAr,
            descriptionEn: member.descriptionEn || "",
            descriptionAr: member.descriptionAr || "",
            imageUrl: member.imageUrl,
            resumeUrl: member.resumeUrl || "",
            order: member.order,
            published: member.published,
        });
        setEditingId(member.id);
        setIsEditing(true);
    };

    if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Our Team</h1>
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Add Team Member"}
                    </Button>
                </div>

                {isEditing && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-lg space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Team Member Photo</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploadingImage}
                                    className="cursor-pointer"
                                />
                                {isUploadingImage && <p className="text-xs text-muted-foreground">Uploading...</p>}
                                {formData.imageUrl && (
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs text-muted-foreground truncate" title={formData.imageUrl}>
                                            Current: {formData.imageUrl.startsWith('/uploads/') ? formData.imageUrl.split('/').pop() : formData.imageUrl}
                                        </p>
                                        <Image
                                            src={formData.imageUrl || ""}
                                            alt="Preview"
                                            width={80}
                                            height={80}
                                            className="h-20 w-20 object-cover rounded-full"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Resume (PDF)</label>
                                <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleResumeUpload}
                                    disabled={isUploadingResume}
                                    className="cursor-pointer"
                                />
                                {isUploadingResume && <p className="text-xs text-muted-foreground">Uploading...</p>}
                                {formData.resumeUrl && (
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-blue-500" />
                                        <p className="text-xs text-muted-foreground truncate" title={formData.resumeUrl}>
                                            {formData.resumeUrl.startsWith('/uploads/') ? formData.resumeUrl.split('/').pop() : formData.resumeUrl}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
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
                                    placeholder="Full Name"
                                    value={formData.nameEn}
                                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Name (Arabic)</label>
                                <Input
                                    placeholder="الاسم الكامل"
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
                                    placeholder="e.g. CEO, Senior Developer"
                                    value={formData.roleEn}
                                    onChange={(e) => setFormData({ ...formData, roleEn: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Role (Arabic)</label>
                                <Input
                                    placeholder="مثلاً: المدير التنفيذي"
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
                                    placeholder="Short bio"
                                    value={formData.bioEn}
                                    onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Bio (Arabic)</label>
                                <Textarea
                                    placeholder="نبذة مختصرة"
                                    value={formData.bioAr}
                                    onChange={(e) => setFormData({ ...formData, bioAr: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Description (English)</label>
                                <Textarea
                                    placeholder="Longer description"
                                    value={formData.descriptionEn}
                                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Description (Arabic)</label>
                                <Textarea
                                    placeholder="وصف مطول"
                                    value={formData.descriptionAr}
                                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
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

                        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                            {editingId ? "Update" : "Create"} Team Member
                        </Button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {members.map((member: any) => (
                        <div key={member.id} className="p-6 bg-muted rounded-lg relative group">
                            <div className="flex items-start gap-4">
                                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {member.imageUrl ? (
                                        <Image
                                            src={member.imageUrl}
                                            alt={member.nameEn}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Camera className="w-8 h-8 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-muted-foreground"># {member.order}</span>
                                        {member.published && (
                                            <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded">Published</span>
                                        )}
                                        {member.resumeUrl && (
                                            <FileText className="w-3 h-3 text-blue-500" />
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold truncate">{member.nameEn}</h3>
                                    <p className="text-xs text-primary mb-2 font-medium">{member.roleEn}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{member.bioEn}</p>
                                </div>
                            </div>

                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(member)}>
                                    <Edit className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => deleteMutation.mutate(member.id)}
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {members.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/50 rounded-lg">
                            No team members found. Click &quot;Add Team Member&quot; to create one.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
