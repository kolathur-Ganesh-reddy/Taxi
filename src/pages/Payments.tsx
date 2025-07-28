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
  DialogDescription
} from '@/components/ui/dialog';
// import the correct toast hook from your toast library
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Filter,
  MoreHorizontal,
  DollarSign,
  CreditCard,
  Download,
  Eye,
  RefreshCw,
  TrendingUp
} from 'lucide-react';

const payments = [
  {
    id: 'PAY001',
    bookingId: 'BK001',
    user: 'John Doe',
    driver: 'Mike Johnson',
    amount: '$25.50',
    commission: '$2.55',
    driverEarning: '$22.95',
    paymentMethod: 'Credit Card',
    status: 'completed',
    date: '2024-04-15 10:48'
  },
  {
    id: 'PAY002',
    bookingId: 'BK002',
    user: 'Jane Smith',
    driver: 'Sarah Wilson',
    amount: '$18.75',
    commission: '$1.88',
    driverEarning: '$16.87',
    paymentMethod: 'PayPal',
    status: 'processing',
    date: '2024-04-15 11:15'
  },
  {
    id: 'PAY003',
    bookingId: 'BK005',
    user: 'Charlie Wilson',
    driver: 'James Brown',
    amount: '$41.25',
    commission: '$4.13',
    driverEarning: '$37.12',
    paymentMethod: 'Credit Card',
    status: 'completed',
    date: '2024-04-15 08:58'
  },
  {
    id: 'PAY004',
    bookingId: 'BK006',
    user: 'David Miller',
    driver: 'Lisa White',
    amount: '$15.00',
    commission: '$1.50',
    driverEarning: '$13.50',
    paymentMethod: 'Cash',
    status: 'pending',
    date: '2024-04-15 12:30'
  },
  {
    id: 'PAY005',
    bookingId: 'BK007',
    user: 'Emma Thompson',
    driver: 'Robert Green',
    amount: '$28.75',
    commission: '$2.88',
    driverEarning: '$25.87',
    paymentMethod: 'Credit Card',
    status: 'failed',
    date: '2024-04-15 09:15'
  }
];

const stats = [
  { name: 'Total Revenue', value: '$12,345', change: '+12%', icon: DollarSign },
  { name: 'Total Commission', value: '$1,234', change: '+8%', icon: TrendingUp },
  { name: 'Driver Earnings', value: '$11,111', change: '+15%', icon: CreditCard },
  { name: 'Pending Payments', value: '23', change: '-5%', icon: RefreshCw }
];

export const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const { toast } = useToast();

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const downloadReceipt = (payment: any) => {
    const blob = new Blob(
      [
        `Receipt for ${payment.id}\nDate: ${payment.date}\nUser: ${payment.user}\nDriver: ${payment.driver}\nAmount: ${payment.amount}\nCommission: ${payment.commission}\nDriver Earning: ${payment.driverEarning}\nPayment Method: ${payment.paymentMethod}\nStatus: ${payment.status}`
      ],
      { type: 'text/plain' }
    );
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${payment.id}_receipt.txt`;
    link.click();
  };

  const retryPayment = (payment: any) => {
    toast({
      title: `Retry initiated`,
      description: `Retrying payment for ${payment.id}...`,
    });
    // Simulate retry logic here (API call)
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Manage payments and commissions</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
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
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
          <CardDescription>
            View and manage all payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments..."
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
                {['all', 'completed', 'processing', 'pending', 'failed'].map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Payments Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Booking</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Driver Earning</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="font-medium">{payment.id}</div>
                    <div className="text-sm text-gray-500">{payment.date}</div>
                  </TableCell>
                  <TableCell>{payment.bookingId}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{payment.user}</div>
                      <div className="text-sm text-gray-500">{payment.driver}</div>
                    </div>
                  </TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell className="text-blue-600">{payment.commission}</TableCell>
                  <TableCell className="text-green-600">{payment.driverEarning}</TableCell>
                  <TableCell className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{payment.paymentMethod}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedPayment(payment)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => downloadReceipt(payment)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => retryPayment(payment)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Retry Payment
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
      <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              View complete information about payment <b>{selectedPayment?.id}</b>
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-2 text-sm">
              <p><b>User:</b> {selectedPayment.user}</p>
              <p><b>Driver:</b> {selectedPayment.driver}</p>
              <p><b>Booking ID:</b> {selectedPayment.bookingId}</p>
              <p><b>Amount:</b> {selectedPayment.amount}</p>
              <p><b>Commission:</b> {selectedPayment.commission}</p>
              <p><b>Driver Earning:</b> {selectedPayment.driverEarning}</p>
              <p><b>Method:</b> {selectedPayment.paymentMethod}</p>
              <p><b>Status:</b> {selectedPayment.status}</p>
              <p><b>Date:</b> {selectedPayment.date}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
