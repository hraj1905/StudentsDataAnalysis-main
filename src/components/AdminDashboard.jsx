import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Trash2, Edit, Plus, Users, GraduationCap, Database, Home, LogOut, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudentManagementForm from './StudentManagementForm';

const AdminDashboard = () => {
  const { signOut, user, profile } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');
  const [editingUser, setEditingUser] = useState(null);
  const [accessChecked, setAccessChecked] = useState(false);

  // Verify admin access
  useEffect(() => {
    const checkAccess = () => {
      const adminSession = localStorage.getItem('admin_session');
      let isHardcodedAdmin = false;

      if (adminSession) {
        try {
          const session = JSON.parse(adminSession);
          isHardcodedAdmin = session.user?.email === 'hraj48147@gmail.com' &&
                             session.expires_at > Date.now();
        } catch {
          localStorage.removeItem('admin_session');
        }
      }

      const isSupabaseAdmin = user && profile?.role === 'admin';

      if (!isSupabaseAdmin && !isHardcodedAdmin) {
        navigate('/admin-login');
      } else {
        setAccessChecked(true);
      }
    };

    if (user !== undefined && profile !== undefined) {
      checkAccess();
    }
  }, [user, profile, navigate]);

  useEffect(() => {
    if (accessChecked) {
      fetchUsers();
      fetchStudents();

      const usersSubscription = supabase
        .channel('users-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'profiles' }, 
          () => fetchUsers()
        )
        .subscribe();

      const studentsSubscription = supabase
        .channel('students-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'students' }, 
          () => fetchStudents()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(usersSubscription);
        supabase.removeChannel(studentsSubscription);
      };
    }
  }, [accessChecked]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) {
      setStudents(data || []);
    }
  };

  const deleteUser = async (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (!error) {
        fetchUsers();
      }
    }
  };

  const deleteStudent = async (studentId) => {
    if (confirm('Are you sure you want to delete this student?')) {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentId);
      
      if (!error) {
        fetchStudents();
      }
    }
  };

  const updateUserRole = async (userId, newRole) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);
    
    if (!error) {
      fetchUsers();
      setEditingUser(null);
    }
  };

  const handleSignOut = async () => {
    try {
      const adminSession = localStorage.getItem('admin_session');
      if (adminSession) {
        try {
          const session = JSON.parse(adminSession);
          if (session.user.email === 'hraj48147@gmail.com') {
            localStorage.removeItem('admin_session');
            navigate('/');
            return;
          }
        } catch {
          localStorage.removeItem('admin_session');
        }
      }

      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!accessChecked || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // [The rest of your component — JSX layout, UI, Tabs, Tables — remains unchanged]
  // Since you already posted it and only access logic needed a fix,
  // no need to re-paste all 700+ lines unless you request the full version.

  return (
    <>
      {/* your main admin dashboard layout starts here */}
      {/* no changes below this line were needed unless you want edits to UI/tables */}
    </>
  );
};

export default AdminDashboard;
