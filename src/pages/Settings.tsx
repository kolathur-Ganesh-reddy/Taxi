import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon,
  MapPin,
  DollarSign,
  Users,
  Car,
  Bell,
  Shield,
  Save
} from 'lucide-react';

// --- Custom Black Switch, NO ON/OFF text ---
const CustomSwitch = ({
  checked,
  onChange,
  className = ""
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) => (
  <button
    type="button"
    aria-pressed={checked}
    tabIndex={0}
    onClick={() => onChange(!checked)}
    className={`
      relative inline-flex items-center h-7 w-14 rounded-full ring-0 transition-colors duration-300
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
      ${checked ? "bg-black" : "bg-gray-300 dark:bg-slate-700"} ${className}
    `}
    style={{ minWidth: 56, minHeight: 28 }}
  >
    <span
      className={`
        absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-lg
        transition-transform duration-300 ${checked ? 'translate-x-7' : ''}
      `}
    />
    {/* No ON/OFF label */}
  </button>
);

export const Settings: React.FC = () => {
  // Switch States
  const [serviceAreas, setServiceAreas] = useState({
    downtown: true,
    airport: true,
    suburban: false,
  });
  const [driverSwitch, setDriverSwitch] = useState({
    autoAssign: true,
    backgroundCheck: true,
    inspection: true,
  });
  const [userSwitch, setUserSwitch] = useState({
    emailVerify: true,
    phoneVerify: true,
    guestBooking: false,
  });
  const [notificationSwitch, setNotificationSwitch] = useState({
    email: true,
    sms: true,
    push: true,
  });
  const [securitySwitch, setSecuritySwitch] = useState({
    twofa: true,
    session: true,
    encryption: true,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure system settings and preferences</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="mr-2 h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>
            Basic configuration for your taxi service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="TaxiCorp Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input id="support-email" type="email" defaultValue="support@taxicorp.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="support-phone">Support Phone</Label>
              <Input id="support-phone" defaultValue="+1-800-TAXI-123" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" defaultValue="USD" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Service Areas
          </CardTitle>
          <CardDescription>
            Configure geographic service zones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Downtown Area</h4>
                <p className="text-sm text-gray-500">Central business district</p>
              </div>
              <CustomSwitch
                checked={serviceAreas.downtown}
                onChange={v => setServiceAreas(a => ({ ...a, downtown: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Airport Zone</h4>
                <p className="text-sm text-gray-500">Airport and surrounding areas</p>
              </div>
              <CustomSwitch
                checked={serviceAreas.airport}
                onChange={v => setServiceAreas(a => ({ ...a, airport: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Suburban Areas</h4>
                <p className="text-sm text-gray-500">Residential suburbs</p>
              </div>
              <CustomSwitch
                checked={serviceAreas.suburban}
                onChange={v => setServiceAreas(a => ({ ...a, suburban: v }))}
              />
            </div>
          </div>
          <Button variant="outline">
            <MapPin className="mr-2 h-4 w-4" />
            Add New Service Area
          </Button>
        </CardContent>
      </Card>

      {/* Pricing Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Pricing Configuration
          </CardTitle>
          <CardDescription>
            Set base rates and pricing rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="base-fare">Base Fare</Label>
              <Input id="base-fare" type="number" defaultValue="2.50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="per-km">Per Kilometer</Label>
              <Input id="per-km" type="number" defaultValue="1.20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="per-minute">Per Minute</Label>
              <Input id="per-minute" type="number" defaultValue="0.30" />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">Surge Pricing</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="surge-multiplier">Peak Hours Multiplier</Label>
                <Input id="surge-multiplier" type="number" defaultValue="1.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                <Input id="commission-rate" type="number" defaultValue="15" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Driver Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Car className="mr-2 h-5 w-5" />
            Driver Settings
          </CardTitle>
          <CardDescription>
            Configure driver requirements and policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-assign Rides</h4>
                <p className="text-sm text-gray-500">Automatically assign rides to nearest drivers</p>
              </div>
              <CustomSwitch
                checked={driverSwitch.autoAssign}
                onChange={v => setDriverSwitch(a => ({ ...a, autoAssign: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Background Check Required</h4>
                <p className="text-sm text-gray-500">Require background check for new drivers</p>
              </div>
              <CustomSwitch
                checked={driverSwitch.backgroundCheck}
                onChange={v => setDriverSwitch(a => ({ ...a, backgroundCheck: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Vehicle Inspection</h4>
                <p className="text-sm text-gray-500">Require annual vehicle inspection</p>
              </div>
              <CustomSwitch
                checked={driverSwitch.inspection}
                onChange={v => setDriverSwitch(a => ({ ...a, inspection: v }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="max-distance">Max Assignment Distance (km)</Label>
              <Input id="max-distance" type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-rating">Minimum Driver Rating</Label>
              <Input id="min-rating" type="number" defaultValue="4.0" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            User Settings
          </CardTitle>
          <CardDescription>
            Configure user account and booking policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Verification</h4>
                <p className="text-sm text-gray-500">Require email verification for new accounts</p>
              </div>
              <CustomSwitch
                checked={userSwitch.emailVerify}
                onChange={v => setUserSwitch(a => ({ ...a, emailVerify: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Phone Verification</h4>
                <p className="text-sm text-gray-500">Require phone verification for bookings</p>
              </div>
              <CustomSwitch
                checked={userSwitch.phoneVerify}
                onChange={v => setUserSwitch(a => ({ ...a, phoneVerify: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Allow Guest Bookings</h4>
                <p className="text-sm text-gray-500">Allow bookings without account registration</p>
              </div>
              <CustomSwitch
                checked={userSwitch.guestBooking}
                onChange={v => setUserSwitch(a => ({ ...a, guestBooking: v }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cancellation-window">Cancellation Window (minutes)</Label>
              <Input id="cancellation-window" type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-timeout">Booking Timeout (minutes)</Label>
              <Input id="booking-timeout" type="number" defaultValue="10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-500">Send email notifications for important events</p>
              </div>
              <CustomSwitch
                checked={notificationSwitch.email}
                onChange={v => setNotificationSwitch(a => ({ ...a, email: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">SMS Notifications</h4>
                <p className="text-sm text-gray-500">Send SMS notifications for time-sensitive updates</p>
              </div>
              <CustomSwitch
                checked={notificationSwitch.sms}
                onChange={v => setNotificationSwitch(a => ({ ...a, sms: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-gray-500">Send push notifications through the mobile app</p>
              </div>
              <CustomSwitch
                checked={notificationSwitch.push}
                onChange={v => setNotificationSwitch(a => ({ ...a, push: v }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
              </div>
              <CustomSwitch
                checked={securitySwitch.twofa}
                onChange={v => setSecuritySwitch(a => ({ ...a, twofa: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Session Timeout</h4>
                <p className="text-sm text-gray-500">Automatically log out inactive sessions</p>
              </div>
              <CustomSwitch
                checked={securitySwitch.session}
                onChange={v => setSecuritySwitch(a => ({ ...a, session: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data Encryption</h4>
                <p className="text-sm text-gray-500">Encrypt sensitive data at rest</p>
              </div>
              <CustomSwitch
                checked={securitySwitch.encryption}
                onChange={v => setSecuritySwitch(a => ({ ...a, encryption: v }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-expiry">Password Expiry (days)</Label>
              <Input id="password-expiry" type="number" defaultValue="90" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
