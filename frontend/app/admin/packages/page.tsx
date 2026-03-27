"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import type { Package as PackageType } from "@/hooks/use-content";

const EMPTY_FORM = {
    order: 1,
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    published: true,
};

export default function AdminPackages() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState(EMPTY_FORM);

    const { data: packages = [], isLoading } = useQuery<PackageType[]>({
        queryKey: ["admin-packages"],
        queryFn: async () => {
            const res = await fetch("/api/admin/packages");
            const json = await res.json();
            return json.data ?? json;
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: Record<string, unknown>) => {
            const res = await fetch("/api/admin/packages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-packages"] }); resetForm(); },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
            const res = await fetch(`/api/admin/packages/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-packages"] }); resetForm(); },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-packages"] }),
    });

    const resetForm = () => { setFormData(EMPTY_FORM); setIsEditing(false); setEditingId(null); };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateMutation.mutate({ id: editingId, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleEdit = (pkg: PackageType) => {
        const raw = pkg as unknown as Record<string, unknown>;
        setFormData({
            order: pkg.order,
            titleEn: (raw.titleEn ?? pkg.title ?? "") as string,
            titleAr: (raw.titleAr ?? "") as string,
            descriptionEn: (raw.descriptionEn ?? pkg.description ?? "") as string,
            descriptionAr: (raw.descriptionAr ?? "") as string,
            published: pkg.published,
        });
        setEditingId(pkg.id);
        setIsEditing(true);
    };

    if (isLoading) return <AdminLayout><div className="p-8 text-muted-foreground">Loading packages...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Package className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Packages</h1>
                            <p className="text-sm text-muted-foreground">{packages.length} packaged service bundles</p>
                        </div>
                    </div>
                    <Button onClick={() => { setIsEditing(!isEditing); if (isEditing) resetForm(); }}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Add Package"}
                    </Button>
                </div>

                {/* Form */}
                {isEditing && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted/50 border border-border rounded-2xl space-y-6">
                        <h2 className="text-lg font-bold">{editingId ? "Edit Package" : "New Package"}</h2>

                        {/* Header row: Order + Title */}
                        <div className="grid grid-cols-[120px_1fr] gap-4 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Order</label>
                                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Package Name</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <Textarea
                                        placeholder="Package Name (English)"
                                        value={formData.titleEn as string}
                                        onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                        className="min-h-[80px] text-sm"
                                        required
                                    />
                                    <Textarea
                                        placeholder="Package Name (العربية)"
                                        value={formData.titleAr as string}
                                        onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                        className="min-h-[80px] text-sm text-right"
                                        dir="rtl"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
                            <div className="grid grid-cols-2 gap-3">
                                <Textarea
                                    placeholder="Description (English)"
                                    value={formData.descriptionEn as string}
                                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                    className="min-h-[100px] text-sm"
                                />
                                <Textarea
                                    placeholder="الوصف (العربية)"
                                    value={formData.descriptionAr as string}
                                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                    className="min-h-[100px] text-sm text-right"
                                    dir="rtl"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm font-medium">Published</span>
                            </label>
                            <div className="flex gap-3">
                                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                    {editingId ? "Update Package" : "Create Package"}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Data Table */}
                <div className="border border-border rounded-2xl overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_auto] gap-4 px-6 py-3 bg-muted/30 border-b border-border text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <span>Package Name</span>
                        <span>Actions</span>
                    </div>

                    {/* Rows */}
                    {packages.length === 0 ? (
                        <div className="px-6 py-12 text-center text-muted-foreground">
                            <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No packages yet. Click &quot;Add Package&quot; to create one.</p>
                        </div>
                    ) : (
                        packages.map((pkg) => {
                            const raw = pkg as unknown as Record<string, unknown>;
                            return (
                            <div key={pkg.id} className="border-b border-border last:border-0">
                                {/* Main row */}
                                <div className="grid grid-cols-[1fr_auto] gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs text-muted-foreground">#{pkg.order}</span>
                                            {pkg.published && <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">Published</span>}
                                        </div>
                                        <p className="font-semibold text-sm">{pkg.title || (raw.titleEn as string)}</p>
                                        {Boolean(raw.descriptionEn || raw.descriptionAr) && (
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                                {(raw.descriptionEn as string) || (raw.descriptionAr as string)}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={() => { handleEdit(pkg); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(pkg.id)} disabled={deleteMutation.isPending}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                        })
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
