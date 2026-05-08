import {ChangeEvent, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {object, string, array, InferType} from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {Alert, Button} from "react-bootstrap";
import {axiosSubmitApplication} from "../../application/application_service.tsx";

const Apply = () => {

    const [submitApplication, setSubmitApplication] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files?.[0] ?? null);
    };

    const applicationValidation = object({
        startup_name: string()
            .max(40, "40 characters or less.")
            .required("Startup name is required."),
        startup_sector: string()
            .max(20, "20 characters or less.")
            .required("Startup sector is required."),
        founders: array()
            .of(object({
                name: string()
                    .max(40, "20 characters or less")
                    .required("Founder name is required.")
            }))
            .min(1, "At least 1 founder is required.")
            .max(5, "Maximum of 5 founders.")
            .required("Founder name is required."),
        email: string()
            .email("Invalid email format.")
            .required("Founder email is required."),
        phone: string()
            .transform((value) => value.replace(/\D/g, ""))
            .min(10, "Phone number must be at least 10 digits.")
            .max(11, "Phone number cannot exceed 11 digits.")
            .test("is-numeric", "Phone must only contain numbers", (value) =>
                !value || /^\d+$/.test(value)
            )
            .required("Phone is required."),
        target_round: string()
            .required("Please select a target round."),
        additional_comments: string()
            .max(200, "200 characters or less."),
    });

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(applicationValidation),
        defaultValues: {
            founders: [{ name: "" }],
            target_round: "Preseed",
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "founders"
    });

    type ApplicationForm = InferType<typeof applicationValidation>

    const onSubmit = async (data: ApplicationForm) => {
        try {
            await axiosSubmitApplication(
                {
                    name: data.startup_name,
                    sector: data.startup_sector,
                    targetRound: data.target_round,
                    founders: data.founders.map(f => f.name),
                    founderEmail: data.email,
                    founderPhoneNumber: data.phone,
                    additionalComments: data.additional_comments ?? "",
                    status: "Pending",
                    submittedAt: new Date().toISOString(),
                },
                selectedFile ?? undefined
            );

            setSubmitApplication(true);
            setSelectedFile(null);
            reset();
        } catch (error) {
            console.log("Failed to submit application:", error);
        }
    };

    return (
        <>
            {submitApplication && (
                <Alert key='success' variant='success' dismissible>
                    Application submitted successfully! A partner will reach out shortly.
                </Alert>
            )}
            <h1 className="nb-eyebrow">Apply</h1>
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
                    {errors.founders &&
                        <div className="text-danger d-block">{errors.founders.message}</div>}
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
                    {["Preseed", "Seed", "Series A", "Series B", "Series C"].map((target_round) => (
                        <div className="form-check form-check-inline" key={target_round}>
                            <input
                                className="form-check-input"
                                type="radio"
                                value={target_round}
                                {...register("target_round")}
                            />
                            <label className="form-check-label">{target_round}</label>
                        </div>
                    ))}
                    {errors.target_round &&
                        <div className="text-danger d-block">{errors.target_round.message}</div>}
                </div>

                {/* Upload Deck */}
                <div className="mb-3">
                    <label className="form-label">Upload Deck (PDF)</label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={onFileChange}
                        className="form-control"
                    />
                </div>

                {/* Additional Comments */}
                <div className="mb-3">
                    <label className="form-label">Additional Comments:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.additional_comments ? 'is-invalid' : ''}`}
                        {...register("additional_comments")}
                        placeholder="Additional Comments"
                    />
                    {errors.additional_comments && <div className="text-danger">{errors.additional_comments.message}</div>}
                </div>

                {/* Submit Application Buttons */}
                <div className="mb-3">
                    <Button type="submit" variant="success" className="me-2" disabled={isSubmitting}>
                        <i className="fa-solid fa-check me-2"></i>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
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