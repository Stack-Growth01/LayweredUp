'use client';
import * as React from 'react';
import type { SampleDocument, Clause as ClauseType } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Handshake, Bot, Volume2, Link } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import AskAI from './ask-ai';

const riskIcons = {
    risky: <AlertTriangle className="h-4 w-4 text-destructive" />,
    negotiable: <Handshake className="h-4 w-4 text-accent-foreground" />,
    standard: <CheckCircle2 className="h-4 w-4 text-green-500" />,
};

const riskColors = {
    risky: "bg-destructive/10 hover:bg-destructive/20 text-foreground",
    negotiable: "bg-accent/20 hover:bg-accent/30 text-foreground",
    standard: "",
};


const Clause = ({ clause, summaryType }: { clause: ClauseType, summaryType: 'eli5' | 'eli15' }) => {
    const summary = summaryType === 'eli5' ? clause.summary_eli5 : clause.summary_eli15;
    
    if (!clause.risk) {
        return <span>{clause.text} </span>;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <span className={cn(
                    "cursor-pointer rounded p-0.5 transition-colors",
                    riskColors[clause.risk],
                )}>
                    {clause.text}
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-96 shadow-xl" align="start">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        {riskIcons[clause.risk]}
                        <h4 className="font-semibold text-lg capitalize">{clause.risk} Clause</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{summary}</p>
                    
                    {clause.counterProposal && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Bot className="h-5 w-5 text-primary"/>
                                <h5 className="font-semibold text-primary">Suggested Counter-Proposal</h5>
                            </div>
                            <p className="text-sm bg-primary/10 p-3 rounded-md border border-primary/20">{clause.counterProposal}</p>
                        </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                        <Button variant="ghost" size="sm">
                            <Volume2 className="h-4 w-4 mr-2" />
                            Read aloud
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default function MainPanel({ document }: { document: SampleDocument }) {
    const [summaryType, setSummaryType] = React.useState<'eli5' | 'eli15'>('eli5');

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 py-3 border-b bg-card">
                 <Tabs defaultValue="summary" className="w-full">
                    <TabsList>
                        <TabsTrigger value="summary">Document View</TabsTrigger>
                        <TabsTrigger value="ask_ai">Ask AI</TabsTrigger>
                        <TabsTrigger value="navigator">Clause Navigator</TabsTrigger>
                        <TabsTrigger value="precedent">Precedent Cases</TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="mt-0">
                        {/* This content is below the tabs but shown for the Document View tab */}
                    </TabsContent>
                    <TabsContent value="ask_ai" className="mt-4">
                        <AskAI document={document} />
                     </TabsContent>
                     <TabsContent value="navigator" className="mt-4">
                        <p className="text-sm text-muted-foreground">Jump to specific clauses in the document.</p>
                     </TabsContent>
                      <TabsContent value="precedent" className="mt-4">
                        <p className="text-sm text-muted-foreground">Related legal precedents and case law.</p>
                     </TabsContent>
                </Tabs>
            </div>
            <div className="flex items-center justify-between px-6 py-2 border-b">
                 <h2 className="text-lg font-semibold truncate">{document.title}</h2>
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Explain like I'm:</span>
                    <Tabs value={summaryType} onValueChange={(value) => setSummaryType(value as 'eli5' | 'eli15')} className="w-[150px]">
                        <TabsList className="grid w-full grid-cols-2 h-8">
                            <TabsTrigger value="eli5" className="text-xs h-6">5</TabsTrigger>
                            <TabsTrigger value="eli15" className="text-xs h-6">15</TabsTrigger>
                        </TabsList>
                    </Tabs>
                 </div>
            </div>
            <ScrollArea className="flex-1 p-6 lg:p-10 bg-background">
                <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                    {document.clauses.map((clause) => (
                       <Clause key={clause.id} clause={clause} summaryType={summaryType}/>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
