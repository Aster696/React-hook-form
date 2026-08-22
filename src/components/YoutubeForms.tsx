import React from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
 
type FormValues = {
    username: string,
    email: string,
    channel: string
};
export const YoutubeForms = () => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        console.log("Form data", data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label htmlFor="username">User Name</label>
                    <input 
                        {...register("username", {
                            required: "User name is required",
                        })}
                        type="text" 
                        id="username" 
                        name="username"
                    />
                    <p className="error">
                        {errors.username?.message}
                    </p>
                </div>

                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input 
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email'
                            },
                            validate: {
                                notAdmin: (fieldValue) => {
                                    return (
                                        fieldValue !== "admin@example.com" ||
                                        "Enter a different email address"
                                    )
                                },
                                notBlackListed: (fieldValue) => {
                                    return (
                                        fieldValue.endsWith('baddomin.com') ||
                                        "This domain is not supported"
                                    )
                                }
                            }
                        })}
                        type="email" 
                        id="email" 
                        name="email"
                    />
                    <p className="error">
                        {errors.email?.message}
                    </p>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">User Name</label>
                    <input 
                        {...register("channel", {
                            required: {
                                value: true,
                                message: "Channel is required"
                            }
                        })}
                        type="text" 
                        id="channel" 
                        name="channel"
                    />
                    <p className="error">
                        {errors.channel?.message}
                    </p>
                </div>

                <button type="submit">Submit</button>
            </form>
            <DevTool control={control}/>
        </div>
    )
}