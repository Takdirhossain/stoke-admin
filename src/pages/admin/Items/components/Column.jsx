import { Button } from '@/components/ui/button';
import { ArrowUpDown, SquarePen, Trash, Settings2 } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import EditModal from './EditModal';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { API_URL } from '@/config/config';

const columns = ({ setSingleData, constHandelDelete, setOpenModal }) => [
  {
    id: 'select',
    header: () => <div className="text-center">Index</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: () => <div className="">Name</div>,
    cell: ({ row }) => (
      <div className="">
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: () => <div className="">Price</div>,
    cell: ({ row }) => <div>{row.getValue('price')} TK</div>,
  },
  {
    accessorKey: 'type',
    header: () => <div className="">Type</div>,
    cell: ({ row }) =>{
      let data = row?.original?.is_cylinder
      console.log(data);
      return <div>{data == true? 'Cylinder' : 'Accessories'}</div>
    },
  },
  {
    accessorKey: 'image',
    header: () => <div className="">Image</div>,
    cell: ({ row }) =>{
      let data = row?.original?.image
      console.log(data);
      return <div><img className='w-20 h-20' src={ API_URL + "/" + data} alt="" /></div>
    },
  },



  {
    id: 'actions',
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const [data, setData] = useState(null);
      return (
        <div>
          <ToggleGroup variant="outline" type="single">
            <Dialog>
              <DialogTrigger asChild>
                <ToggleGroupItem
                  value="edit"
                  aria-label="Edit user"
                  onClick={() => setData(row)}
                >
                  <SquarePen className="h-4 w-4" />
                </ToggleGroupItem>
              </DialogTrigger>
              <EditModal  />
            </Dialog>

            <ToggleGroupItem
              className="cursor-pointer"
              value="delete"
              aria-label="Delete user"
              onClick={() => constHandelDelete(row.original.id)}
            >
              <Trash width={20} height={20} />
            </ToggleGroupItem>

            <ToggleGroupItem
              className="cursor-pointer"
              value="settings"
              aria-label="Customer details"
            >
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
