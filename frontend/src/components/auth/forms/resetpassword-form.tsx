import { useUpdatePasswordMutation } from "@/services/auth/auth-mutation";
import { UpdateSchema, type UpdateSchemaType } from "@/validations/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import AuthSubmitButton from "../auth-submit-button";

export default function ResetPasswordForm() {
  const { token } = useParams<{ token: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<UpdateSchemaType>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useUpdatePasswordMutation(token!);

  const handleSubmit = (value: UpdateSchemaType) => {
    form.reset();
    mutate(value.password);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Lock className="absolute ml-2 w-4 h-4" />
                  <Input className="pl-8" {...field} type={showPassword ? "text" : "password"} />
                  {showPassword ? (
                    <Eye
                      className="absolute right-4 ml-2 w-4 h-4 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeClosed
                      className="absolute right-4 ml-2 w-4 h-4 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Lock className="absolute ml-2 w-4 h-4" />
                  <Input className="pl-8" {...field} type={showPassword ? "text" : "password"} />
                  {showPassword ? (
                    <Eye
                      className="absolute right-4 ml-2 w-4 h-4 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeClosed
                      className="absolute right-4 ml-2 w-4 h-4 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <AuthSubmitButton authType={"FORGOT"} isPending={isPending} />
      </form>
    </Form>
  );
}
