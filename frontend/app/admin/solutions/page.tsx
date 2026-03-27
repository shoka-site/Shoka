"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Solution } from "@/hooks/use-content";

export default function AdminSolutions() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        titleEn: "",
        titleAr: "",
        descriptionEn: "",
        descriptionAr: "",
        order: 1,
        published: true,
        industryId: "",
    });

    const { data: solutions = [], isLoading } = useQuery<Solution[]>({
        queryKey: ["admin-solutions"],
        queryFn: async () => {
            const res = await fetch("/api/content/en/solutions");
            return res.json();
        },
    });

    const { data: industries = [] } = useQuery({
        queryKey: ["admin-industries"],
        queryFn: async () => {
            const res = await fetch("/api/content/en/industries");
            return res.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: Record<string, unknown>) => {
            const res = await fetch("/api/admin/solutions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-solutions"] });
            queryClient.invalidateQueries({ queryKey: ["solutions"] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
            const res = await fetch(`/api/admin/solutions/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-solutions"] });
            queryClient.invalidateQueries({ queryKey: ["solutions"] });
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/solutions/${id}`, { method: "DELETE" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-solutions"] });
            queryClient.invalidateQueries({ queryKey: ["solutions"] });
        },
    });

    const resetForm = () => {
        setFormData({
            titleEn: "",
            titleAr: "",
            descriptionEn: "",
            descriptionAr: "",
            order: 1,
            published: true,
            industryId: "",
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

    const handleEdit = (solution: Solution) => {
        const raw = solution as unknown as Record<string, unknown>;
        setFormData({
            titleEn: (raw.titleEn ?? solution.title ?? "") as string,
            titleAr: (raw.titleAr ?? solution.title ?? "") as string,
            descriptionEn: (raw.descriptionEn ?? solution.description ?? "") as string,
            descriptionAr: (raw.descriptionAr ?? solution.description ?? "") as string,
            order: solution.order,
            published: solution.published,
            industryId: (solution.industryId ?? "") as string,
        });
        setEditingId(solution.id);
        setIsEditing(true);
    };

    if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Solutions</h1>
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Add New"}
                    </Button>
                </div>

                {isEditing && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-lg space-y-4">
                        <div className="grid grid-cols-2 gap-4">
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

                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.industryId}
                                onChange={(e) => setFormData({ ...formData, industryId: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select an Industry</option>
                                {(industries as Record<string, unknown>[]).map((industry) => (
                                    <option key={industry.id as string} value={industry.id as string}>
                                        {(industry.titleEn as string) || (industry.title as string)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                            {editingId ? "Update" : "Create"} Solution
                        </Button>
                    </form>
                )}

                <div className="space-y-4">
                    {solutions.map((solution: Solution) => {
                        const raw = solution as unknown as Record<string, unknown>;
                        return (
                        <div key={solution.id} className="p-6 bg-muted rounded-lg flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-muted-foreground">Order: {solution.order}</span>
                                    {solution.published && (
                                        <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Published</span>
                                    )}
                                    {solution.industryId && (
                                        <span className="text-xs bg-purple-500/20 text-purple-600 px-2 py-1 rounded">
                                            Industry: {(industries as Record<string, unknown>[]).find((i) => i.id === solution.industryId)?.titleEn as string || "Unknown"}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{solution.title || (raw.titleEn as string)}</h3>
                                <p className="text-sm">{solution.description || (raw.descriptionEn as string)}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(solution)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteMutation.mutate(solution.id)}
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        );
                    })}
                    {solutions.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground bg-muted/50 rounded-lg">
                            No solutions found. Click &quot;Add New&quot; to create one.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
