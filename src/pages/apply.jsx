import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {object, string, number, boolean} from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Col, Row} from "react-bootstrap";

const Apply = () => {

    const [submitApplication, setSubmitApplication] = useState(false);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validation = object({
        startup_name: string()
            .max(20, "20 characters or less.")
            .required("Startup name is required."),
        startup_sector: string()
            .max(20, "20 characters or less.")
            .required("Startup Sector is required."),
        founder1: string()
            .max(20, "20 characters or less.")
            .required("Founder is required."),
        founder2: string()
            .max(20, "20 characters or less."),
        founder3: string()
            .max(20, "20 characters or less."),
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
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validation),
        defaultValues: {
            target_round: "Preseed",
            upload_deck: true
        }
    });

    const onSubmit = (data) => {
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
                    <label className="form-label">Founder 1:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.founder1 ? 'is-invalid' : ''}`}
                        {...register("founder1")}
                        placeholder="John Doe"
                    />
                    {errors.founder1 && <div className="text-danger">{errors.founder1.message}</div>}
                </div>

                {/* Founder 2 */}
                <div className="mb-3">
                    <label className="form-label">Founder 2:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.founder2 ? 'is-invalid' : ''}`}
                        {...register("founder2")}
                        placeholder="John Doe"
                    />
                    {errors.founder2 && <div className="text-danger">{errors.founder2.message}</div>}
                </div>

                {/* Founder 3 */}
                <div className="mb-3">
                    <label className="form-label">Founder 3:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.founder3 ? 'is-invalid' : ''}`}
                        {...register("founder3")}
                        placeholder="John Doe"
                    />
                    {errors.founder3 && <div className="text-danger">{errors.founder3.message}</div>}
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