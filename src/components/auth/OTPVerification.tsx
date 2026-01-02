import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// OTP schema
const otpSchema = z.object({
  otp: z.string().length(4, 'OTP must be 4 digits'),
});

export type OtpFormData = z.infer<typeof otpSchema>;

interface OTPVerificationProps {
  mobileNumber: string;
  onVerify: (data: OtpFormData) => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  mobileNumber,
  onVerify,
  onBack,
}) => {
  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const handleSubmit = (data: OtpFormData) => {
    onVerify(data);
  };

  return (
    <Form {...otpForm}>
      <form onSubmit={otpForm.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={otpForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter OTP</FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={4}
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                      // Auto-submit when 6 digits are entered
                      if (value.length === 4) {
                        setTimeout(() => {
                          otpForm.handleSubmit(handleSubmit)();
                        }, 100);
                      }
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage />
              <p className="text-sm text-muted-foreground text-center mt-4">
                OTP sent to {mobileNumber}
              </p>
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
            Verify OTP
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OTPVerification;

