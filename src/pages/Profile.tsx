import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { User, Mail, Phone, Save, Camera } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  mobileNumber: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .regex(/^[0-9]+$/, 'Mobile number must contain only digits'),
  photo: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, login } = useAuth();
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.photo || null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      mobileNumber: user?.mobileNumber || '',
      photo: user?.photo || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        mobileNumber: user.mobileNumber || '',
        photo: user.photo || '',
      });
      setPhotoPreview(user.photo || null);
    }
  }, [user, form]);

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
        form.setValue('photo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    if (user) {
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email || undefined,
        mobileNumber: data.mobileNumber,
        photo: data.photo || undefined,
      };
      login(updatedUser);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Not Authenticated</CardTitle>
              <CardDescription>Please log in to view your profile.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Photo Upload */}
                  <FormItem>
                    <FormLabel className="text-center block">Profile Photo</FormLabel>
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={photoPreview || ''} alt={user?.name || 'Profile'} />
                        <AvatarFallback className="text-2xl">
                          {user?.name
                            ?.split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase() || <User className="h-8 w-8" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                          id="profile-photo-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('profile-photo-upload')?.click()}
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
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </FormLabel>
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

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your mobile number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

