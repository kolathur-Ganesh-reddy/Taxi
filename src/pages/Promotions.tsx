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
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import {
  Search, Filter, MoreHorizontal, Plus, Eye, Edit, Trash2, Calendar, 
} from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

type Promotion = {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: string;
  minAmount: string;
  maxDiscount: string;
  status: string;
  usageCount: number;
  maxUsage: number;
  startDate: string;
  endDate: string;
};

export const Promotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: 'PROMO001',
      code: 'WELCOME20',
      title: 'Welcome Bonus',
      description: '20% off your first ride',
      type: 'percentage',
      value: '20%',
      minAmount: '$10',
      maxDiscount: '$50',
      status: 'active',
      usageCount: 145,
      maxUsage: 1000,
      startDate: '2024-04-01',
      endDate: '2024-05-31',
    },
    { 
      id: 'PROMO002', 
      code: 'SUMMER15',
      title: 'Summer Special',
      description: '15% off weekend rides',
      type: 'percentage',
      value: '15%',
      minAmount: '$15',
      maxDiscount: '$25',
      status: 'active',
      usageCount: 89,
      maxUsage: 500,
      startDate: '2024-04-15',
      endDate: '2024-06-15'
    },
    { 
      id: 'PROMO003', 
      code: 'FLAT5',
      title: 'Flat Discount',
      description: '$5 off any ride',
      type: 'fixed',
      value: '$5',
      minAmount: '$20',
      maxDiscount: '$5',
      status: 'active',
      usageCount: 234,
      maxUsage: 2000,
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    { 
      id: 'PROMO004', 
      code: 'EXPIRED10',
      title: 'Old Promotion',
      description: '10% off rides',
      type: 'percentage',
      value: '10%',
      minAmount: '$5',
      maxDiscount: '$15',
      status: 'expired',
      usageCount: 456,
      maxUsage: 1000,
      startDate: '2024-01-01',
      endDate: '2024-03-31'
    },
    { 
      id: 'PROMO005', 
      code: 'FUTURE25',
      title: 'Future Campaign',
      description: '25% off premium rides',
      type: 'percentage',
      value: '25%',
      minAmount: '$30',
      maxDiscount: '$100',
      status: 'scheduled',
      usageCount: 0,
      maxUsage: 200,
      startDate: '2024-06-01',
      endDate: '2024-06-30'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [editPromotion, setEditPromotion] = useState<Promotion | null>(null);
  const [deletePromotionId, setDeletePromotionId] = useState<string | null>(null);

  // New promotion form state
  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    code: '',
    title: '',
    description: '',
    type: 'percentage',
    value: '',
    minAmount: '',
    maxDiscount: '',
    status: 'active',
    usageCount: 0,
    maxUsage: 100,
    startDate: '',
    endDate: '',
  });

  const handleCreatePromotion = () => {
    const id = `PROMO${String(promotions.length + 1).padStart(3, '0')}`;
    const promo = {
      ...newPromotion,
      id,
    } as Promotion;
    setPromotions((prev) => [...prev, promo]);
    setNewPromotion({
      code: '',
      title: '',
      description: '',
      type: 'percentage',
      value: '',
      minAmount: '',
      maxDiscount: '',
      status: 'active',
      usageCount: 0,
      maxUsage: 100,
      startDate: '',
      endDate: '',
    });
  };

  const handleUpdatePromotion = () => {
    if (!editPromotion) return;
    
    setPromotions(promotions.map(promo => 
      promo.id === editPromotion.id ? editPromotion : promo
    ));
    setEditPromotion(null);
  };

  const handleDeletePromotion = () => {
    if (!deletePromotionId) return;
    
    setPromotions(promotions.filter(promo => promo.id !== deletePromotionId));
    setDeletePromotionId(null);
  };

  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch = promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || promo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">Scheduled</Badge>;
      case 'paused':
        return <Badge variant="outline">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Promotions</h1>
          <p className="text-gray-600">Manage discount codes and promotional campaigns</p>
        </div>

        {/* Dialog to Create Promotion */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              {[
                { label: 'Code', key: 'code' },
                { label: 'Title', key: 'title' },
                { label: 'Description', key: 'description' },
                { label: 'Value', key: 'value' },
                { label: 'Min Amount', key: 'minAmount' },
                { label: 'Max Discount', key: 'maxDiscount' },
                { label: 'Max Usage', key: 'maxUsage' },
                { label: 'Start Date', key: 'startDate', type: 'date' },
                { label: 'End Date', key: 'endDate', type: 'date' },
              ].map(({ label, key, type }) => (
                <Input
                  key={key}
                  type={type || 'text'}
                  placeholder={label}
                  value={(newPromotion as any)[key] ?? ''}
                  onChange={(e) =>
                    setNewPromotion((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                />
              ))}

              {/* Type Selector */}
              <select
                value={newPromotion.type}
                onChange={(e) => setNewPromotion({ ...newPromotion, type: e.target.value as 'percentage' | 'fixed' })}
                className="border px-3 py-2 rounded-md"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>

              {/* Status Selector */}
              <select
                value={newPromotion.status}
                onChange={(e) => setNewPromotion({ ...newPromotion, status: e.target.value })}
                className="border px-3 py-2 rounded-md"
              >
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="expired">Expired</option>
                <option value="paused">Paused</option>
              </select>

              <Button onClick={handleCreatePromotion}>Save Promotion</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* View Details Dialog */}
      <Dialog open={!!selectedPromotion} onOpenChange={(open) => !open && setSelectedPromotion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promotion Details</DialogTitle>
          </DialogHeader>
          {selectedPromotion && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Code</p>
                  <p>{selectedPromotion.code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Title</p>
                  <p>{selectedPromotion.title}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p>{selectedPromotion.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p>{selectedPromotion.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Value</p>
                  <p>{selectedPromotion.value}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  {getStatusBadge(selectedPromotion.status)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Min Amount</p>
                  <p>{selectedPromotion.minAmount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Max Discount</p>
                  <p>{selectedPromotion.maxDiscount}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Usage</p>
                  <p>{selectedPromotion.usageCount} / {selectedPromotion.maxUsage}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Period</p>
                  <p>{selectedPromotion.startDate} to {selectedPromotion.endDate}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedPromotion(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editPromotion} onOpenChange={(open) => !open && setEditPromotion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Promotion</DialogTitle>
          </DialogHeader>
          {editPromotion && (
            <div className="grid gap-4">
              {[
                { label: 'Code', key: 'code' },
                { label: 'Title', key: 'title' },
                { label: 'Description', key: 'description' },
                { label: 'Value', key: 'value' },
                { label: 'Min Amount', key: 'minAmount' },
                { label: 'Max Discount', key: 'maxDiscount' },
                { label: 'Max Usage', key: 'maxUsage' },
                { label: 'Start Date', key: 'startDate', type: 'date' },
                { label: 'End Date', key: 'endDate', type: 'date' },
              ].map(({ label, key, type }) => (
                <Input
                  key={key}
                  type={type || 'text'}
                  placeholder={label}
                  value={(editPromotion as any)[key] ?? ''}
                  onChange={(e) =>
                    setEditPromotion({ ...editPromotion, [key]: e.target.value })
                  }
                />
              ))}

              {/* Type Selector */}
              <select
                value={editPromotion.type}
                onChange={(e) => setEditPromotion({ ...editPromotion, type: e.target.value as 'percentage' | 'fixed' })}
                className="border px-3 py-2 rounded-md"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>

              {/* Status Selector */}
              <select
                value={editPromotion.status}
                onChange={(e) => setEditPromotion({ ...editPromotion, status: e.target.value })}
                className="border px-3 py-2 rounded-md"
              >
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="expired">Expired</option>
                <option value="paused">Paused</option>
              </select>

              <Button onClick={handleUpdatePromotion}>Update Promotion</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePromotionId} onOpenChange={(open) => !open && setDeletePromotionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the promotion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePromotion}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* same as your card layout... */}
      </div>

      {/* Filter + Table */}
      <Card>
        <CardHeader>
          <CardTitle>Promotion Management</CardTitle>
          <CardDescription>View and manage all promotional campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search promotions..."
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
                {['all', 'active', 'scheduled', 'expired', 'paused'].map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                    {status[0].toUpperCase() + status.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>
                    <div className="font-medium">{promo.code}</div>
                    <div className="text-sm text-gray-500">{promo.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{promo.title}</div>
                    <div className="text-sm text-gray-500">{promo.description}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {promo.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{promo.value}</div>
                    <div className="text-sm text-gray-500">
                      Min: {promo.minAmount} | Max: {promo.maxDiscount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {promo.usageCount} / {promo.maxUsage}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(promo.usageCount / promo.maxUsage) * 100}%` }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3 text-gray-400" />
                      {promo.startDate}
                    </div>
                    <div className="text-sm text-gray-500">to {promo.endDate}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(promo.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedPromotion(promo)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditPromotion({...promo})}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeletePromotionId(promo.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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