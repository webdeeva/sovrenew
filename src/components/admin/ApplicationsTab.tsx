import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { getApplications, updateApplicationStatus } from '@/lib/api/founding-citizens';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Tables } from '@/lib/database.types';

type Application = Tables['founding_citizens']['Row'];

export default function ApplicationsTab() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      toast.error('Failed to fetch applications');
    }
  };

  const handleStatusUpdate = async (id: string, status: Application['status']) => {
    try {
      await updateApplicationStatus(id, status);
      await fetchApplications();
      toast.success('Application status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const downloadCSV = () => {
    try {
      const headers = ['Full Name', 'Email', 'Phone', 'Location', 'Occupation', 'Status', 'Date'];
      const rows = applications.map(app => [
        app.full_name,
        app.email,
        app.phone,
        `${app.city_state}, ${app.country}`,
        app.occupation,
        app.status,
        new Date(app.created_at).toLocaleDateString()
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `founding-citizens-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('CSV downloaded successfully');
    } catch (error) {
      toast.error('Failed to download CSV');
    }
  };

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button
          onClick={downloadCSV}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.full_name}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{app.email}</div>
                    <div className="text-gray-500">{app.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{`${app.city_state}, ${app.country}`}</TableCell>
                <TableCell>{app.occupation}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      app.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : app.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(app.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(app.id, 'approved')}
                      className="bg-green-500 text-white"
                      disabled={app.status === 'approved'}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(app.id, 'rejected')}
                      variant="destructive"
                      disabled={app.status === 'rejected'}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}