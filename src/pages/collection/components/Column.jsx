import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Printer, SquarePen, Trash } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import EditModal from './EditStoke';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const columns = ({ constHandelDelete }) => [
  {
    id: 'index',
    header: () => <div className='text-center'>Index</div>,
    cell: ({ row }) => <div className='text-center'>{row.index + 1}</div>,
  },
  {
    id: 'customer',
    header: () => <div className='text-center'>Customer</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.customer?.name || row.original.customer_name || "N/A"}</div>,
  },


  {
    accessorKey: 'pay',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Pay <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className='text-start'>{row.getValue('pay')} TK</div>,
  },
  {
    accessorKey: 'date',
    header: () => <div className='text-center'>Date</div>,
    cell: ({ row }) => <div className='text-center'>{row.getValue('date')}</div>,
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>Actions</div>,
    cell: ({ row }) => (
      <div className='flex justify-center items-center'>
        <ToggleGroup variant='outline' type='single'>
          <ToggleGroupItem className='cursor-pointer' value='delete' aria-label='Delete row' onClick={() => constHandelDelete(row.original.id)}>
            <Trash width={20} height={20} />
          </ToggleGroupItem>

          <ToggleGroupItem
            className="cursor-pointer"
            value="settings"
            aria-label="Customer details"
          >
            <Link to={`/admin/stoke/${row.original.id}`}>
            <Edit width={20} height={20} />
            </Link>
          </ToggleGroupItem>
          <ToggleGroupItem
            className="cursor-pointer"
            value="settings"
            aria-label="Customer details"
          >
            <Link to={`/admin/stoke/${row.original.id}`}>
            <Printer width={20} height={20} />
            </Link>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    ),
  },
];

export default columns;
