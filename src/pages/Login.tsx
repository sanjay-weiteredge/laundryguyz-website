import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import OTPVerification, { type OtpFormData } from '@/components/auth/OTPVerification';
import BasicDetailsForm, { type DetailsFormData } from '@/components/auth/BasicDetailsForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
import { sendOTP, verifyOTP, updateProfile, getUserProfile } from '@/service/api';

// Step 1: Mobile number schema
const mobileSchema = z.object({
  mobileNumber: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .regex(/^[0-9]+$/, 'Mobile number must contain only digits'),
});

type MobileFormData = z.infer<typeof mobileSchema>;

const Login = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const { login, token } = useAuth();
  const navigate = useNavigate();

  // Step 1: Mobile number form
  const mobileForm = useForm<MobileFormData>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobileNumber: '',
    },
  });

  const onMobileSubmit = async (data: MobileFormData) => {
    try {
      await sendOTP(data.mobileNumber);
      setMobileNumber(data.mobileNumber);
      toast({
        title: 'OTP Sent',
        description: `An OTP has been sent to ${data.mobileNumber}`,
      });
      setStep(2);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send OTP',
        variant: 'destructive',
      });
    }
  };

  const handleOtpVerify = async (data: OtpFormData) => {
    try {
      const response = await verifyOTP(mobileNumber, data.otp);
      
      // Determine if new user - backend may not send isNewUser flag
      // Check if user has name or email to determine if profile is complete
      const isNewUser = response.isNewUser ?? (!response.user.name && !response.user.email);
      
      // For existing users, fetch complete profile data including image URL
      if (!isNewUser && response.token) {
        try {
          const profileData = await getUserProfile(response.token);
          const mappedUser = {
            id: profileData.id,
            name: profileData.name || '',
            email: profileData.email || '',
            mobileNumber: profileData.phone_number || mobileNumber,
            photo: profileData.image || '',
          };
          login(mappedUser, response.token);
          
          toast({
            title: 'Login Successful',
            description: `Welcome back, ${mappedUser.name || 'User'}!`,
          });
          navigate('/');
          return;
        } catch (profileError) {
          // Fallback to response data if profile fetch fails
          console.error('Error fetching profile:', profileError);
        }
      }
      
      // Map backend user data to frontend format (for new users or if profile fetch failed)
      const mappedUser = {
        id: response.user.id,
        name: response.user.name || '',
        email: response.user.email || '',
        mobileNumber: response.user.phone_number || mobileNumber,
        photo: response.user.image || '',
      };
      
      login(mappedUser, response.token);

      // If new user, show basic details form
      toast({
        title: 'OTP Verified',
        description: 'Please complete your profile to continue.',
      });
      setStep(3);

    } catch (error) {
      toast({
        title: 'Verification Failed',
        description: error.message || 'Failed to verify OTP',
        variant: 'destructive',
      });
    }
  };

  const handleDetailsSubmit = async (data: DetailsFormData) => {
    if (!token) {
      toast({
        title: 'Error',
        description: 'Please log in to complete your profile',
        variant: 'destructive',
      });
      return;
    }

    try {
      const profileData: { name?: string; email?: string } = {};
      
      if (data.name) {
        profileData.name = data.name;
      }
      if (data.email) {
        profileData.email = data.email || undefined;
      }

      // Call API to update profile
      await updateProfile(
        token,
        profileData,
        data.photoFile || undefined
      );

      // Fetch updated profile from API to get complete data including image URL
      const profileDataResponse = await getUserProfile(token);
      
      // Map backend response to frontend format
      const updatedUser = {
        id: profileDataResponse.id,
        name: profileDataResponse.name || '',
        email: profileDataResponse.email || '',
        mobileNumber: profileDataResponse.phone_number || mobileNumber,
        photo: profileDataResponse.image || '',
      };

      // Update auth context with updated profile
      login(updatedUser, token);

      toast({
        title: 'Profile Setup Complete',
        description: `Welcome, ${data.name}!`,
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="container-custom py-16 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Login</h1>
              <p className="text-muted-foreground">
                {step === 1 && 'Enter your mobile number to get started'}
                {step === 2 && 'Enter the OTP sent to your mobile number'}
                {step === 3 && 'Complete your profile'}
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  1
                </div>
                <div
                  className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}
                />
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  2
                </div>
                <div
                  className={`w-16 h-1 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}
                />
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  3
                </div>
              </div>
            </div>

            {/* Step 1: Mobile Number */}
            {step === 1 && (
              <Form {...mobileForm}>
                <form onSubmit={mobileForm.handleSubmit(onMobileSubmit)} className="space-y-6">
                  <FormField
                    control={mobileForm.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your mobile number"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg">
                    Send OTP
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <OTPVerification
                mobileNumber={mobileNumber}
                onVerify={handleOtpVerify}
                onBack={() => setStep(1)}
              />
            )}

            {/* Step 3: Basic Details */}
            {step === 3 && (
              <BasicDetailsForm
                onSubmit={handleDetailsSubmit}
                onBack={() => setStep(2)}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
