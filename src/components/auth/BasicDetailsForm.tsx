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

export type DetailsFormData = z.infer<typeof detailsSchema> & {
  photoFile?: File | null;
};

interface BasicDetailsFormProps {
  onSubmit: (data: DetailsFormData) => void;
  onBack: () => void;
}

const BasicDetailsForm: React.FC<BasicDetailsFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const detailsForm = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: '',
      email: '',
      photoFile: null,
    },
  });

  // Cleanup object URL on unmount or when photo changes
  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - backend only accepts JPEG, JPG, PNG
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a JPEG, JPG, or PNG image file',
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
    
    // Cleanup previous object URL if exists
    if (photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }
    
    // Store file for upload (multipart, not base64)
    setPhotoFile(file);
    
    // Create preview using object URL (for display only)
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreview(objectUrl);
    detailsForm.setValue('photoFile', file);
  };

  const handleSubmit = (data: DetailsFormData) => {
    onSubmit({
      ...data,
      photoFile: photoFile, // Use state variable instead of form data
    });
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
                accept="image/jpeg,image/jpg,image/png"
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
              Max size: 5MB. JPEG, JPG, or PNG
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

