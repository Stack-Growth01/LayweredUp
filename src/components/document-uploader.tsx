'use client';

import { FileText, Link2, Loader2, UploadCloud, Bot, Upload, Eye, Pencil, Navigation, BookOpen, Volume2, AlertTriangle, CheckCircle2, Download, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import Image from 'next/image';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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

      <section className="py-16 bg-background w-full">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-card rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="text-primary w-8 h-8"/>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
                    <p className="text-muted-foreground">Drag and drop your legal document or connect directly to cloud services.</p>
                </div>
                <div className="bg-card rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="text-green-600 dark:text-green-400 w-8 h-8"/>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                    <p className="text-muted-foreground">Our AI identifies risks, key clauses, and provides plain-language explanations.</p>
                </div>
                <div className="bg-card rounded-xl p-6 text-center">
                     <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Pencil className="text-purple-600 dark:text-purple-400 w-8 h-8"/>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Get Suggestions</h3>
                    <p className="text-muted-foreground">Receive suggested edits and counter-proposals ready to implement.</p>
                </div>
            </div>
        </div>
    </section>

    <section className="py-16 bg-background w-full">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Your Legal Dashboard</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-2">See how LawyeredUp transforms complex contracts into actionable insights.</p>
            </div>
            
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border">
                <div className="border-b px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        <button className="px-3 py-2 text-sm font-semibold text-primary border-b-2 border-primary">Document Analysis</button>
                        <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Risk Overview</button>
                        <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Exports</button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Export Report
                        </Button>
                    </div>
                </div>

                <div className="flex">
                    {/* Left Sidebar */}
                    <div className="w-64 border-r border-border bg-muted/40 p-4">
                        <div className="mb-6">
                            <h3 className="font-semibold text-foreground mb-3 px-2">Documents</h3>
                            <ul className="space-y-1">
                                <li className="flex items-center space-x-2 p-2 bg-background rounded-lg">
                                    <FileText className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-primary">Rental Agreement</span>
                                </li>
                                <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-background/50">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">Employment Contract</span>
                                </li>
                                <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-background/50">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">Service Agreement</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="mb-6">
                            <h3 className="font-semibold text-foreground mb-3 px-2">Filters</h3>
                            <div className="space-y-3 p-2">
                                <div className="flex items-center">
                                    <Checkbox id="high-risk-preview" />
                                    <Label htmlFor="high-risk-preview" className="ml-2 text-sm">High Risk Clauses</Label>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox id="negotiable-preview" defaultChecked />
                                    <Label htmlFor="negotiable-preview" className="ml-2 text-sm">Negotiable Terms</Label>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox id="standard-clauses-preview" />
                                    <Label htmlFor="standard-clauses-preview" className="ml-2 text-sm">Standard Clauses</Label>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-foreground mb-3 px-2">Role Lens</h3>
                            <Select defaultValue="tenant">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a role..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tenant">Tenant</SelectItem>
                                    <SelectItem value="landlord">Landlord</SelectItem>
                                    <SelectItem value="freelancer">Freelancer</SelectItem>
                                    <SelectItem value="smb">SMB Owner</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-foreground">Rental Agreement</h2>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm">ELI5</Button>
                                <Button variant="secondary" size="sm">ELI15</Button>
                            </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 mb-6 prose prose-sm max-w-none">
                            <p>
                                This Rental Agreement ("Agreement") is made between [Landlord Name] ("Landlord") and [Tenant Name] ("Tenant"). 
                                The Landlord agrees to lease to the Tenant the premises located at [Property Address] ("Premises") for residential purposes.
                            </p>
                            
                            <p>
                                The term of this Agreement shall commence on [Start Date] and continue on a month-to-month basis until terminated by either party upon thirty (30) days written notice.
                            </p>
                            
                            <p>
                                <span className="bg-destructive/20 p-1 rounded">The Landlord reserves the right to increase the rent at any time without prior notice.</span> 
                                The current monthly rent is $[Amount], payable in advance on the first day of each month.
                            </p>
                            
                            <p>
                                <span className="bg-destructive/20 p-1 rounded">The Tenant shall be responsible for all damages to the Premises beyond normal wear and tear.</span> 
                                The security deposit of $[Amount] will be applied to any unpaid rent or damages upon termination.
                            </p>
                            
                            <p>
                                <span className="bg-green-500/20 p-1 rounded">This Agreement shall be governed by the laws of [State].</span> 
                                Any disputes arising under this Agreement shall be resolved in the courts of [County], [State].
                            </p>
                        </div>
                        
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="sm">
                                <Navigation className="w-4 h-4 mr-2" />
                                <span>Clause Navigator</span>
                            </Button>
                             <Button variant="ghost" size="sm">
                                <BookOpen className="w-4 h-4 mr-2" />
                                <span>Precedent Cases</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Volume2 className="w-4 h-4 mr-2" />
                                <span>Read Aloud</span>
                            </Button>
                        </div>
                    </div>
                    
                    {/* Right Panel */}
                    <div className="w-80 border-l border-border p-6 bg-muted/40">
                        <div className="mb-6">
                            <h3 className="font-semibold text-foreground mb-3">TL;DR Summary</h3>
                            <div className="bg-background rounded-lg p-3 border shadow-sm">
                                <p className="text-sm text-muted-foreground">
                                    This is a month-to-month rental agreement with automatic rent increases allowed. 
                                    Tenant is responsible for all damages beyond normal wear and tear.
                                </p>
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <h3 className="font-semibold text-foreground mb-3">Risks Identified</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <AlertTriangle className="w-5 h-5 text-destructive mt-1 mr-3 shrink-0" />
                                    <div>
                                        <p className="font-medium text-sm">Unilateral Rent Increase</p>
                                        <p className="text-xs text-muted-foreground">Landlord can increase rent anytime without notice</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <AlertTriangle className="w-5 h-5 text-destructive mt-1 mr-3 shrink-0" />
                                    <div>
                                        <p className="font-medium text-sm">Unlimited Damage Liability</p>
                                        <p className="text-xs text-muted-foreground">Tenant responsible for all damages beyond normal wear</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3 shrink-0" />
                                    <div>
                                        <p className="font-medium text-sm">Governing Law Clause</p>
                                        <p className="text-xs text-muted-foreground">Standard clause specifying jurisdiction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-foreground mb-3">Suggested Edits</h3>
                            <div className="bg-background rounded-lg p-4 border shadow-sm">
                                <p className="text-sm text-foreground mb-3">
                                    <span className="font-semibold">Rent Increases:</span> Add "Rent increases limited to 5% annually with 30 days written notice"
                                </p>
                                <p className="text-sm text-foreground">
                                    <span className="font-semibold">Damage Clause:</span> Add "Normal wear and tear excepted" to damage responsibility clause
                                </p>
                                <Button className="mt-4 w-full" size="sm">Copy All Suggestions</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-primary-foreground">
      <div className="container mx-auto px-4 text-center rounded-2xl py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Simplify Your Legal Documents?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who save hours understanding
          contracts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Get Started Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>

    <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-primary rounded-full"></div>
                        <span className="text-xl font-bold text-white">LawyeredUp</span>
                    </div>
                    <p className="text-sm">Demystifying legal documents with AI-powered analysis.</p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Product</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Features</a></li>
                        <li><a href="#" className="hover:text-white">Pricing</a></li>
                        <li><a href="#" className="hover:text-white">Use Cases</a></li>
                        <li><a href="#" className="hover:text-white">Integrations</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Documentation</a></li>
                        <li><a href="#" className="hover:text-white">Guides</a></li>
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                        <li><a href="#" className="hover:text-white">Support</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">About</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                        <li><a href="#" className="hover:text-white">Legal</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                <p>&copy; 2024 LawyeredUp. All rights reserved.</p>
            </div>
        </div>
    </footer>

    </div>
  );
}
