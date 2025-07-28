import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserPlus,
  Ban,
  CheckCircle,
  Eye
} from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// User data type
type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'blocked';
  totalRides: number;
  totalSpent: string;
  joinDate: string;
};

// Initial users data
const initialUsers: User[] = [
  { id: 'U001', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', status: 'active', totalRides: 45, totalSpent: '$1,250.75', joinDate: '2024-01-15' },
  { id: 'U002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', status: 'active', totalRides: 32, totalSpent: '$890.25', joinDate: '2024-02-20' },
  { id: 'U003', name: 'Bob Brown', email: 'bob@example.com', phone: '+1234567892', status: 'blocked', totalRides: 12, totalSpent: '$320.50', joinDate: '2024-03-10' },
  { id: 'U004', name: 'Alice Johnson', email: 'alice@example.com', phone: '+1234567893', status: 'active', totalRides: 78, totalSpent: '$2,100.00', joinDate: '2023-12-05' },
  { id: 'U005', name: 'Charlie Wilson', email: 'charlie@example.com', phone: '+1234567894', status: 'inactive', totalRides: 3, totalSpent: '$85.25', joinDate: '2024-04-01' },
];

// Form validation schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Phone must be at least 6 characters'),
  status: z.enum(['active', 'inactive']).default('active'),
});

type UserFormValues = z.infer<typeof userSchema>;

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      status: 'active',
    },
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Blocked</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const onSubmit = (data: UserFormValues) => {
    const newUser: User = {
      id: `U${(users.length + 1).toString().padStart(3, '0')}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: data.status,
      totalRides: 0,
      totalSpent: '$0.00',
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    setUsers([...users, newUser]);
    form.reset();
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  return (
    <div className="space-y-8">
      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Total Rides:</strong> {selectedUser.totalRides}</p>
              <p><strong>Total Spent:</strong> {selectedUser.totalSpent}</p>
              <p><strong>Join Date:</strong> {selectedUser.joinDate}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage user accounts and activity</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button><UserPlus className="mr-2 h-4 w-4" /> Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New User</DialogTitle></DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" {...form.register('name')} />
                {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="john@example.com" {...form.register('email')} />
                {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1234567890" {...form.register('phone')} />
                {form.formState.errors.phone && <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select id="status" {...form.register('status')} className="w-full border rounded px-3 py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button type="submit" className="w-full">Add User</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Status: {statusFilter}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {['all', 'active', 'inactive', 'blocked'].map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setStatusFilter(status as any)}>{status[0].toUpperCase() + status.slice(1)}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rides</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell><div className="font-medium">{user.name}</div><div className="text-sm text-gray-500">{user.id}</div></TableCell>
                  <TableCell><div className="text-sm">{user.email}</div><div className="text-sm text-gray-500">{user.phone}</div></TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.totalRides}</TableCell>
                  <TableCell>{user.totalSpent}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setSelectedUser(user); setViewDialogOpen(true); }}>
                          <Eye className="mr-2 h-4 w-4 text-blue-500" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={user.status === 'active'} onClick={() => handleStatusChange(user.id, 'active')}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Activate
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={user.status === 'blocked'} onClick={() => handleStatusChange(user.id, 'blocked')}>
                          <Ban className="mr-2 h-4 w-4 text-red-500" />
                          Block User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
