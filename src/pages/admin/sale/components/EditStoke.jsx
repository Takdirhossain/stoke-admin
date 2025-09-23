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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditStoke() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isPackage, setIsPackage] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm();
  const date = watch('date');

  // Prefill data from react-query cache
  // useEffect(() => {
  //   console.log(id, "fff");
  //   const cachedData = queryClient.getQueryData(['products', 1, ""]);

  //   console.log(cachedData, "cachedData");
  //   if (cachedData) {
  //     Object.keys(cachedData).forEach((key) => {
  //       if (key === 'date' && cachedData[key]) setValue('date', new Date(cachedData[key]));
  //       else setValue(key, cachedData[key]);
  //     });
  //     setIsPackage(cachedData.is_package);
  //   }
  // }, [id, queryClient, setValue]);
  useEffect(() => {
    const res = API.get(`/api/products/${id}`);
    
  },[])

  const onSubmit = async (data) => {
    const payload = { ...data, date: data.date ? format(data.date, 'yyyy-MM-dd') : null, is_package: isPackage };
    await toast.promise(API.put(`/api/products/${id}`, payload), {
      loading: 'Updating...',
      success: (res) => {
        toast.success(res.data?.message || 'Stock updated successfully!');
        queryClient.invalidateQueries({ queryKey: ['products'] });
        navigate('/admin/stoke');
      },
      error: (err) => toast.error(err.response?.data?.message || 'Something went wrong'),
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Stoke</CardTitle>
        <CardDescription>Update stock entry</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {/* Cylinder fields */}
          <InputField id="twelve_kg" type="number" label="12 KG" register={register} error={errors.twelve_kg} />
          <InputField id="twentyfive_kg" type="number" label="25 KG" register={register} error={errors.twentyfive_kg} />
          <InputField id="thirtythree_kg" type="number" label="33 KG" register={register} error={errors.thirtythree_kg} />
          <InputField id="thirtyfive_kg" type="number" label="35 KG" register={register} error={errors.thirtyfive_kg} />
          <InputField id="fourtyfive_kg" type="number" label="45 KG" register={register} error={errors.fourtyfive_kg} />
          <InputField id="others_kg" type="number" label="Others KG" register={register} error={errors.others_kg} />

          {/* Empty cylinders */}
          <InputField id="empty_twelve_kg" type="number" label="Empty 12 KG" register={register} error={errors.empty_twelve_kg} />
          <InputField id="empty_twentyfive_kg" type="number" label="Empty 25 KG" register={register} error={errors.empty_twentyfive_kg} />
          <InputField id="empty_thirtythree_kg" type="number" label="Empty 33 KG" register={register} error={errors.empty_thirtythree_kg} />
          <InputField id="empty_thirtyfive_kg" type="number" label="Empty 35 KG" register={register} error={errors.empty_thirtyfive_kg} />
          <InputField id="empty_fourtyfive_kg" type="number" label="Empty 45 KG" register={register} error={errors.empty_fourtyfive_kg} />
          <InputField id="empty_others_kg" type="number" label="Empty Others KG" register={register} error={errors.empty_others_kg} />

          {/* Price */}
          <InputField id="price" type="number" label="Price" register={register} error={errors.price} />

          {/* Date picker */}
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="outline" className="justify-start text-left font-normal w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(new Date(date), 'dd-MM-yyyy') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Calendar
                  mode="single"
                  selected={date || undefined}
                  onSelect={(val) => setValue('date', val)}
                  initialFocus
                  className="rounded-md border shadow-md w-full"
                  dayClassName={(day) =>
                    date && format(day, 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd') ? 'bg-blue-500 text-white rounded-full' : ''
                  }
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </div>

          {/* Is Package */}
          <div className="flex gap-2 items-center">
            <Label>Is Package?</Label>
            <Switch checked={isPackage} onCheckedChange={setIsPackage} />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Update
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
