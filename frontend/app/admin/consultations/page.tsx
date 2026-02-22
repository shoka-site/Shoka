"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Building2, Clock, Check, X, Trash2, MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminConsultations() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { data: consultations = [], isLoading } = useQuery<any[]>({
        queryKey: ["admin-consultations"],
        queryFn: async () => {
            const res = await fetch("/api/admin/consultations");
            return res.json();
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const res = await fetch(`/api/admin/consultations/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-consultations"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/admin/consultations/${id}`, { method: "DELETE" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-consultations"] });
        },
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">Pending</Badge>;
            case "responded":
                return <Badge variant="secondary" className="bg-green-500/10 text-green-600">Responded</Badge>;
            case "closed":
                return <Badge variant="secondary" className="bg-gray-500/10 text-gray-600">Closed</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Consultations</h1>
                        <p className="text-muted-foreground mt-1">Manage consultation requests from potential clients</p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="text-sm py-1.5">
                            {consultations.filter((c: any) => c.status === "pending").length} Pending
                        </Badge>
                        <Badge variant="outline" className="text-sm py-1.5">
                            {consultations.length} Total
                        </Badge>
                    </div>
                </div>

                <div className="space-y-4">
                    {consultations.map((consultation: any) => (
                        <Card key={consultation.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Mail className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{consultation.name}</h3>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {consultation.email}
                                                </p>
                                            </div>
                                            {consultation.company && (
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Building2 className="w-3 h-3" />
                                                    {consultation.company}
                                                </p>
                                            )}
                                        </div>

                                        <div className="ml-13 pl-13">
                                            <div className="flex items-start gap-2 mb-2">
                                                <MessageSquare className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                                                <p className="text-sm">{consultation.message}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                {formatDate(consultation.createdAt)}
                                            </div>
                                            {getStatusBadge(consultation.status)}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {consultation.status === "pending" && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="w-full"
                                                    onClick={() => updateStatusMutation.mutate({ id: consultation.id, status: "responded" })}
                                                    disabled={updateStatusMutation.isPending}
                                                >
                                                    <Check className="w-3 h-3 mr-1" />
                                                    Mark Responded
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="w-full"
                                                    onClick={() => updateStatusMutation.mutate({ id: consultation.id, status: "closed" })}
                                                    disabled={updateStatusMutation.isPending}
                                                >
                                                    <X className="w-3 h-3 mr-1" />
                                                    Close
                                                </Button>
                                            </>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="w-full"
                                            onClick={() => deleteMutation.mutate(consultation.id)}
                                            disabled={deleteMutation.isPending}
                                        >
                                            <Trash2 className="w-3 h-3 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {consultations.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground bg-muted/50 rounded-lg">
                            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No consultation requests yet</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
