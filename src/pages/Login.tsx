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
  const { login } = useAuth();
  const navigate = useNavigate();

  // Step 1: Mobile number form
  const mobileForm = useForm<MobileFormData>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobileNumber: '',
    },
  });

  const onMobileSubmit = (data: MobileFormData) => {
    // In a real app, you would send OTP to the mobile number here
    // For now, we'll just simulate it
    setMobileNumber(data.mobileNumber);
    toast({
      title: 'OTP Sent',
      description: `OTP has been sent to ${data.mobileNumber}`,
    });
    setStep(2);
  };

  const handleOtpVerify = (data: OtpFormData) => {
    // In a real app, you would verify the OTP with the backend
    // For now, we'll accept any 4-digit OTP
    if (data.otp.length === 4) {
      toast({
        title: 'OTP Verified',
        description: 'OTP verified successfully',
      });
      setStep(3);
    } else {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid 4-digit OTP',
        variant: 'destructive',
      });
    }
  };

  const handleDetailsSubmit = (data: DetailsFormData) => {
    // Create user object and login
    const user = {
      id: `user_${Date.now()}`,
      mobileNumber,
      name: data.name,
      email: data.email || undefined,
      photo: data.photo || undefined,
    };

    login(user);
    toast({
      title: 'Login Successful',
      description: `Welcome, ${data.name}!`,
    });
    navigate('/');
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
