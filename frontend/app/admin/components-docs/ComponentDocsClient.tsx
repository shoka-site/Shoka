"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SafeImage } from "@/components/ui/SafeImage";
import { CountUp } from "@/components/ui/count-up";
import { Spinner } from "@/components/ui/spinner";
import { Copy, Check, Palette, Sparkles, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const COLOR_PALETTE = [
  { name: "Obsidian Black", hex: "#000000", css: "--background", usage: "Primary canvas background" },
  { name: "Ur Gold", hex: "#c2a45c", css: "--primary", usage: "Divine light accent, borders, primary actions" },
  { name: "Cuneiform White", hex: "#ffffff", css: "--foreground", usage: "Primary text, headers" },
  { name: "Deep Onyx", hex: "#1a1a1a", css: "--secondary", usage: "Secondary layout items, container backgrounds" },
  { name: "Elevated Card", hex: "#0d0d0d", css: "--card", usage: "Base card background" }
];

export function ComponentDocsClient() {
  const { toast } = useToast();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(code);
    toast({
      title: "Copied Code",
      description: "Component markup copied to clipboard.",
    });
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-display font-black text-white mb-2 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          Sehle UI Component Library
        </h1>
        <p className="text-muted-foreground text-lg">
          Visual documentation, code examples, and design tokens for Sehle’s Mesopotamian design system.
        </p>
      </div>

      {/* Design Tokens - Colors */}
      <section className="mb-16">
        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Palette className="w-6 h-6 text-primary" />
          1. Color Palette Tokens
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLOR_PALETTE.map((c, idx) => (
            <Card key={idx} className="bg-zinc-950 border-white/10 hover:border-primary/40 transition-colors">
              <CardContent className="pt-6">
                <div 
                  className="w-full h-24 rounded-xl mb-4 border border-white/10 flex items-end p-3" 
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="text-xs font-mono px-2 py-1 bg-black/60 text-white rounded">
                    {c.hex}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">{c.name}</h3>
                <p className="text-xs font-mono text-primary mt-1">{c.css}</p>
                <p className="text-xs text-muted-foreground mt-2">{c.usage}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* UI Components Sandbox */}
      <section className="mb-16">
        <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          2. Interactive Components
        </h2>

        <div className="space-y-12">
          {/* Button Component */}
          <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-zinc-950/40">
            <h3 className="text-lg font-bold text-white mb-4">Button Component</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="default">Gold Primary</Button>
              <Button variant="secondary">Secondary Onyx</Button>
              <Button variant="outline">Outline Border</Button>
              <Button variant="ghost">Ghost Plain</Button>
            </div>
            <div className="relative">
              <pre className="bg-black/60 p-4 rounded-xl text-xs font-mono text-white/80 overflow-x-auto">
                {`<Button variant="default">Gold Primary</Button>\n<Button variant="secondary">Secondary Onyx</Button>`}
              </pre>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute top-2 right-2 text-white/60 hover:text-white"
                onClick={() => copyCode('<Button variant="default">Gold Primary</Button>\n<Button variant="secondary">Secondary Onyx</Button>')}
              >
                {copiedText === '<Button variant="default">Gold Primary</Button>\n<Button variant="secondary">Secondary Onyx</Button>' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Badge Component */}
          <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-zinc-950/40">
            <h3 className="text-lg font-bold text-white mb-4">Badge Component</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge variant="default">New</Badge>
              <Badge variant="secondary">Draft</Badge>
              <Badge variant="outline" className="border-primary text-primary">Ur Gold Accent</Badge>
            </div>
            <div className="relative">
              <pre className="bg-black/60 p-4 rounded-xl text-xs font-mono text-white/80 overflow-x-auto">
                {`<Badge variant="default">New</Badge>\n<Badge variant="outline" className="border-primary text-primary">Gold</Badge>`}
              </pre>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute top-2 right-2 text-white/60 hover:text-white"
                onClick={() => copyCode('<Badge variant="default">New</Badge>\n<Badge variant="outline" className="border-primary text-primary">Gold</Badge>')}
              >
                {copiedText === '<Badge variant="default">New</Badge>\n<Badge variant="outline" className="border-primary text-primary">Gold</Badge>' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* SafeImage Component */}
          <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-zinc-950/40">
            <h3 className="text-lg font-bold text-white mb-2">SafeImage Component</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Provides robust remote image handling, resolving local vs external URLs and displaying golden loading spinners or fallbacks.
            </p>
            <div className="w-32 h-32 relative rounded-xl overflow-hidden mb-6 border border-white/10">
              <SafeImage 
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=200&auto=format&fit=crop" 
                alt="Demo image"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative">
              <pre className="bg-black/60 p-4 rounded-xl text-xs font-mono text-white/80 overflow-x-auto">
                {`<SafeImage\n  src="https://images.unsplash.com/... "\n  alt="Demo image"\n  fill\n  className="object-cover"\n/>`}
              </pre>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute top-2 right-2 text-white/60 hover:text-white"
                onClick={() => copyCode('<SafeImage\n  src="https://images.unsplash.com/... "\n  alt="Demo image"\n  fill\n  className="object-cover"\n/>')}
              >
                {copiedText === '<SafeImage\n  src="https://images.unsplash.com/... "\n  alt="Demo image"\n  fill\n  className="object-cover"\n/>' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* CountUp Component */}
          <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-zinc-950/40">
            <h3 className="text-lg font-bold text-white mb-2">CountUp (Animated Numbers)</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Pulsates and counts up to a target number when scrolled into view.
            </p>
            <div className="text-3xl font-display font-black text-primary mb-6">
              <CountUp end={99} duration={2} suffix="%" />
            </div>
            <div className="relative">
              <pre className="bg-black/60 p-4 rounded-xl text-xs font-mono text-white/80 overflow-x-auto">
                {`<CountUp end={99} duration={2} suffix="%" />`}
              </pre>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute top-2 right-2 text-white/60 hover:text-white"
                onClick={() => copyCode('<CountUp end={99} duration={2} suffix="%" />')}
              >
                {copiedText === '<CountUp end={99} duration={2} suffix="%" />' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Spinner Component */}
          <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-zinc-950/40">
            <h3 className="text-lg font-bold text-white mb-4">Spinner (Loading State)</h3>
            <div className="flex items-center gap-6 mb-6">
              <Spinner className="w-6 h-6 text-primary" />
              <Spinner className="w-8 h-8 text-white" />
            </div>
            <div className="relative">
              <pre className="bg-black/60 p-4 rounded-xl text-xs font-mono text-white/80 overflow-x-auto">
                {`<Spinner className="w-6 h-6 text-primary" />`}
              </pre>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute top-2 right-2 text-white/60 hover:text-white"
                onClick={() => copyCode('<Spinner className="w-6 h-6 text-primary" />')}
              >
                {copiedText === '<Spinner className="w-6 h-6 text-primary" />' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
