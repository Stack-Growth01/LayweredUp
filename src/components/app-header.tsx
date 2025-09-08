'use client';

import { FileUp, Share2, Download, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

type AppHeaderProps = {
  onNewUpload: () => void;
};

export default function AppHeader({ onNewUpload }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-4 border-b bg-card shrink-0">
      <div className="flex items-center gap-4">
        <Logo />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onNewUpload}>
          <FileUp className="mr-2 h-4 w-4" />
          New Upload
        </Button>
        <Button variant="outline" size="sm">
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
