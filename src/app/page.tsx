"use client";

import { useState } from "react";
import type { SampleDocument } from "@/lib/data";
import { sampleDocumentData } from "@/lib/data";
import DocumentUploader from "@/components/document-uploader";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUploadSample = () => {
    setIsLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
       router.push('/analysis');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
       <DocumentUploader onUploadSample={handleUploadSample} isLoading={isLoading} />
    </main>
  );
}
