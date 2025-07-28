import {  useState } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search, Filter, MoreHorizontal, Bell,
  Send, Users, Car, AlertCircle, CheckCircle, Clock, MessageSquare,
} from 'lucide-react';

// Moved notifications to state!
const initialNotifications = [
  { id: 'NOT001', title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2 AM - 4 AM', type: 'system', audience: 'all', status: 'sent', sentAt: '2024-04-15 10:00', readCount: 1245, totalRecipients: 1500 },
  { id: 'NOT002', title: 'New Driver Incentive', message: 'Earn extra $20 for completing 5 rides today', type: 'promotional', audience: 'drivers', status: 'scheduled', sentAt: '2024-04-16 06:00', readCount: 0, totalRecipients: 456 },
  { id: 'NOT003', title: 'Weekend Surge Pricing', message: 'Higher fares during weekend peak hours', type: 'informational', audience: 'passengers', status: 'sent', sentAt: '2024-04-14 18:00', readCount: 892, totalRecipients: 1200 },
  { id: 'NOT004', title: 'Safety Alert', message: 'Please wear masks during rides for safety', type: 'safety', audience: 'all', status: 'draft', sentAt: null, readCount: 0, totalRecipients: 0 },
  { id: 'NOT005', title: 'App Update Available', message: 'New app version with improved features', type: 'update', audience: 'all', status: 'sent', sentAt: '2024-04-13 09:00', readCount: 1356, totalRecipients: 1500 },
];

const stats = [
  { name: 'Total Sent', value: '156', change: '+12', icon: Send },
  { name: 'Read Rate', value: '78%', change: '+5%', icon: CheckCircle },
  { name: 'Scheduled', value: '8', change: '+2', icon: Clock },
  { name: 'Draft', value: '4', change: '+1', icon: MessageSquare },
];

export const Notifications: React.FC = () => {
  // Newly stateful notifications:
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  type Notification = {
    id: string;
    title: string;
    message: string;
    type: string;
    audience: string;
    status: string;
    sentAt: string | null;
    readCount: number;
    totalRecipients: number;
  };

  const [detailNotification, setDetailNotification] = useState<Notification | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editNotification, setEditNotification] = useState<Notification | null>(null);

  // Compose/Edit form states
  const [composeTitle, setComposeTitle] = useState('');
  const [composeType, setComposeType] = useState('');
  const [composeAudience, setComposeAudience] = useState('');
  const [composeMessage, setComposeMessage] = useState('');

  // List filtering
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase())
      || notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = (statusFilter === 'all' || notification.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

  // Helpers for badges/icons
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="default">Sent</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">Scheduled</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'promotional':
        return <Badge variant="default">Promotional</Badge>;
      case 'safety':
        return <Badge variant="destructive">Safety</Badge>;
      case 'system':
        return <Badge variant="secondary">System</Badge>;
      case 'informational':
        return <Badge variant="outline">Info</Badge>;
      case 'update':
        return <Badge variant="outline">Update</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'drivers':
        return <Car className="h-4 w-4 text-blue-600" />;
      case 'passengers':
        return <Users className="h-4 w-4 text-green-600" />;
      case 'all':
        return <AlertCircle className="h-4 w-4 text-purple-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-400" />;
    }
  };

  // Handlers
  const handleViewDetails = (notification: Notification | null) => {
    setDetailNotification(notification);
    setShowDetailModal(true);
  };

  const handleDuplicate = (notification: { id: string; title: string; message: string; type: string; audience: string; status: string; sentAt: string; readCount: number; totalRecipients: number; } | { id: string; title: string; message: string; type: string; audience: string; status: string; sentAt: null; readCount: number; totalRecipients: number; }) => {
    // Generate a new unique ID (for demo, using timestamp)
    const newId = 'NOT' + (Date.now());
    const duplicated = { ...notification, id: newId, title: notification.title + ' (Copy)', status: 'draft', sentAt: null };
    setNotifications(prev => [duplicated, ...prev]);
  };

  const handleEdit = (
    notification:
      | { id: string; title: string; message: string; type: string; audience: string; status: string; sentAt: string; readCount: number; totalRecipients: number; }
      | { id: string; title: string; message: string; type: string; audience: string; status: string; sentAt: null; readCount: number; totalRecipients: number; }
      | null
  ) => {
    if (!notification) return;
    setEditNotification(notification);
    setComposeTitle(notification.title);
    setComposeType(notification.type);
    setComposeAudience(notification.audience);
    setComposeMessage(notification.message);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!editNotification) return;
    setNotifications(prev =>
      prev.map(n =>
        n.id === editNotification.id
          ? {
              ...n,
              title: composeTitle,
              type: composeType,
              audience: composeAudience,
              message: composeMessage,
            }
          : n
      )
    );
    setShowEditModal(false);
    setEditNotification(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Send notifications and manage communication</p>
        </div>
        <Button onClick={() => setShowComposeForm(true)}>
          <Send className="mr-2 h-4 w-4" />
          Compose Notification
        </Button>
      </div>
      {showComposeForm && (
        <Card>
          <CardHeader>
            <CardTitle>Compose Notification</CardTitle>
            <CardDescription>Send a notification to users or drivers</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={e => {
              e.preventDefault();
              // Could push new notification here
            }}>
              {/* ... Your compose form as before ... */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input value={composeTitle} onChange={e => setComposeTitle(e.target.value)} placeholder="Notification title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">{composeType ? composeType.charAt(0).toUpperCase() + composeType.slice(1) : 'Select Type'}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {['promotional','safety','system','informational','update'].map(type => (
                          <DropdownMenuItem key={type} onClick={() => setComposeType(type)}>{type.charAt(0).toUpperCase() + type.slice(1)}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Audience</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">{composeAudience ? composeAudience.charAt(0).toUpperCase() + composeAudience.slice(1) : 'Select Audience'}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setComposeAudience('all')}>All Users</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setComposeAudience('drivers')}>Drivers Only</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setComposeAudience('passengers')}>Passengers Only</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea value={composeMessage} onChange={e => setComposeMessage(e.target.value)} placeholder="Enter your notification message" rows={4} />
                </div>
                <div className="flex space-x-4">
                  <Button type="submit">Send Now</Button>
                  <Button variant="outline">Schedule</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="outline" onClick={() => setShowComposeForm(false)}>Cancel</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Stats cards as before */}
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
                <span className="text-green-600">{stat.change}</span> from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ------- Notifications Table ----------- */}
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>View all sent, scheduled, and draft notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
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
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('sent')}>Sent</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('scheduled')}>Scheduled</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('draft')}>Draft</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead>Read Rate</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{notification.message}</div>
                  </TableCell>
                  <TableCell>{getTypeBadge(notification.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getAudienceIcon(notification.audience)}
                      <span className="capitalize">{notification.audience}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(notification.status)}</TableCell>
                  <TableCell>
                    {notification.sentAt ? (
                      <div className="text-sm">{notification.sentAt}</div>
                    ) : (
                      <span className="text-sm text-gray-400">Not sent</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {notification.totalRecipients > 0 ? (
                      <div className="text-sm">
                        {notification.readCount} / {notification.totalRecipients}
                        <div className="text-xs text-gray-500">
                          {Math.round((notification.readCount / notification.totalRecipients) * 100)}%
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  {/* ----------- Actions column --------- */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(notification)}>
                          <Bell className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(notification)}>
                          <Send className="mr-2 h-4 w-4" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(notification)}>
                          <AlertCircle className="mr-2 h-4 w-4" /> Edit
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

      {/* Detail modal */}
      {showDetailModal && detailNotification && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-lg max-w-md w-full p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xl font-bold">{detailNotification.title}</div>
              <Button variant="ghost" onClick={() => setShowDetailModal(false)}>Close</Button>
            </div>
            <div className="space-y-2">
              <div><b>Type:</b> {detailNotification.type}</div>
              <div><b>Audience:</b> {detailNotification.audience}</div>
              <div><b>Status:</b> {detailNotification.status}</div>
              <div><b>Sent At:</b> {detailNotification.sentAt || 'Not sent'}</div>
              <div><b>Message:</b></div>
              <div className="p-2 rounded bg-gray-50 border">{detailNotification.message}</div>
              <div><b>Read:</b> {detailNotification.readCount} / {detailNotification.totalRecipients}</div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Notification Modal */}
      {showEditModal && editNotification && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-lg max-w-lg w-full p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xl font-bold">Edit Notification</div>
              <Button variant="ghost" onClick={() => setShowEditModal(false)}>Close</Button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input value={composeTitle} onChange={e => setComposeTitle(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">{composeType ? composeType.charAt(0).toUpperCase() + composeType.slice(1) : 'Select Type'}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {['promotional','safety','system','informational','update'].map(type => (
                        <DropdownMenuItem key={type} onClick={() => setComposeType(type)}>{type.charAt(0).toUpperCase() + type.slice(1)}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Audience</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">{composeAudience ? composeAudience.charAt(0).toUpperCase() + composeAudience.slice(1) : 'Select Audience'}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setComposeAudience('all')}>All Users</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setComposeAudience('drivers')}>Drivers Only</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setComposeAudience('passengers')}>Passengers Only</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea value={composeMessage} onChange={e => setComposeMessage(e.target.value)} rows={4} />
                </div>
                <div className="flex space-x-4">
                  <Button type="submit">Save</Button>
                  <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
