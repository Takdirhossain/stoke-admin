import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Save, CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import API from '@/config/config';
import { useQueryClient } from '@tanstack/react-query';
import InputField from '@/components/form/InputField';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AddSale() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const queryClient = useQueryClient();
  const [isPackage, setIsPackage] = useState(false);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  // qty and price fields mapping
  const fields = [
    { qty: 'twelve_kg', price: 'price_12_kg' },
    { qty: 'twentyfive_kg', price: 'price_25_kg' },
    { qty: 'thirtythree_kg', price: 'price_33_kg' },
    { qty: 'thirtyfive_kg', price: 'price_35_kg' },
    { qty: 'fourtyfive_kg', price: 'price_45_kg' },
  ];

  const watchedValues = watch(fields.flatMap((f) => [f.qty, f.price]));
  const pay = watch('pay') || 0;
  const totalPrice = watch('price') || 0;

  useEffect(() => {
    let total = 0;
    fields.forEach((f) => {
      const qty = Number(watch(f.qty)) || 0;
      const unitPrice = Number(watch(f.price)) || 0;
      total += qty * unitPrice;
    });

    if (watch('price') !== total) {
      setValue('price', total);
    }
  }, [watchedValues, setValue]);

  useEffect(() => {
    const due = (Number(totalPrice) || 0) - (Number(pay) || 0);
    setValue('due', due >= 0 ? due : 0);
  }, [pay, totalPrice, setValue]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await API.get('api/customers/all-customers');
      const responseData = response.data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setCustomer(responseData);
    };
    fetchCustomers();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formattedDate = data.date ? format(data.date, 'yyyy-MM-dd') : null;
      const payload = {
        ...data,
        date: formattedDate,
        is_package: isPackage,
        customer: selectedCustomer,
      };
      if (!payload.date) {
        toast.error('Date is required');
        return;
      }
      if (!payload.customer) {
        toast.error('Customer is required');
        return;
      }
      if (!payload.price) {
        toast.error('Total Price is required');
        return;
      }


      await toast.promise(API.post('/api/sales', payload), {
        loading: 'Saving...',
        success: () => {
          toast.success('Stock saved successfully!');
          queryClient.invalidateQueries({ queryKey: ['products'] });
          reset();
          // navigate('/admin/stoke');
        },
        error: (err) => {
          toast.error(err.response?.data?.message || 'Something went wrong');
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const date = watch('date');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
        {/* Quantity + Price Fields */}
        <InputField id='twelve_kg' type='number' className='bg-white' label='12 KG' register={register} error={errors.twelve_kg} />
        <InputField id='empty_twelve_kg' type='number' className='bg-white' label='Empty 12 KG' register={register} error={errors.empty_twelve_kg} />
        <InputField id='price_12_kg' type='number' className='bg-white' label='Unit Price 12 KG' register={register} error={errors.price_12_kg} />

        <InputField id='twentyfive_kg' type='number' className='bg-white' label='25 KG' register={register} error={errors.twentyfive_kg} />
        <InputField id='empty_twentyfive_kg' type='number' className='bg-white' label='Empty 25 KG' register={register} error={errors.empty_twentyfive_kg} />
        <InputField id='price_25_kg' type='number' className='bg-white' label='Unit Price 25 KG' register={register} error={errors.price_25_kg} />

        <InputField id='thirtythree_kg' type='number' className='bg-white' label='33 KG' register={register} error={errors.thirtythree_kg} />
        <InputField id='empty_thirtythree_kg' type='number' className='bg-white' label='Empty 33 KG' register={register} error={errors.empty_thirtythree_kg} />
        <InputField id='price_33_kg' type='number' className='bg-white' label='Unit Price 33 KG' register={register} error={errors.price_33_kg} />

        <InputField id='thirtyfive_kg' type='number' className='bg-white' label='35 KG' register={register} error={errors.thirtyfive_kg} />
        <InputField id='empty_thirtyfive_kg' type='number' className='bg-white' label='Empty 35 KG' register={register} error={errors.empty_thirtyfive_kg} />
        <InputField id='price_35_kg' type='number' className='bg-white' label='Unit Price 35 KG' register={register} error={errors.price_35_kg} />

        <InputField id='fourtyfive_kg' type='number' className='bg-white' label='45 KG' register={register} error={errors.fourtyfive_kg} />
        <InputField id='empty_fourtyfive_kg' type='number' className='bg-white' label='Empty 45 KG' register={register} error={errors.empty_fourtyfive_kg} />
        <InputField id='price_45_kg' type='number' className='bg-white' label='Unit Price 45 KG' register={register} error={errors.price_45_kg} />

        {/* Total Price (ReadOnly) */}
        <InputField id='price' type='number' className='bg-gray-100' label='Total Price' register={register} error={errors.price} readOnly />

        {/* Pay */}
        <InputField id='pay' type='number' className='bg-white' label='Pay' register={register} error={errors.pay} />

        {/* Due (ReadOnly) */}
        <InputField id='due' type='number' className='bg-gray-100' label='Due' register={register} error={errors.due} readOnly />
      </CardContent>

      {/* Date & Package */}
      <div className='mx-6 flex gap-6'>
        <div className='flex flex-col gap-2 min-w-[200px]'>
          <label className='text-sm font-medium'>Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button type='button' variant='outline' className='justify-start text-left font-normal w-full'>
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(new Date(date), 'dd-MM-yyyy') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='p-0'>
              <Calendar mode='single' selected={date ? new Date(date) : null} onSelect={(val) => setValue('date', val)} initialFocus className='rounded-md border shadow-md w-full' />
            </PopoverContent>
          </Popover>
          {errors.date && <p className='text-sm text-red-500'>{errors.date.message}</p>}
        </div>

        <div className='flex gap-2 items-center'>
          <Label>Is Package?</Label>
          <Switch checked={isPackage} onCheckedChange={setIsPackage} />
        </div>
      </div>

      {/* Customer Select */}
      <div className='mt-4 mx-6'>
        <Label className='mb-2'>Customer</Label>
        <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={customer} onChange={(val) => setSelectedCustomer(val)} />
      </div>

      <CardFooter className='flex justify-end mt-4'>
        <Button type='submit' disabled={isSubmitting} className='flex items-center gap-2'>
          <Save className='w-4 h-4' /> Save
        </Button>
      </CardFooter>
    </form>
  );
}
