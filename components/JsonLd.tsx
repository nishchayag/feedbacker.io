"use client";

import { useEffect } from "react";

interface JsonLdProps {
  data: object;
  id?: string;
}

export default function JsonLd({ data, id = "json-ld" }: JsonLdProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    script.id = id;

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data, id]);

  return null;
}
