
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserDashboard = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFullName(profile?.full_name || '');
  }, [profile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await updateProfile({ full_name: fullName });
    
    if (error) {
      setMessage('Error updating profile: ' + error.message);
    } else {
      setMessage('Profile updated successfully!');
      setEditing(false);
    }
    
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <Button 
            onClick={handleSignOut}
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  {(profile?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">
                {profile?.full_name || 'User'}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {user?.email}
              </CardDescription>
              <Badge variant={profile?.role === 'admin' ? 'destructive' : 'secondary'}>
                {profile?.role || 'user'}
              </Badge>
            </CardHeader>
            
            <CardContent>
              {editing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        type="submit" 
                        size="sm" 
                        disabled={loading || !fullName.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditing(false);
                          setFullName(profile?.full_name || '');
                        }}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
              ) : (
                <Button 
                  onClick={() => setEditing(true)}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20"
                >
                  Edit Profile
                </Button>
              )}

              {message && (
                <Alert className="mt-4 bg-green-500/20 border-green-500/50">
                  <AlertDescription className="text-green-300">
                    {message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Welcome Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back!</CardTitle>
              <CardDescription className="text-gray-300">
                Here's what's happening with your account today.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/20 rounded-lg">
                  <h3 className="font-semibold text-blue-300">Account Status</h3>
                  <p className="text-sm text-gray-300 mt-1">Active</p>
                </div>
                
                <div className="p-4 bg-purple-500/20 rounded-lg">
                  <h3 className="font-semibold text-purple-300">Member Since</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    {new Date(profile?.created_at || user?.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="p-4 bg-green-500/20 rounded-lg">
                  <h3 className="font-semibold text-green-300">Role</h3>
                  <p className="text-sm text-gray-300 mt-1 capitalize">
                    {profile?.role || 'User'}
                  </p>
                </div>
                
                <div className="p-4 bg-orange-500/20 rounded-lg">
                  <h3 className="font-semibold text-orange-300">Last Login</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    {new Date(user?.last_sign_in_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
