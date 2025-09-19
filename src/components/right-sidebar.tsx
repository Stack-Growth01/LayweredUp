import type { SampleDocument } from '@/lib/data';
import { AlertTriangle, CheckCircle2, Handshake, Bot, ShieldQuestion, Copy, Volume2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';

const riskIcons = {
    risky: <AlertTriangle className="h-5 w-5 text-destructive" />,
    negotiable: <Handshake className="h-5 w-5 text-accent-foreground" />,
    standard: <CheckCircle2 className="h-5 w-5 text-green-500" />,
};

const riskBadges = {
    risky: <Badge variant="destructive">Risky</Badge>,
    negotiable: <Badge className="bg-accent text-accent-foreground hover:bg-accent/80">Negotiable</Badge>,
    standard: <Badge className="bg-green-500 text-white hover:bg-green-600">Standard</Badge>,
}

export default function RightSidebar({ document }: { document: SampleDocument }) {
    const risks = document.clauses.filter(c => c.risk && c.risk !== 'standard');
    
    return (
        <aside className="w-[400px] bg-card border-l flex flex-col shrink-0">
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>TL;DR Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{document.summary}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Risks Identified</CardTitle>
                            <CardDescription>{risks.length} potential issues found.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {risks.map(risk => (
                                <Popover key={risk.id}>
                                    <PopoverTrigger asChild>
                                        <div className="flex items-start gap-3 cursor-pointer p-2 rounded-md hover:bg-muted">
                                            <div className="mt-0.5">{risk.risk ? riskIcons[risk.risk] : null}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold">{risk.clauseTitle}</p>
                                                    {risk.risk ? riskBadges[risk.risk] : null}
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{risk.summary_eli15}</p>
                                            </div>
                                        </div>
                                    </PopoverTrigger>
                                     <PopoverContent className="w-96 shadow-xl" align="start">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                {risk.risk ? riskIcons[risk.risk] : null}
                                                <h4 className="font-semibold text-lg capitalize">{risk.risk} Clause</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{risk.summary_eli15}</p>
                                            
                                            {risk.counterProposal && (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Bot className="h-5 w-5 text-primary"/>
                                                        <h5 className="font-semibold text-primary">Suggested Counter-Proposal</h5>
                                                    </div>
                                                    <p className="text-sm bg-primary/10 p-3 rounded-md border border-primary/20">{risk.counterProposal}</p>
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
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot className="h-5 w-5 text-primary" />
                                Suggested Counter-Proposals
                            </CardTitle>
                            <CardDescription>Editable text you can copy and paste.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {risks.filter(r => r.counterProposal).map(risk => (
                                <div key={`counter-${risk.id}`}>
                                    <Label className="font-semibold text-sm">{risk.clauseTitle}</Label>
                                    <div className="relative mt-1">
                                        <Textarea defaultValue={risk.counterProposal} className="resize-none h-24 pr-10" />
                                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldQuestion className="h-5 w-5 text-amber-500" />
                                Confidence Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-amber-500/10 p-3 rounded-md border border-amber-500/20">
                                <p className="text-sm text-amber-700 dark:text-amber-300">
                                    <strong>Ambiguous Clause:</strong> The "Notice Period" clause is vaguely worded. We recommend seeking clarification or proposing more specific language. AI confidence: <strong>85%</strong>.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </aside>
    );
}
