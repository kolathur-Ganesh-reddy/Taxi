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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  XCircle,
  RefreshCw,
  Route
} from 'lucide-react';

const initialBookings = [
  {
    id: 'BK001',
    user: 'John Doe',
    driver: 'Mike Johnson',
    pickup: '123 Main St',
    destination: '456 Oak Ave',
    status: 'completed',
    fare: '$25.50',
    distance: '5.2 km',
    duration: '18 min',
    bookingTime: '2024-04-15 10:30',
    completedTime: '2024-04-15 10:48'
  },
  {
    id: 'BK002',
    user: 'Jane Smith',
    driver: 'Sarah Wilson',
    pickup: '789 Pine St',
    destination: '321 Elm St',
    status: 'in-progress',
    fare: '$18.75',
    distance: '3.8 km',
    duration: '12 min',
    bookingTime: '2024-04-15 11:15',
    completedTime: null
  },
  {
    id: 'BK003',
    user: 'Bob Brown',
    driver: 'David Lee',
    pickup: '555 Cedar Ave',
    destination: '777 Maple Dr',
    status: 'pending',
    fare: '$32.00',
    distance: '8.1 km',
    duration: '25 min',
    bookingTime: '2024-04-15 11:45',
    completedTime: null
  },
  {
    id: 'BK004',
    user: 'Alice Johnson',
    driver: 'Emma Davis',
    pickup: '999 Birch Ln',
    destination: '111 Willow St',
    status: 'cancelled',
    fare: '$0.00',
    distance: '6.5 km',
    duration: '20 min',
    bookingTime: '2024-04-15 09:20',
    completedTime: null
  },
  {
    id: 'BK005',
    user: 'Charlie Wilson',
    driver: 'James Brown',
    pickup: '222 Spruce St',
    destination: '888 Poplar Ave',
    status: 'completed',
    fare: '$41.25',
    distance: '9.8 km',
    duration: '28 min',
    bookingTime: '2024-04-15 08:30',
    completedTime: '2024-04-15 08:58'
  },
];

export const Bookings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [viewRouteOpen, setViewRouteOpen] = useState(false);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setViewDetailsOpen(true);
  };

  const handleViewRoute = (booking: any) => {
    setSelectedBooking(booking);
    setViewRouteOpen(true);
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: 'cancelled', fare: '$0.00' } : b
    );
    setBookings(updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600">Manage ride bookings and assignments</p>
        </div>
        <Button onClick={() => setBookings([...initialBookings])}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>View and manage all ride bookings</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
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
                {['all', 'completed', 'in-progress', 'pending', 'cancelled'].map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium">{booking.id}</div>
                    <div className="text-sm text-gray-500">{booking.bookingTime}</div>
                  </TableCell>
                  <TableCell>{booking.user}</TableCell>
                  <TableCell>{booking.driver}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-green-500" />
                        {booking.pickup}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-red-500" />
                        {booking.destination}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4 text-green-600" />
                      {booking.fare}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>{booking.distance}</div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        {booking.duration}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewRoute(booking)}>
                          <Route className="mr-2 h-4 w-4" />
                          View Route
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCancelBooking(booking.id)}>
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          Cancel Booking
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

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Booking ID: {selectedBooking?.id}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div><strong>User:</strong> {selectedBooking?.user}</div>
            <div><strong>Driver:</strong> {selectedBooking?.driver}</div>
            <div><strong>Status:</strong> {selectedBooking?.status}</div>
            <div><strong>Pickup:</strong> {selectedBooking?.pickup}</div>
            <div><strong>Destination:</strong> {selectedBooking?.destination}</div>
            <div><strong>Fare:</strong> {selectedBooking?.fare}</div>
            <div><strong>Distance:</strong> {selectedBooking?.distance}</div>
            <div><strong>Duration:</strong> {selectedBooking?.duration}</div>
            <div><strong>Booking Time:</strong> {selectedBooking?.bookingTime}</div>
            {selectedBooking?.completedTime && (
              <div><strong>Completed Time:</strong> {selectedBooking?.completedTime}</div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Route Dialog */}
      <Dialog open={viewRouteOpen} onOpenChange={setViewRouteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Route</DialogTitle>
            <DialogDescription>From pickup to destination</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-green-600" />
              <strong>Pickup:</strong> {selectedBooking?.pickup}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-red-600" />
              <strong>Destination:</strong> {selectedBooking?.destination}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewRouteOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
