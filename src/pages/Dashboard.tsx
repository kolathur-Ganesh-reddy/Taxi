import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Car, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const stats = [
  { name: 'Total Users', value: '12,345', change: '+12%', icon: Users, color: 'text-blue-600' },
  { name: 'Active Drivers', value: '2,456', change: '+8%', icon: Car, color: 'text-green-600' },
  { name: "Today's Bookings", value: '1,234', change: '+15%', icon: MapPin, color: 'text-purple-600' },
  { name: "Today's Revenue", value: '$45,678', change: '+22%', icon: DollarSign, color: 'text-orange-600' },
];

const bookingData = [
  { name: 'Mon', bookings: 120, revenue: 2400 },
  { name: 'Tue', bookings: 190, revenue: 3800 },
  { name: 'Wed', bookings: 150, revenue: 3000 },
  { name: 'Thu', bookings: 220, revenue: 4400 },
  { name: 'Fri', bookings: 280, revenue: 5600 },
  { name: 'Sat', bookings: 350, revenue: 7000 },
  { name: 'Sun', bookings: 320, revenue: 6400 },
];

const statusData = [
  { name: 'Completed', value: 65, color: '#10B981' },
  { name: 'In Progress', value: 20, color: '#F59E0B' },
  { name: 'Cancelled', value: 10, color: '#EF4444' },
  { name: 'Pending', value: 5, color: '#6B7280' },
];

const recentBookings = [
  { id: 'BK001', user: 'John Doe', driver: 'Mike Johnson', status: 'completed', amount: '$25.50' },
  { id: 'BK002', user: 'Jane Smith', driver: 'Sarah Wilson', status: 'in-progress', amount: '$18.75' },
  { id: 'BK003', user: 'Bob Brown', driver: 'David Lee', status: 'pending', amount: '$32.00' },
  { id: 'BK004', user: 'Alice Johnson', driver: 'Emma Davis', status: 'completed', amount: '$41.25' },
];

// Example System Status info. You can fetch this from an API if you wish.
const systemStatusDetails = [
  { name: 'Database', status: 'Healthy' },
  { name: 'API Server', status: 'Healthy' },
  { name: 'Web App', status: 'Healthy' },
  { name: 'Payment Service', status: 'Degraded' },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  // Handler to simulate generating a report (replace with real logic if needed)
  const handleGenerateReport = () => {
    setReportGenerated(false);
    setTimeout(() => {
      setReportGenerated(true);
    }, 1300); // Simulate API latency
  };

  // System Status Modal or Card (simplified inline, you can extract if you use modals/toasts)
  const SystemStatusCard = () => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Current health of platform services</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {systemStatusDetails.map((item) => (
            <li key={item.name} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span className={ item.status === 'Healthy' ? 'text-green-600' : 'text-orange-600' }>
                ● {item.status}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Button onClick={handleGenerateReport}>
          <TrendingUp className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Conditional Report Banner */}
      {reportGenerated && (
        <div className="p-3 rounded bg-green-50 border border-green-300 flex items-center gap-2 text-green-700">
          <TrendingUp className="h-5 w-5" />
          Report has been successfully generated and sent to your email/downloads.
        </div>
      )}

      {/* System Status Card shown when requested */}
      {showStatus && <SystemStatusCard />}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Bookings</CardTitle>
            <CardDescription>
              Booking trends over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
            <CardDescription>
              Distribution of booking statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Latest booking activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{booking.user}</p>
                      <p className="text-xs text-gray-500">Driver: {booking.driver}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={booking.status === 'completed' ? 'default' : 
                              booking.status === 'in-progress' ? 'secondary' : 'outline'}
                    >
                      {booking.status}
                    </Badge>
                    <span className="text-sm font-medium">{booking.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Commonly used admin actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/users')}
              >
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/drivers')}
              >
                <Car className="h-6 w-6 mb-2" />
                <span className="text-sm">Approve Drivers</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/support')}
              >
                <AlertCircle className="h-6 w-6 mb-2" />
                <span className="text-sm">Support Tickets</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => setShowStatus((v) => !v)}
              >
                <Clock className="h-6 w-6 mb-2" />
                <span className="text-sm">System Status</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
