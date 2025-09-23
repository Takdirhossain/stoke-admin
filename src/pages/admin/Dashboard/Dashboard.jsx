import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, Users, Package, Truck, DollarSign, TrendingUp, Calendar, Settings, LogOut, Home, ShoppingCart, UserCheck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '@/config/config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboard', fromDate, toDate],
    queryFn: async () => {
      const response = await API.get(`api/customers/dashboard`, {
        params: {
          start_date: fromDate,
          end_date: toDate,
        },
      });
      return response.data;
    },
    keepPreviousData: true,
  });

  let filledCylinder = [
    { label: '12KG', value: data?.current_stock?.stock_12kg },
    { label: '25KG', value: data?.current_stock?.stock_25kg },
    { label: '33KG', value: data?.current_stock?.stock_33kg },
    { label: '35KG', value: data?.current_stock?.stock_35kg },
    { label: '45KG', value: data?.current_stock?.stock_45kg },
  ];
  let emptyCylinder = [
    { label: '12KG', value: data?.empty_cylinders?.empty_12kg },
    { label: '25KG', value: data?.empty_cylinders?.empty_25kg },
    { label: '33KG', value: data?.empty_cylinders?.empty_33kg },
    { label: '35KG', value: data?.empty_cylinders?.empty_35kg },
    { label: '45KG', value: data?.empty_cylinders?.empty_45kg },
  ];
  return (
    <div className='flex-1 space-y-6 p-6'>
      <div className='flex gap-2 items-center'>
        <Input
          type='date'
          value={fromDate}
          onChange={(e) => {
            setFromDate(e.target.value);
            if (!toDate) setToDate(e.target.value); // auto-fill toDate if empty
          }}
        />
        <span>→</span>
        <Input
          type='date'
          value={toDate}
          min={fromDate} // ensure toDate is not earlier than fromDate
          onChange={(e) => setToDate(e.target.value)}
        />
        <Button onClick={() => refetch()} variant='default' className='ml-2'>
          Apply
        </Button>
        <Button
          onClick={() => {
            setFromDate('');
            setToDate('');
            refetch();
          }}
          variant='outline'>
          Clear
        </Button>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Sales</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-primary'>TK{data?.total_sale}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Paid</CardTitle>
            <ShoppingCart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-primary'>TK{data?.total_paid}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Due</CardTitle>
            <UserCheck className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-primary'>TK{data?.total_due}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Most Saleing</CardTitle>
            <Truck className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-primary'>{data?.most_sold_cylinder}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>Cylinder Stock</CardTitle>
          </CardHeader>

          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Left side - Filled Cylinder */}
              <div>
                <h3 className='font-semibold mb-3'>Filled Cylinders</h3>
                <div className='space-y-2'>
                  {filledCylinder.map((item, idx) => (
                    <div key={idx} className='flex items-center justify-between p-2 rounded-md border hover:bg-muted/40 transition'>
                      <span className='text-sm font-medium'>{item.label}</span>
                      <span className='text-sm font-semibold'>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Empty Cylinder */}
              <div>
                <h3 className='font-semibold mb-3'>Empty Cylinders</h3>
                <div className='space-y-2'>
                  {emptyCylinder.map((item, idx) => (
                    <div key={idx} className='flex items-center justify-between p-2 rounded-md border hover:bg-muted/40 transition'>
                      <span className='text-sm font-medium'>{item.label}</span>
                      <span className='text-sm font-semibold'>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>Top Customers</CardTitle>
          </CardHeader>

          <CardContent>
            <div className='space-y-4'>
              {data?.top_customers?.map((cs, index) => (
                <div key={index} className='flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition'>
                  {/* Left: Avatar + Name */}
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarImage src='https://github.com/shadcn.png' alt={cs.customer_name} />
                      <AvatarFallback>{cs?.customer_name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className='text-sm font-medium'>{cs?.customer_name}</h2>
                      <p className='text-xs text-muted-foreground'>Customer #{index + 1}</p>
                    </div>
                  </div>

                  {/* Right: Total Bought */}
                  <div className='text-right'>
                    <p className='text-sm font-semibold'>{cs?.total_bought}TK</p>
                    <p className='text-xs text-muted-foreground'>Total Bought</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest customer orders and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Is Due</TableHead>
                <TableHead>Pay</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.recent_activity?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className='font-medium'>{order.id}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order?.is_due_bill == 1 ? <Badge className='bg-red-100 text-red-700 hover:bg-red-200'>Due Bill</Badge> : <Badge className='bg-green-100 text-green-700 hover:bg-green-200'>Purchase Bill</Badge>}</TableCell>

                  <TableCell>{order.pay}</TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
