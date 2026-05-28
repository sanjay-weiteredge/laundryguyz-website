import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ArrowLeft, ArrowRight, Camera, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Basic details schema
const detailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
});

export type DetailsFormData = z.infer<typeof detailsSchema>;

interface BasicDetailsFormProps {
  onSubmit: (data: DetailsFormData) => void;
  onBack: () => void;
}

const BasicDetailsForm: React.FC<BasicDetailsFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const detailsForm = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const handleSubmit = (data: DetailsFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...detailsForm}>
      <form onSubmit={detailsForm.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={detailsForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={detailsForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit" className="flex-1" size="lg">
            Complete Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BasicDetailsForm;

