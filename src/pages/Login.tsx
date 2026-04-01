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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OTPVerification, { type OtpFormData } from '@/components/auth/OTPVerification';
import BasicDetailsForm, { type DetailsFormData } from '@/components/auth/BasicDetailsForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
// import { updateProfile, getUserProfile } from '@/service/api'; // Removed to use fabclean only during login
import { generateOTP, verifyFabkleanOTP, STORES, FABKLEAN_TOKEN, updateFabkleanProfile } from '@/service/fabklean';

// Step 1: Mobile number and Store schema
const mobileSchema = z.object({
  mobileNumber: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .regex(/^[0-9]+$/, 'Mobile number must contain only digits'),
  storeId: z.string().min(1, 'Please select a store'),
});

type MobileFormData = z.infer<typeof mobileSchema>;

const Login = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const { login, token, user, storeId } = useAuth();
  const navigate = useNavigate();

  // Step 1: Mobile number form
  const mobileForm = useForm<MobileFormData>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobileNumber: '',
      storeId: '',
    },
  });

  const onMobileSubmit = async (data: MobileFormData) => {
    try {
      const response = await generateOTP(data.storeId, data.mobileNumber);
      setMobileNumber(data.mobileNumber);
      setSelectedStoreId(data.storeId);

      toast({
        title: 'OTP Sent',
        description: `An OTP has been sent to ${data.mobileNumber}${response.verificationCode ? `. Debug Code: ${response.verificationCode}` : ''}`,
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
      const response = await verifyFabkleanOTP(selectedStoreId, mobileNumber, data.otp);

      if (!response.userInfo) {
        throw new Error('Invalid verification response');
      }

      const userInfo = response.userInfo;

      // Map Fabklean user info to frontend format
      // If name is the same as phoneNumber, it's likely a new account that needs profile setup
      const isNewUser = !userInfo.firstName || userInfo.firstName === userInfo.phoneNumber || userInfo.name === userInfo.phoneNumber;

      const mappedUser = {
        id: userInfo.id.toString(),
        name: userInfo.name || '',
        email: userInfo.email || '',
        mobileNumber: userInfo.phoneNumber || mobileNumber,
        photo: userInfo.idCardUrl || '',
      };

      // Use the Fabklean token for subsequent requests
      login(mappedUser, FABKLEAN_TOKEN, selectedStoreId);

      if (isNewUser) {
        toast({
          title: 'OTP Verified',
          description: 'Please complete your profile to continue.',
        });
        setStep(3);
      } else {
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${mappedUser.name}!`,
        });
        navigate('/');
      }

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
      // Create local user representation from the form data
      const updatedUser = {
        id: user?.id || Date.now().toString(),
        name: data.name,
        email: data.email || '',
        mobileNumber: mobileNumber || user?.mobileNumber || '',
        photo: user?.photo || '',
      };

      // Update Fabklean profile with the new data
      const currentStoreId = storeId || selectedStoreId;
      if (user?.id && currentStoreId) {
        await updateFabkleanProfile(user.id, currentStoreId, updatedUser);
      }

      // Update local auth context with the new data
      login(updatedUser, token, currentStoreId);

      toast({
        title: 'Profile Setup Complete',
        description: `Welcome, ${data.name}!`,
      });
      navigate('/');
    } catch (error) {
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                >
                  1
                </div>
                <div
                  className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}
                />
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                >
                  2
                </div>
                <div
                  className={`w-16 h-1 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}
                />
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                >
                  3
                </div>
              </div>
            </div>

            {/* Step 1: Mobile Number & Store Selection */}
            {step === 1 && (
              <Form {...mobileForm}>
                <form onSubmit={mobileForm.handleSubmit(onMobileSubmit)} className="space-y-6">
                  <FormField
                    control={mobileForm.control}
                    name="storeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Store</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a store" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STORES.map((store) => (
                              <SelectItem key={store.id} value={store.id}>
                                {store.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
