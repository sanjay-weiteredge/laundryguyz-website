import React, { useState } from 'react';
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
  photo: z.string().optional(),
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
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const detailsForm = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: '',
      email: '',
      photo: '',
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload an image file (JPG, PNG, or GIF)',
          variant: 'destructive',
        });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Please upload an image smaller than 5MB',
          variant: 'destructive',
        });
        return;
      }
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoPreview(base64String);
        detailsForm.setValue('photo', base64String);
      };
      reader.onerror = () => {
        toast({
          title: 'Error',
          description: 'Failed to read the image file',
          variant: 'destructive',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data: DetailsFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...detailsForm}>
      <form onSubmit={detailsForm.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Photo Upload */}
        <FormItem>
          <FormLabel>Profile Photo (Optional)</FormLabel>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={photoPreview || ''} alt="Profile" />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="photo-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <Camera className="mr-2 h-4 w-4" />
                {photoPreview ? 'Change Photo' : 'Upload Photo'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Max size: 5MB. JPG, PNG, or GIF
            </p>
          </div>
        </FormItem>

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
              <FormLabel>Email (Optional)</FormLabel>
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

