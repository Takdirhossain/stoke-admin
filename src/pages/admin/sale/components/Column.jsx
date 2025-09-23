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
    accessorKey: 'twelve_kg',
    header: () => <div className='text-center'>12 KG</div>,
    cell: ({ row }) => {
      const filled = row.original.twelve_kg || 0;
      const empty = row.original.empty_twelve_kg || 0;
      return (
        <div className='text-center'>
          {filled} / {empty}
        </div>
      );
    },
  },
  {
    accessorKey: 'twentyfive_kg',
    header: () => <div className='text-center'>25 KG</div>,
    cell: ({ row }) => {
      const filled = row.original.twentyfive_kg || 0;
      const empty = row.original.empty_twentyfive_kg || 0;
      return (
        <div className='text-center'>
          {filled} / {empty}
        </div>
      );
    },
  },
  {
    accessorKey: 'thirtythree_kg',
    header: () => <div className='text-center'>33 KG</div>,
    cell: ({ row }) => {
      const filled = row.original.thirtythree_kg || 0;
      const empty = row.original.empty_thirtythree_kg || 0;
      return (
        <div className='text-center'>
          {filled} / {empty}
        </div>
      );
    },
  },
  {
    accessorKey: 'thirtyfive_kg',
    header: () => <div className='text-center'>35 KG</div>,
    cell: ({ row }) => {
      const filled = row.original.thirtyfive_kg || 0;
      const empty = row.original.empty_thirtyfive_kg || 0;
      return (
        <div className='text-center'>
          {filled} / {empty}
        </div>
      );
    },
  },
  {
    accessorKey: 'fourtyfive_kg',
    header: () => <div className='text-center'>45 KG</div>,
    cell: ({ row }) => {
      const filled = row.original.fourtyfive_kg || 0;
      const empty = row.original.empty_fourtyfive_kg || 0;
      return (
        <div className='text-center'>
          {filled} / {empty}
        </div>
      );
    },
  },
  {
    accessorKey: 'others_kg',
    header: () => <div className='text-center'>Others</div>,
    cell: ({ row }) => {
      const filled = row.original.others_kg || 0;
      const empty = row.original.empty_others_kg || 0;
      return (
        <div className='text-center'>
          {filled} / {empty}
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Price <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className='text-start'>{row.getValue('price')} TK</div>,
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
    accessorKey: 'due',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Due <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className='text-start'>{row.getValue('due')} TK</div>,
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
