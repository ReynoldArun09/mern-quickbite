import { useForgoutPasswordMutation } from "@/services/auth/auth-mutation";
import { emailSChema, type emailType } from "@/validations/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import AuthSubmitButton from "../auth-submit-button";

export default function ForgotForm() {
  const form = useForm<emailType>({
    resolver: zodResolver(emailSChema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useForgoutPasswordMutation();

  const onSubmit = (value: emailType) => {
    if (isPending) return;
    mutate(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address..."
                  type="email"
                  id="email"
                  aria-label="Email Address"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <AuthSubmitButton authType="FORGOT" isPending={isPending} />
      </form>
    </Form>
  );
}
