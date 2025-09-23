import { Button } from '@/components/ui/button';
import { ArrowUpDown, SquarePen, Trash, Settings2 } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const columns = ({ setSingleData, constHandelDelete, setOpenModal }) => [
  {
    id: 'select',
    header: () => <div className='text-center'>Index</div>,
    cell: ({ row }) => <div className='text-center'>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: () => <div className='flex justify-center items-center'>Name</div>,
    cell: ({ row }) => <div className='justify-center items-center text-center'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'todal_buy',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Total Buy
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      let data = row.getValue('todal_buy') ?? 0;
      return <div>{data} TK</div>;
    },
  },
  {
    accessorKey: 'total_pay',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Total Pay
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('total_pay')} TK</div>,
  },
  {
    accessorKey: 'due',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Total Due
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('due')} TK</div>,
  },

  {
    id: 'actions',
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const [data, setData] = useState(null);
      return (
        <div>
          <ToggleGroup variant='outline' type='single'>
            <Link to={`/admin/customer/${row.original.id}`}>
              <ToggleGroupItem className='cursor-pointer' value='settings' aria-label='Customer details'>
                <Settings2 width={20} height={20} />
              </ToggleGroupItem>
            </Link>
          </ToggleGroup>
        </div>
      );
    },
  },
];

export default columns;
