import { createFileRoute } from "@tanstack/react-router";
import { Playground } from "@/components/playground/Playground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Button Playground — Design, inspect, export buttons" },
      {
        name: "description",
        content:
          "An instrument-panel inspired tool for crafting production-ready button styles with live preview, advanced effects, and CSS export.",
      },
      { property: "og:title", content: "Button Playground" },
      {
        property: "og:description",
        content: "Design and export production-ready button styles with live preview.",
      },
    ],
  }),
  component: Playground,
});
