import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  CheckCircle,
  XCircle,
  Eye,
  Car
} from 'lucide-react';

type Driver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  vehicle: string;
  rating: number;
  totalRides: number;
  earnings: string;
  joinDate: string;
};

const initialDrivers: Driver[] = [
  {
    id: 'D001',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567890',
    status: 'active',
    vehicle: 'Toyota Camry - ABC123',
    rating: 4.8,
    totalRides: 245,
    earnings: '$5,250.75',
    joinDate: '2024-01-10'
  },
  {
    id: 'D002',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+1234567891',
    status: 'pending',
    vehicle: 'Honda Civic - XYZ789',
    rating: 0,
    totalRides: 0,
    earnings: '$0.00',
    joinDate: '2024-04-15'
  },
  {
    id: 'D003',
    name: 'David Lee',
    email: 'david@example.com',
    phone: '+1234567892',
    status: 'active',
    vehicle: 'Nissan Altima - DEF456',
    rating: 4.6,
    totalRides: 189,
    earnings: '$3,890.25',
    joinDate: '2024-02-20'
  },
  {
    id: 'D004',
    name: 'Emma Davis',
    email: 'emma@example.com',
    phone: '+1234567893',
    status: 'offline',
    vehicle: 'Hyundai Elantra - GHI789',
    rating: 4.9,
    totalRides: 312,
    earnings: '$7,100.00',
    joinDate: '2023-11-05'
  },
  {
    id: 'D005',
    name: 'James Brown',
    email: 'james@example.com',
    phone: '+1234567894',
    status: 'rejected',
    vehicle: 'Ford Focus - JKL012',
    rating: 0,
    totalRides: 0,
    earnings: '$0.00',
    joinDate: '2024-04-20'
  }
];

export const Drivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const [newDriver, setNewDriver] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    status: 'pending'
  });

  const handleAddDriver = () => {
    const newId = `D${(drivers.length + 1).toString().padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const driverToAdd: Driver = {
      id: newId,
      name: newDriver.name,
      email: newDriver.email,
      phone: newDriver.phone,
      status: newDriver.status,
      vehicle: newDriver.vehicle,
      rating: 0,
      totalRides: 0,
      earnings: '$0.00',
      joinDate: today
    };

    setDrivers([...drivers, driverToAdd]);
    setIsDialogOpen(false);
    setNewDriver({ name: '', email: '', phone: '', vehicle: '', status: 'pending' });
  };

  const handleStatusChange = (id: string, status: string) => {
    const updated = drivers.map(driver =>
      driver.id === id ? { ...driver, status } : driver
    );
    setDrivers(updated);
  };

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'offline':
        return <Badge variant="outline">Offline</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Drivers</h1>
          <p className="text-gray-600">Manage driver accounts and approvals</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={newDriver.name} onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })} /></div>
              <div><Label>Email</Label><Input value={newDriver.email} onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })} /></div>
              <div><Label>Phone</Label><Input value={newDriver.phone} onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })} /></div>
              <div><Label>Vehicle</Label><Input value={newDriver.vehicle} onChange={(e) => setNewDriver({ ...newDriver, vehicle: e.target.value })} /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddDriver}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* View Details Dialog */}
      {selectedDriver && (
        <Dialog  open={!!selectedDriver} onOpenChange={() => setSelectedDriver(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Driver Details - {selectedDriver.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 text-sm">
              <div><strong>ID:</strong> {selectedDriver.id}</div>
              <div><strong>Email:</strong> {selectedDriver.email}</div>
              <div><strong>Phone:</strong> {selectedDriver.phone}</div>
              <div><strong>Status:</strong> {selectedDriver.status}</div>
              <div><strong>Vehicle:</strong> {selectedDriver.vehicle}</div>
              <div><strong>Rating:</strong> {selectedDriver.rating || 'N/A'}</div>
              <div><strong>Rides:</strong> {selectedDriver.totalRides}</div>
              <div><strong>Earnings:</strong> {selectedDriver.earnings}</div>
              <div><strong>Joined:</strong> {selectedDriver.joinDate}</div>
            </div>
            <DialogFooter >
              <Button  onClick={() => setSelectedDriver(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Driver Management</CardTitle>
          <CardDescription>View and manage all registered drivers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {['all', 'active', 'pending', 'offline', 'rejected'].map(status => (
                  <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Rides</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-sm text-gray-500">{driver.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{driver.email}</div>
                    <div className="text-sm text-gray-500">{driver.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Car className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm">{driver.vehicle}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell>
                    {driver.rating > 0 ? (
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{driver.rating}</span>
                        <span className="text-yellow-400 ml-1">★</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{driver.totalRides}</TableCell>
                  <TableCell>{driver.earnings}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedDriver(driver)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(driver.id, 'active')}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(driver.id, 'rejected')}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
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
