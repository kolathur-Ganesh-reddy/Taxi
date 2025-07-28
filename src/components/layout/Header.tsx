import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem onClick={() => setOpenProfile(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Profile Dialog with updated color theme */}
      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white">
          <DialogHeader className="bg-blue-600 text-white p-6">
            <DialogTitle className="text-lg font-bold">User Profile</DialogTitle>
            <DialogDescription className="text-sm text-blue-100">
              Your account details
            </DialogDescription>
          </DialogHeader>

          <motion.div
            className="p-6 space-y-4 bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-blue-600 shadow-sm">
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-gray-800">{user?.name || 'N/A'}</p>
                <p className="text-sm text-gray-500">{user?.email || 'N/A'}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Role:</span> {user?.role || 'Admin'}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Joined:</span> Jan 2024 {/* Replace with dynamic if available */}
              </p>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};
