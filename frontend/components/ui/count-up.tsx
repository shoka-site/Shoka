"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface CountUpProps {
    end: number;
    duration?: number;
    decimals?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    delay?: number;
}

export function CountUp({
    end,
    duration = 2,
    decimals = 0,
    className = "",
    prefix = "",
    suffix = "",
    delay = 0,
}: CountUpProps) {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            let startTime: number;
            let animationFrame: number;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp + delay * 1000;

                // Handle delay
                if (timestamp < startTime) {
                    animationFrame = requestAnimationFrame(animate);
                    return;
                }

                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

                // Easing function: easeOutQuart
                const easeProgress = 1 - Math.pow(1 - progress, 4);

                setCount(end * easeProgress);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setCount(end); // Ensure we hit the exact target
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => {
                if (animationFrame) cancelAnimationFrame(animationFrame);
            };
        }
    }, [end, duration, inView, delay]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
}
