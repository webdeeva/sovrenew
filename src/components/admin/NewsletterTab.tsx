import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { getSubscribers } from '@/lib/api/newsletter';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Subscriber {
  id: string;
  email: string;
  subscribed: boolean;
  created_at: string;
}

export default function NewsletterTab() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const data = await getSubscribers();
      setSubscribers(data);
    } catch (error) {
      toast.error('Failed to fetch subscribers');
    }
  };

  const downloadCSV = () => {
    try {
      const headers = ['Email', 'Status', 'Date'];
      const rows = subscribers.map(sub => [
        sub.email,
        sub.subscribed ? 'Subscribed' : 'Unsubscribed',
        new Date(sub.created_at).toLocaleDateString()
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`);
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
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.email}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      sub.subscribed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {sub.subscribed ? 'Subscribed' : 'Unsubscribed'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(sub.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}