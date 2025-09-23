import { Button } from '@/components/ui/button';
import { ArrowUpDown, SquarePen, Trash, Settings2 } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import EditModal from './EditModal';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
    accessorKey: 'phone',
    header: () => <div className='flex justify-center items-center'>Phone</div>,
    cell: ({ row }) => <div className='justify-center items-center text-center'>{row.getValue('phone')}</div>,
  },
  {
    accessorKey: 'address',
    header: () => <div className='flex justify-center items-center'>Address</div>,
    cell: ({ row }) => <div className='justify-center items-center text-center'>{row.getValue('address')}</div>,
  },
  {
    accessorKey: 'total_purchase',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Total Buy
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('total_purchase')} TK</div>,
  },
  {
    accessorKey: 'total_paid',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Total Pay
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('total_paid')} TK</div>,
  },
  {
    accessorKey: 'total_due',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Total Due
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('total_due')} TK</div>,
  },

  // 🔹 Cylinder variants using accessorFn
  {
    header: '12 KG',
    accessorFn: (row) => `${row.purchase_cylinders?.twelve_kg || 0}/${row.empty_cylinders?.empty_twelve_kg || 0}`,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  },
  {
    header: '25 KG',
    accessorFn: (row) => `${row.purchase_cylinders?.twentyfive_kg || 0}/${row.empty_cylinders?.empty_twentyfive_kg || 0}`,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  },
  {
    header: '33 KG',
    accessorFn: (row) => `${row.purchase_cylinders?.thirtythree_kg || 0}/${row.empty_cylinders?.empty_thirtythree_kg || 0}`,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  },
  {
    header: '35 KG',
    accessorFn: (row) => `${row.purchase_cylinders?.thirtyfive_kg || 0}/${row.empty_cylinders?.empty_thirtyfive_kg || 0}`,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  },
  {
    header: '45 KG',
    accessorFn: (row) => `${row.purchase_cylinders?.fourtyfive_kg || 0}/${row.empty_cylinders?.empty_fourtyfive_kg || 0}`,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  },

  {
    id: 'actions',
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const [data, setData] = useState(null);
      return (
        <div>
          <ToggleGroup variant='outline' type='single'>
            <ToggleGroupItem value='edit' aria-label='Edit user' onClick={() => setData(row?.original)}>
              <Dialog>
                <DialogTrigger asChild>
                 <button  > <SquarePen width={20} height={20} /></button>
                </DialogTrigger>
               {data &&  <EditModal data={data} />}
              </Dialog>
            </ToggleGroupItem>

            <ToggleGroupItem className='cursor-pointer' value='delete' aria-label='Delete user' onClick={() => constHandelDelete(row.original.id)}>
              <Trash width={20} height={20} />
            </ToggleGroupItem>

            <ToggleGroupItem className='cursor-pointer' value='settings' aria-label='Customer details'>
              <Link to={`/admin/customer/${row.original.id}`}>
                <Settings2 width={20} height={20} />
              </Link>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      );
    },
  },
];

export default columns;
