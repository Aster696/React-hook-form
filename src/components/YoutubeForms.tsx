import React, { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
 
type FormValues = {
    username: string,
    email: string,
    channel: string,
    social: {
        twitter: string,
        facebook: string
    },
    phonenumbers: string[],
    phNumbers: {
        numbers: string
    }[],
    age: number,
    dob: Date
};
export const YoutubeForms = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            username: 'Aster',
            email: 'a@gmail.com',
            channel: 'aster-youtube',
            social: {
                twitter: '',
                facebook: ''
            },
            phonenumbers: ["", ""],
            phNumbers: [{numbers: ''}],
            age: 0,
            dob: new Date()
        }
    });
    const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
    const { errors, dirtyFields, touchedFields, isDirty } = formState;
    console.log(dirtyFields, touchedFields, isDirty);

    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',
        control
    }) 

    const onSubmit = (data: FormValues) => {
        console.log("Form data", data)
    }

    const handleGetvalues = () => {
        console.log("Getvalues", getValues("social"));
    }

    const handleSetValues = () => {
        setValue('username', "Alister", {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    useEffect(() => {
        const sub = watch((value) => {
            console.log(value)
        })
    }, [watch])

    const username = watch();
    return (
        <div>
            <h1>Youtube Form</h1>
            {/* <h3>Watch value:{JSON.stringify(username)}</h3> */}
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
                                        !fieldValue.endsWith('baddomain.com') ||
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
                    <label htmlFor="channel">Channel</label>
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

                <div className="form-control">
                    <label htmlFor="twitter">Twitter</label>
                    <input 
                        {...register("social.twitter")}
                        type="text" 
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="facebook">Facebook</label>
                    <input 
                        {...register("social.facebook")}
                        type="text" 
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="Primary number">Primary number</label>
                    <input 
                        {...register("phonenumbers.0")}
                        type="text" 
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="Secondary number">Secondary number</label>
                    <input 
                        {...register("phonenumbers.1")}
                        type="text" 
                    />
                </div>

                <div>
                    <label>List of phone numbers</label>
                    <div>
                        {
                            fields.map((field, index) => {
                                return (
                                    <div className="form-control" key={field.id}>
                                        <input 
                                            type="text" 
                                            {...register(`phNumbers.${index}.numbers` as const)}
                                        />
                                        {index > 0 && (
                                            <button onClick={() => remove(index)} type="button">
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                )
                            })
                        }
                        <button type="button" onClick={() => append({numbers: ''})}>
                            Add
                        </button>
                    </div>
                </div>

                <div className="form-control">
                    <label htmlFor="age">Age</label>
                    <input 
                        {...register("age", {
                            valueAsNumber: true,
                            required: {
                                value: true,
                                message: "Age is required"
                            }
                        })}
                        type="number" 
                        id="age" 
                        name="age"
                    />
                    <p className="error">
                        {errors.age?.message}
                    </p>
                </div>

                <div className="form-control">
                    <label htmlFor="dob">Date of birth</label>
                    <input 
                        {...register("dob", {
                            valueAsDate: true,
                            required: {
                                value: true,
                                message: "Date of birth is required"
                            }
                        })}
                        type="date" 
                        id="dob" 
                        name="dob"
                    />
                    <p className="error">
                        {errors.dob?.message}
                    </p>
                </div>

                <button type="submit">Submit</button>
                <button type="button" onClick={handleGetvalues}>
                    Get Values
                </button>
                <button type="button" onClick={handleSetValues}>
                    Set Values
                </button>
            </form>
            <DevTool control={control}/>
        </div>
    )
}