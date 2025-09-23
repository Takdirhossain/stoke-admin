import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import columns from './components/Column';
import AddModal from './components/AddCollection';
import { DataTable } from '@/components/common/data-table';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import API from '@/config/config';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AddCollection from './components/AddCollection';

export default function Collection() {
  const [openModal, setOpenModal] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [page, setPage] = useState(1);
  const [parPage, setParPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page, searchTerm],
    queryFn: async () => {
      const response = await API.put(`api/sales/collectionList`, {
        params: {
          page,
          per_page: parPage,
          search: searchTerm,
        },
      });
      return response.data;
    },
    keepPreviousData: true,
  });


  const constHandelDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(API.delete(`/admin/categories/${id}`), {
          loading: 'Deleting...',
          success: (data) => data.message || 'Deleted successfully!',
          error: (error) => error.response.data.message,
        });
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      }
    });
  };
  return (
    <>
      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-semibold'>Sale Management</h2>
            <p className='text-sm text-muted-foreground'>Manage your Sale</p>
          </div>
          <Button onClick={() => setOpenModal(true)}>Add Collection</Button>
        </div>

        <div className='py-6'>
          <div className='overflow-hidden rounded-md '>
            <DataTable
              columns={columns({
                setSingleData,
                constHandelDelete,
                setOpenModal,
              })}
              data={data?.data?.data ?? []}
              links={data?.data?.links ?? []}
              setPage={setPage}
              page={page}
              isLoading={isLoading}
              isError={isError}
              error={error}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>
      </div>

      {openModal && <AddCollection openModal={openModal} setOpenModal={setOpenModal} title={singleData?.id ? 'Edit Customer' : 'Add Customer'} singleData={singleData} setSingleData={setSingleData} />}
    </>
  );
}
