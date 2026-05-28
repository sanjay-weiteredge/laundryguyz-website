import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
import { User, Mail, Phone, Save, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState, useRef } from 'react';
// import { getUserProfile, updateProfile } from '@/service/api'; // Removed to use fabclean
import { getFabkleanProfile, updateFabkleanProfile } from '@/service/fabklean';

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
  const { user, token, storeId, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const hasFetchedRef = useRef(false);
  const previousTokenRef = useRef<string | null>(null);



  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      mobileNumber: user?.mobileNumber || '',
    },
  });

  // Fetch profile from API ONLY ONCE on mount (when token changes)
  useEffect(() => {
    if (!token) return;

    // Prevent multiple fetches - only fetch once per token
    if (hasFetchedRef.current) return;

    // Reset flag when token changes
    if (previousTokenRef.current !== token) {
      hasFetchedRef.current = false;
      previousTokenRef.current = token;
    }

    const fetchProfile = async () => {
      // Double check to prevent race conditions
      if (hasFetchedRef.current) return;
      hasFetchedRef.current = true;

      setIsFetching(true);
      try {
        if (!user?.id || !storeId) return;
        const profileResponse = await getFabkleanProfile(user.id, storeId);
        const userInfo = profileResponse.userInfo;
        // Map backend fields to frontend format
        const mappedUser = {
          id: userInfo.id.toString(),
          name: userInfo.firstName || userInfo.name || '',
          email: userInfo.email || '',
          mobileNumber: userInfo.phoneNumber || '',
        };

        form.reset({
          name: mappedUser.name,
          email: mappedUser.email,
          mobileNumber: mappedUser.mobileNumber,
        });

        // Only update auth context if data is different (avoid overwriting recent updates)
        // This prevents overwriting profile updates made during login flow
        if (!user ||
          user.name !== mappedUser.name ||
          user.email !== mappedUser.email) {
          login(mappedUser, token, storeId || '');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch profile',
          variant: 'destructive',
        });
        hasFetchedRef.current = false; // Allow retry on error
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user?.id, storeId]);

  // Update form when user changes from other sources
  useEffect(() => {
    if (user && !isFetching && hasFetchedRef.current) {
      // Update form with latest user data
      form.reset({
        name: user.name || '',
        email: user.email || '',
        mobileNumber: user.mobileNumber || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name, user?.email, user?.mobileNumber, isFetching]);



  const onSubmit = async (data: ProfileFormData) => {
    if (!user || !token) {
      toast({
        title: 'Error',
        description: 'Please log in to update your profile',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const profileData: { name?: string; email?: string } = {};

      if (data.name !== user.name) {
        profileData.name = data.name;
      }
      if (data.email !== user.email) {
        profileData.email = data.email || undefined;
      }

      // Call API to update profile
      const updateResponse = await updateFabkleanProfile(
        user.id,
        storeId,
        data
      );

      const userInfo = updateResponse.userInfo;

      // Map backend response to frontend format
      const updatedUser = {
        id: userInfo.id.toString(),
        name: userInfo.firstName || userInfo.name || '',
        email: userInfo.email || '',
        mobileNumber: userInfo.phoneNumber || user.mobileNumber,
      };

      // Update auth context
      login(updatedUser, token, storeId || '');

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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

  if (isFetching) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="py-16 text-center">
              <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading profile...</p>
            </CardContent>
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
                            disabled
                            className="bg-muted"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">
                          Mobile number cannot be changed
                        </p>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={isLoading || isFetching}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
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

