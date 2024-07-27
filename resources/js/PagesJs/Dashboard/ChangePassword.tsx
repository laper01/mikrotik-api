// src/components/MainContent.tsx
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useChangePassword } from "@/hooks/editPasswordHooks";
import {
    changePasswordForm,
    changePasswordSchema,
} from "@/Utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/Components/ui/form"
  import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<changePasswordForm>({
        resolver: zodResolver(changePasswordSchema),
    });

    const {
        mutate: changePassword,
        isLoading,
        error: RootError,
        success
    } = useChangePassword();

    const onSubmitForm: SubmitHandler<changePasswordForm> = (data) => {
        changePassword(data);
    };

    return (
        <div className="p-6 flex-grow">
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <Label htmlFor="username" > Nama Pengguna</Label>
                <Input
                    {...register("username")}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                {errors.username && (
                    <InputError
                        message={errors.username?.message}
                        className="mt-2"
                    />
                )}
                <Label htmlFor="password" className="" >Password</Label>
                <Input
                    {...register("password")}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm "
                />
                {errors.password && (
                    <InputError
                        message={errors.password?.message}
                        className="mt-2"
                    />
                )}
                <Label htmlFor="confirmPassword"> Konfirmasi Password </Label>
                <Input
                    {...register("confirmPassword")}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                {errors.confirmPassword && (
                    <InputError
                        message={errors.confirmPassword?.message}
                        className="mt-2"
                    />
                )}
                <br/>
                <PrimaryButton disabled={isLoading} className="ms-2 mt-1">
                    Ubah
                </PrimaryButton>

            </form>
            {RootError && (
                       <InputError
                            message={RootError}
                            className="mt-2"
                        />
                    )}
            { success &&(
            <p className="text-green-500" >{success}</p>
            )
            }
        </div>
    );
};

export default ChangePassword;
