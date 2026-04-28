import {useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {object, string, boolean, array, InferType} from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "react-bootstrap";

const Apply = () => {

    const [submitApplication, setSubmitApplication] = useState(false);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const applicationValidation = object({
        startup_name: string()
            .max(40, "20 characters or less.")
            .required("Startup name is required."),
        startup_sector: string()
            .max(20, "20 characters or less.")
            .required("Startup Sector is required."),
        founders: array()
            .of(object({
                name: string()
                    .max(40, "20 characters or less")
                    .required("Founder name is required.")
            }))
            .min(1, "At least 1 founder is required.")
            .required(),
        email: string()
            .email("Invalid email format.")
            .required("Founder email is required."),
        phone: string()
            .matches(phoneRegExp, 'Phone number is not valid.')
            .required("Phone is required."),
        target_round: string()
            .required("Please select a target round."),
        additional_comments: string()
            .max(200, "200 characters or less."),
        upload_deck: boolean(),
    });

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(applicationValidation),
        defaultValues: {
            founders: [{ name: "" }],
            target_round: "Preseed",
            upload_deck: true
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "founders"
    });

    type ApplicationForm = InferType<typeof applicationValidation>
    const onSubmit = (data: ApplicationForm) => {
        console.log("Submission Success:", data);
        setSubmitApplication(true);
    };

    return (
        <>
            <h1>Apply</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
                {/* Startup Name Field */}
                <div className="mb-3">
                    <label className="form-label">Startup Name:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.startup_name ? 'is-invalid' : ''}`}
                        {...register("startup_name")}
                        placeholder="TechNinja"
                    />
                    {errors.startup_name && <div className="text-danger">{errors.startup_name.message}</div>}
                </div>

                {/* Startup Sector */}
                <div className="mb-3">
                    <label className="form-label">Startup Sector:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.startup_sector ? 'is-invalid' : ''}`}
                        {...register("startup_sector")}
                        placeholder="Tech"
                    />
                    {errors.startup_sector && <div className="text-danger">{errors.startup_sector.message}</div>}
                </div>

                {/* Founder 1 */}
                <div className="mb-3">
                    <label className="form-label">Founders:</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="d-flex mb-2">
                            <input
                                className={`form-control ${errors.founders ?.[index] ?.name ? 'is-invalid' : ''}`}
                                {...register(`founders.${index}.name`)}
                                placeholder="John Doe"
                            />
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    className="btn btn-danger ms-2"
                                    onClick={() => remove(index)}
                                >-</button>
                            )}
                        </div>
                    ))}
                    {errors.founders && <div className="text-danger">{errors.founders.message}</div>}
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm mt-1"
                        onClick={() => append({name: ""})}
                    >+ Add Founder</button>
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label">Founder Email:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        {...register("email")}
                        placeholder="name@startup.com"
                    />
                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                </div>

                {/* Phone */}
                <div className="mb-3">
                    <label className="form-label">Founder Phone:</label>
                    <input
                        type="tel"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        {...register("phone")}
                        placeholder="123-456-7890"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                    {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
                </div>

                {/* Radio Buttons */}
                <div className="mb-3">
                    <label className="form-label d-block">Target Round:</label>
                    {["Preseed", "Seed", "Series A", "Series B", "Series C"].map((round) => (
                        <div className="form-check form-check-inline" key={round}>
                            <input
                                className="form-check-input"
                                type="radio"
                                value={round}
                                {...register("target_round")}
                            />
                            <label className="form-check-label">{round}</label>
                        </div>
                    ))}
                    {errors.target_round &&
                        <div className="text-danger d-block">{errors.target_round.message}</div>}
                </div>

                {/* Upload Deck */}
                <div className="form-check mb-3">
                    <label className="form-check-label">Upload Deck</label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        {...register("upload_deck")} />
                </div>

                {/* Submit Application Buttons */}
                <div className="mb-3">
                    <Button type="submit" variant="success" className="me-2">
                        <i className="fa-solid fa-check me-2"></i> Submit
                    </Button>
                    <Button type="button" variant="danger" onClick={() => reset()}>Reset</Button>
                </div>

                {/*<ReservationSubmissionConfirmation*/}
                {/*    show={reservationConfirmation}*/}
                {/*    handleClose={() => {*/}
                {/*        setReservationConfirmation(false);*/}
                {/*        reset();*/}
                {/*    }}*/}
                {/*/>*/}
            </form>
        </>
    )
};

export default Apply;