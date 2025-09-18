'use client';

import { FileUp, Share2, Download, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';

type AppHeaderProps = {
  onNewUpload: () => void;
  document: any;
};

export default function AppHeader({ onNewUpload, document }: AppHeaderProps) {

  const handleDownload = () => {
    if (typeof window === 'undefined' || !document) return;

    const risks = document.clauses.filter((c: any) => c.risk && c.risk !== 'standard');
    const counterProposals = risks.filter((r: any) => r.counterProposal);

    let reportContent = `Summary of ${document.title}\n`;
    reportContent += "========================================\n\n";
    reportContent += `${document.summary}\n\n`;

    if (risks.length > 0) {
      reportContent += "Risks Identified\n";
      reportContent += "----------------\n";
      risks.forEach((risk: any) => {
        reportContent += `- ${risk.clauseTitle}: ${risk.summary_eli15}\n`;
      });
      reportContent += "\n";
    }

    if (counterProposals.length > 0) {
      reportContent += "Suggested Counter-Proposals\n";
      reportContent += "---------------------------\n";
      counterProposals.forEach((risk: any) => {
        reportContent += `For clause "${risk.clauseTitle}":\n`;
        reportContent += `${risk.counterProposal}\n\n`;
      });
    }

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${document.title.replace(/\s+/g, '_')}_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <header className="flex items-center justify-between h-16 px-4 border-b bg-card shrink-0">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onNewUpload}>
          <FileUp className="mr-2 h-4 w-4" />
          New Upload
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload} disabled={!document}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <ThemeToggle />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
