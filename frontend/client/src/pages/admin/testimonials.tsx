import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Testimonial } from "@/hooks/use-content";

export default function AdminTestimonials() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        quoteEn: "",
        quoteAr: "",
        author: "",
        role: "",
        rating: 5,
        order: 1,
        published: true,
    });

    const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
        queryKey: ["admin-testimonials"],
        queryFn: async () => {
            const res = await fetch("/api/content/testimonials?lang=en");
            return res.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/admin/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const res = await fetch(`/api/admin/testimonials/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        },
    });

    const resetForm = () => {
        setFormData({
            quoteEn: "",
            quoteAr: "",
            author: "",
            role: "",
            rating: 5,
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

    const handleEdit = (testimonial: any) => {
        setFormData({
            quoteEn: testimonial.quoteEn || testimonial.quote,
            quoteAr: testimonial.quoteAr || testimonial.quote,
            author: testimonial.author,
            role: testimonial.role,
            rating: testimonial.rating,
            order: testimonial.order,
            published: testimonial.published,
        });
        setEditingId(testimonial.id);
        setIsEditing(true);
    };

    if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Testimonials</h1>
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        <Plus className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Add New"}
                    </Button>
                </div>

                {isEditing && (
                    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-lg space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <Input
                                placeholder="Author Name"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                required
                            />
                            <Input
                                placeholder="Role/Position"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                            />
                            <Input
                                type="number"
                                min="1"
                                max="5"
                                placeholder="Rating (1-5)"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Textarea
                                placeholder="Quote (English)"
                                value={formData.quoteEn}
                                onChange={(e) => setFormData({ ...formData, quoteEn: e.target.value })}
                                required
                                rows={4}
                            />
                            <Textarea
                                placeholder="Quote (Arabic)"
                                value={formData.quoteAr}
                                onChange={(e) => setFormData({ ...formData, quoteAr: e.target.value })}
                                required
                                rows={4}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="number"
                                placeholder="Order"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                required
                            />
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
                            {editingId ? "Update" : "Create"} Testimonial
                        </Button>
                    </form>
                )}

                <div className="space-y-4">
                    {testimonials.map((testimonial: any) => (
                        <div key={testimonial.id} className="p-6 bg-muted rounded-lg flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-muted-foreground">Order: {testimonial.order}</span>
                                    {testimonial.published && (
                                        <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Published</span>
                                    )}
                                    <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded">
                                        ⭐ {testimonial.rating}/5
                                    </span>
                                </div>
                                <p className="text-sm italic mb-3">"{testimonial.quote || testimonial.quoteEn}"</p>
                                <div>
                                    <p className="font-bold">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteMutation.mutate(testimonial.id)}
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
