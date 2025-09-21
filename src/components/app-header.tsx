
'use client';

import { FileUp, Share2, Download, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';
import type { SampleDocument } from '@/lib/data';
import { useCallback } from 'react';

type AppHeaderProps = {
  onNewUpload: () => void;
  document: SampleDocument;
};

export default function AppHeader({ onNewUpload, document }: AppHeaderProps) {

  const handleDownload = useCallback(() => {
    if (typeof window === 'undefined' || !document) {
        return;
    }
    
    const risks = document.clauses.filter(
        (c) => c.risk && c.risk !== 'standard'
    );
    const counterProposals = document.clauses.filter(
        (c) => c.counterProposal
    );

    let reportContent = `# Summary of ${document.title}\n\n`;
    reportContent += `**Overall Summary:**\n${document.summary}\n\n`;
    reportContent += '---\n\n';

    if (risks.length > 0) {
        reportContent += '## Risks Identified\n\n';
        risks.forEach((risk) => {
            reportContent += `### ${risk.clauseTitle} (Risk: ${risk.risk})\n`;
            reportContent += `**Issue:** ${risk.summary_eli15}\n\n`;
        });
        reportContent += '---\n\n';
    }

    if (counterProposals.length > 0) {
        reportContent += '## Appendix: Suggested Counter-Proposals\n\n';
        counterProposals.forEach((clause) => {
            if (clause.counterProposal && clause.clauseTitle) {
                reportContent += `### For clause "${clause.clauseTitle}":\n\n`;
                reportContent += '```\n';
                reportContent += `${clause.counterProposal}\n`;
                reportContent += '```\n\n';
            }
        });
    }

    const blob = new Blob([reportContent], {
        type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.title.replace(/\s+/g, '_')}_Report.md`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [document]);


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
