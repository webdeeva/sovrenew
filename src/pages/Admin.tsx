import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/components/admin/AdminLogin';
import ApplicationsTab from '@/components/admin/ApplicationsTab';
import NewsletterTab from '@/components/admin/NewsletterTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function Admin() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin');
    } catch (error: any) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>

          <Tabs defaultValue="applications">
            <TabsList className="mb-6">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            </TabsList>

            <TabsContent value="applications">
              <ApplicationsTab />
            </TabsContent>

            <TabsContent value="newsletter">
              <NewsletterTab />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}