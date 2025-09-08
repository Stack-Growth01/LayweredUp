'use client';

import { FileText, Link2, Loader2, UploadCloud, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

type DocumentUploaderProps = {
  onUploadSample: () => void;
  isLoading: boolean;
};

export default function DocumentUploader({ onUploadSample, isLoading }: DocumentUploaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="flex flex-col items-center text-center mb-8">
        <Logo className="mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
          Demystify Your Legal Documents.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Upload, paste, or connect your contracts. Our AI provides simple summaries, identifies risks, and suggests better terms.
        </p>
      </div>

      <Card className="w-full max-w-3xl shadow-lg">
        <CardContent className="p-6">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="upload">
                <UploadCloud className="mr-2 h-4 w-4" /> Upload
              </TabsTrigger>
              <TabsTrigger value="paste">
                <FileText className="mr-2 h-4 w-4" /> Paste Text
              </TabsTrigger>
              <TabsTrigger value="connect">
                <Link2 className="mr-2 h-4 w-4" /> Connect
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <div className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors">
                <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="font-semibold text-foreground">
                  Drag & drop files here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, DOCX (up to 25MB)
                </p>
              </div>
            </TabsContent>
            <TabsContent value="paste">
              <Textarea
                placeholder="Paste your legal document text here..."
                className="h-48 resize-none"
              />
            </TabsContent>
            <TabsContent value="connect">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col"><img data-ai-hint="Google Drive icon" src="https://picsum.photos/24/24" alt="Google Drive" className="w-6 h-6 mb-2" />Google Drive</Button>
                <Button variant="outline" className="h-20 flex-col"><img data-ai-hint="Gmail icon" src="https://picsum.photos/24/24" alt="Gmail" className="w-6 h-6 mb-2" />Gmail</Button>
                <Button variant="outline" className="h-20 flex-col"><img data-ai-hint="Slack icon" src="https://picsum.photos/24/24" alt="Slack" className="w-6 h-6 mb-2" />Slack</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-3xl">
         <Button
            onClick={onUploadSample}
            disabled={isLoading}
            className="w-full sm:w-auto flex-grow"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
               <Bot className="mr-2 h-4 w-4" />
            )}
            Try with a Sample Contract
          </Button>

        <div className="flex items-center space-x-2 p-3 bg-card rounded-md border">
            <Switch id="ephemeral-mode" />
            <Label htmlFor="ephemeral-mode" className="font-medium">Ephemeral Mode</Label>
        </div>
      </div>
       <p className="text-xs text-muted-foreground mt-4 max-w-md text-center">
            When Ephemeral Mode is on, your documents are processed in memory and never stored on our servers.
        </p>
    </div>
  );
}
