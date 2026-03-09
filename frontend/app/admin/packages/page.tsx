"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Package, ChevronDown, ChevronUp } from "lucide-react";
import type { Package as PackageType } from "@/hooks/use-content";

const EMPTY_FORM = {
    order: 1,
    titleEn: "",
    titleAr: "",
    problemEn: "",
    problemAr: "",
    solutionsEn: "",
    solutionsAr: "",
    techStackEn: "",
    techStackAr: "",
    servicesUsedEn: "",
    servicesUsedAr: "",
    valueEn: "",
    valueAr: "",
    published: true,
};

export default function AdminPackages() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [formData, setFormData] = useState(EMPTY_FORM);

    const { data: packages = [], isLoading } = useQuery<any[]>({
        queryKey: ["admin-packages"],
        queryFn: async () => {
            const res = await fetch("/api/content/packages?lang=en&published=false");
            return res.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
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
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
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

    const handleEdit = (pkg: any) => {
        setFormData({
            order: pkg.order,
            titleEn: pkg.titleEn || pkg.title || "",
            titleAr: pkg.titleAr || "",
            problemEn: pkg.problemEn || pkg.problem || "",
            problemAr: pkg.problemAr || "",
            solutionsEn: pkg.solutionsEn || pkg.solutions || "",
            solutionsAr: pkg.solutionsAr || "",
            techStackEn: pkg.techStackEn || pkg.techStack || "",
            techStackAr: pkg.techStackAr || "",
            servicesUsedEn: pkg.servicesUsedEn || pkg.servicesUsed || "",
            servicesUsedAr: pkg.servicesUsedAr || "",
            valueEn: pkg.valueEn || pkg.value || "",
            valueAr: pkg.valueAr || "",
            published: pkg.published,
        });
        setEditingId(pkg.id);
        setIsEditing(true);
    };

    const Field = ({ label, enKey, arKey }: { label: string; enKey: keyof typeof EMPTY_FORM; arKey: keyof typeof EMPTY_FORM }) => (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{label}</label>
            <div className="grid grid-cols-2 gap-3">
                <Textarea
                    placeholder={`${label} (English)`}
                    value={formData[enKey] as string}
                    onChange={(e) => setFormData({ ...formData, [enKey]: e.target.value })}
                    className="min-h-[80px] text-sm"
                    required
                />
                <Textarea
                    placeholder={`${label} (العربية)`}
                    value={formData[arKey] as string}
                    onChange={(e) => setFormData({ ...formData, [arKey]: e.target.value })}
                    className="min-h-[80px] text-sm text-right"
                    dir="rtl"
                    required
                />
            </div>
        </div>
    );

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
                            <Field label="Package Name" enKey="titleEn" arKey="titleAr" />
                        </div>

                        <div className="border-t border-border pt-4 space-y-5">
                            <Field label="Problem It Solves" enKey="problemEn" arKey="problemAr" />
                            <Field label="Possible Solutions" enKey="solutionsEn" arKey="solutionsAr" />
                            <Field label="Tech Stack" enKey="techStackEn" arKey="techStackAr" />
                            <Field label="Services Used" enKey="servicesUsedEn" arKey="servicesUsedAr" />
                            <Field label="Value Provided" enKey="valueEn" arKey="valueAr" />
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
                    <div className="grid grid-cols-[3fr_2fr_2fr_auto] gap-4 px-6 py-3 bg-muted/30 border-b border-border text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <span>Package Name</span>
                        <span>Tech Stack</span>
                        <span>Services Used</span>
                        <span>Actions</span>
                    </div>

                    {/* Rows */}
                    {packages.length === 0 ? (
                        <div className="px-6 py-12 text-center text-muted-foreground">
                            <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No packages yet. Click "Add Package" to create one.</p>
                        </div>
                    ) : (
                        packages.map((pkg: any) => (
                            <div key={pkg.id} className="border-b border-border last:border-0">
                                {/* Main row */}
                                <div className="grid grid-cols-[3fr_2fr_2fr_auto] gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs text-muted-foreground">#{pkg.order}</span>
                                            {pkg.published && <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">Published</span>}
                                        </div>
                                        <p className="font-semibold text-sm">{pkg.title || pkg.titleEn}</p>
                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{pkg.problem || pkg.problemEn}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{pkg.techStack || pkg.techStackEn}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{pkg.servicesUsed || pkg.servicesUsedEn}</p>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => setExpandedId(expandedId === pkg.id ? null : pkg.id)}>
                                            {expandedId === pkg.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => { handleEdit(pkg); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(pkg.id)} disabled={deleteMutation.isPending}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Expanded row */}
                                {expandedId === pkg.id && (
                                    <div className="px-6 pb-5 bg-muted/10 border-t border-border grid grid-cols-3 gap-6 pt-4">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Solutions</p>
                                            <p className="text-sm">{pkg.solutions || pkg.solutionsEn}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Value Provided</p>
                                            <p className="text-sm">{pkg.value || pkg.valueEn}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Problem</p>
                                            <p className="text-sm">{pkg.problem || pkg.problemEn}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
