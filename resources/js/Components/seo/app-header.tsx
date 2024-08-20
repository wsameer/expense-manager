import React from 'react';
import { Keyboard, LogOut, Search, Settings, User } from 'lucide-react';

import { useResponsive } from '@/hooks';
import { BrandLogo } from '@/Components/navigation/brand-logo';
import { Input } from '@/Components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { useAuth } from '@/lib/use-auth';
import { getInitials } from '@/utils';

export const AppHeader = () => {
  const { isMobile } = useResponsive();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-14 justify-between items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {isMobile ? (
        <BrandLogo />
      ) : (
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full border border-gray-300"
            asChild
          >
            <Avatar className="cursor-pointer">
              <AvatarFallback>{user ? getInitials(user.name) : '?'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem> */}
            <DropdownMenuItem>
              <Keyboard className="mr-2 h-4 w-4" />
              <span>Shortcuts</span>
              <DropdownMenuShortcut className="ml-8">⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
