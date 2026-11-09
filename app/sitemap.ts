import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/sleep-cycle-calculator", priority: 0.8 },
  { path: "/bedtime-calculator", priority: 0.8 },
  { path: "/sleep-time-calculator", priority: 0.8 },
  { path: "/sleep-schedule", priority: 0.8 },
  { path: "/rem-sleep-calculator", priority: 0.8 },
  { path: "/about", priority: 0.4 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return routes.map((route) => ({
    url: `${origin}${route.path}`,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
