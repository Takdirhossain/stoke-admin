import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import API from '@/config/config';
import { useQueryClient } from '@tanstack/react-query';
import { DialogContent } from '@/components/ui/dialog';

export default function EditModal({ data }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const queryClient = useQueryClient();

  // Pre-fill form when singleData changes
  useEffect(() => {
    if (data) {
      setValue('id', data.id);
      setValue('name', data.name || '');
      setValue('phone', data.phone || '');
      setValue('address', data.address || '');
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    await toast.promise(
      API.post('/api/customers', formData),
      {
        loading: 'Saving...',
        success: 'Customer updated successfully!',
        error: (error) => error.response?.data?.message || 'Something went wrong',
      }
    );

    queryClient.invalidateQueries({ queryKey: ['customer'] });
    reset();
  };

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden ID field */}
        <input type="hidden" {...register('id')} />

        {/* Customer Name */}
        <div className="mt-4">
          <InputField
            label="Customer Name"
            id="name"
            type="text"
            placeholder="Enter customer name"
            register={register}
            error={errors.name}
            validation={{ required: 'Customer Name is required' }}
          />
        </div>

        {/* Phone */}
        <div className="mt-4">
          <InputField
            label="Phone"
            id="phone"
            type="number"
            placeholder="Enter phone number"
            register={register}
            error={errors.phone}
          />
        </div>

        {/* Address */}
        <div className="mt-4">
          <InputField
            label="Address"
            id="address"
            type="text"
            placeholder="Enter address"
            register={register}
            error={errors.address}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary-light cursor-pointer font-semibold w-full"
        >
          <Save className="mr-2" /> {isSubmitting ? 'Submitting...' : 'Save Changes'}
        </Button>
      </form>
    </DialogContent>
  );
}
