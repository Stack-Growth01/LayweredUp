"use client";

import { useState } from "react";
import type { SampleDocument } from "@/lib/data";
import { sampleDocumentData } from "@/lib/data";
import AnalysisLayout from "@/components/analysis-layout";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const [document, setDocument] = useState<SampleDocument | null>(sampleDocumentData);
  const router = useRouter();

  const handleNewUpload = () => {
    setDocument(null);
    router.push('/');
  };

  if (!document) {
    // This can be a loading state or a redirect
    return <p>Loading document...</p>;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
        <AnalysisLayout document={document} onNewUpload={handleNewUpload} />
    </main>
  );
}
