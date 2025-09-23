import { useState } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import TableLoading from './TableLoading';
import { Checkbox } from '@/components/ui/checkbox';
import ColumnVisibilityDropdown from './columnVisibal';
import { Input } from '../ui/input';

export function DataTable({ columns, data, links, setPage, page, isLoading, isError, error, searchTerm, setSearchTerm, isShowSearch = true }) {
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
  });

  const getPage = (url, isActive) => {
    if (!url || isActive) return;
    try {
      const urlObject = new URL(url);
      const pageParam = urlObject.searchParams.get('page');
      const pageNumber = parseInt(pageParam, 10);
      if (!isNaN(pageNumber) && pageNumber !== page) setPage(pageNumber);
    } catch (e) {
      console.error('Invalid URL:', url);
    }
  };

  return (
    <div>
      {isShowSearch && <div className='flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-2 w-full'>
        <div className='w-full md:w-auto flex-1'>
          <Input className='w-full md:max-w-sm' placeholder='Search ...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className='w-full md:w-auto flex justify-start md:justify-end'>
          <ColumnVisibilityDropdown table={table} />
        </div>
      </div>}

      {/* Table */}
      <div className='rounded-md border'>
        {isLoading ? (
          <div className='p-4 text-center'>
            <TableLoading columns={10} />
          </div>
        ) : isError ? (
          <div className='p-4 text-center text-red-500'>{error?.message ?? 'Error loading data.'}</div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {links && links.length > 3 && (
        <div className='flex justify-end py-4'>
          <Pagination>
            <PaginationContent>
              {links.map((link, i) => (
                <PaginationItem key={i}>
                  <PaginationLink className={`cursor-pointer ${link.active ? 'bg-slate-100 pointer-events-none opacity-50' : ''}`} onClick={() => getPage(link.url, link.active)}>
                    {link.label.includes('Previous') ? <ChevronsLeft size={16} /> : link.label.includes('Next') ? <ChevronsRight size={16} /> : link.label.replace(/&[^;]+;/g, '')}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
