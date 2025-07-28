import { useState } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import {
  Search, Filter, MoreHorizontal, HelpCircle, MessageCircle, Clock, CheckCircle, User, Car
} from 'lucide-react';

const initialTickets = [
  {
    id: 'TK001',
    subject: 'Payment Issue',
    user: 'John Doe',
    userType: 'passenger',
    priority: 'high',
    status: 'open',
    category: 'payment',
    description: 'Credit card was charged but ride was cancelled',
    createdAt: '2024-04-15 10:30',
    updatedAt: '2024-04-15 11:15',
    assignedTo: 'Agent Sarah',
  },
  {
    id: 'TK002',
    subject: 'Driver Not Found',
    user: 'Jane Smith',
    userType: 'passenger',
    priority: 'medium',
    status: 'in-progress',
    category: 'booking',
    description: 'Waiting for driver for 30 minutes',
    createdAt: '2024-04-15 09:45',
    updatedAt: '2024-04-15 10:20',
    assignedTo: 'Agent Mike',
  },
  {
    id: 'TK003',
    subject: 'Account Suspension',
    user: 'Mike Johnson',
    userType: 'driver',
    priority: 'high',
    status: 'resolved',
    category: 'account',
    description: 'Request to review account suspension',
    createdAt: '2024-04-14 14:20',
    updatedAt: '2024-04-15 09:30',
    assignedTo: 'Agent Lisa',
  },
  {
    id: 'TK004',
    subject: 'App Crash',
    user: 'Alice Johnson',
    userType: 'passenger',
    priority: 'low',
    status: 'open',
    category: 'technical',
    description: 'App crashes when trying to book a ride',
    createdAt: '2024-04-15 08:15',
    updatedAt: '2024-04-15 08:15',
    assignedTo: null,
  },
  {
    id: 'TK005',
    subject: 'Rating Dispute',
    user: 'David Lee',
    userType: 'driver',
    priority: 'medium',
    status: 'closed',
    category: 'rating',
    description: 'Unfair rating from passenger',
    createdAt: '2024-04-13 16:45',
    updatedAt: '2024-04-14 12:30',
    assignedTo: 'Agent Sarah',
  },
];

const stats = [
  { name: 'Open Tickets', value: '23', change: '+3', icon: HelpCircle },
  { name: 'In Progress', value: '12', change: '+1', icon: Clock },
  { name: 'Resolved Today', value: '8', change: '+2', icon: CheckCircle },
  { name: 'Avg Response Time', value: '2.4h', change: '-0.5h', icon: MessageCircle },
];

export const Support: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tickets, setTickets] = useState(initialTickets);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    user: '',
    userType: 'passenger',
    priority: 'low',
    status: 'open',
    category: '',
    description: '',
  });
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [currentAgent] = useState('You'); // In a real app, this would come from auth context

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="destructive">Open</Badge>;
      case 'in-progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="default">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleCreateTicket = () => {
    const id = `TK${String(tickets.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    setTickets([
      ...tickets,
      {
        id,
        ...newTicket,
        createdAt: now,
        updatedAt: now,
        assignedTo: null,
      },
    ]);
    setNewTicket({
      subject: '',
      user: '',
      userType: 'passenger',
      priority: 'low',
      status: 'open',
      category: '',
      description: '',
    });
  };

  const handleViewDetails = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  const handleAssignToMe = (ticketId: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, assignedTo: currentAgent, status: 'in-progress', updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') }
        : ticket
    ));
  };

  const handleMarkResolved = (ticketId: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: 'resolved', updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') }
        : ticket
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support</h1>
          <p className="text-gray-600">Manage customer support tickets and issues</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <MessageCircle className="mr-2 h-4 w-4" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Ticket</DialogTitle>
              <DialogDescription>Fill out the details to open a new support ticket.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Subject" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} />
              <Input placeholder="User Name" value={newTicket.user} onChange={(e) => setNewTicket({ ...newTicket, user: e.target.value })} />
              <Input placeholder="User Type (passenger/driver)" value={newTicket.userType} onChange={(e) => setNewTicket({ ...newTicket, userType: e.target.value })} />
              <Input placeholder="Priority (low/medium/high)" value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })} />
              <Input placeholder="Category" value={newTicket.category} onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })} />
              <Input placeholder="Description" value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} />
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTicket}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter & Table */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>View and manage all support tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search tickets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {['all', 'open', 'in-progress', 'resolved', 'closed'].map((status) => (
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
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{ticket.subject}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{ticket.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {ticket.userType === 'driver' ? (
                        <Car className="h-4 w-4 text-blue-600" />
                      ) : (
                        <User className="h-4 w-4 text-green-600" />
                      )}
                      <div>
                        <div className="font-medium">{ticket.user}</div>
                        <div className="text-sm text-gray-500 capitalize">{ticket.userType}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{ticket.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {ticket.assignedTo || <span className="text-sm text-gray-400">Unassigned</span>}
                  </TableCell>
                  <TableCell>{ticket.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(ticket)}>
                          <MessageCircle className="mr-2 h-4 w-4" />View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignToMe(ticket.id)}>
                          <User className="mr-2 h-4 w-4" />Assign to Me
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleMarkResolved(ticket.id)}
                          disabled={ticket.status === 'resolved' || ticket.status === 'closed'}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />Mark Resolved
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

      {/* Ticket Details Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
        <DialogContent>
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle>Ticket Details: {selectedTicket.id}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center space-x-2 mt-2">
                    {getStatusBadge(selectedTicket.status)}
                    {getPriorityBadge(selectedTicket.priority)}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Subject</h3>
                  <p>{selectedTicket.subject}</p>
                </div>
                <div>
                  <h3 className="font-medium">User</h3>
                  <div className="flex items-center space-x-2">
                    {selectedTicket.userType === 'driver' ? (
                      <Car className="h-4 w-4 text-blue-600" />
                    ) : (
                      <User className="h-4 w-4 text-green-600" />
                    )}
                    <p>{selectedTicket.user} ({selectedTicket.userType})</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Category</h3>
                  <p className="capitalize">{selectedTicket.category}</p>
                </div>
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p>{selectedTicket.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Created At</h3>
                    <p>{selectedTicket.createdAt}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Last Updated</h3>
                    <p>{selectedTicket.updatedAt}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Assigned To</h3>
                  <p>{selectedTicket.assignedTo || 'Unassigned'}</p>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => handleAssignToMe(selectedTicket.id)}
                  disabled={selectedTicket.assignedTo === currentAgent}
                >
                  Assign to Me
                </Button>
                <Button 
                  onClick={() => handleMarkResolved(selectedTicket.id)}
                  disabled={selectedTicket.status === 'resolved' || selectedTicket.status === 'closed'}
                >
                  Mark Resolved
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};