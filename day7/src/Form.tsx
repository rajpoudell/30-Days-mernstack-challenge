import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import './form.css'; 

const initialValues = {
    name: '',
    email: '',
    job: '',
    salary: ''
};

const Forms: React.FC = () => {
    const onSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
        try {
            const response = await fetch("http://localhost:4000/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });

            alert("Submitted to database\n" + JSON.stringify(values, null, 2));
            if (response.ok) {
                console.log('Form data sent successfully:', values);
                resetForm();
            } else {
                console.error('Failed to send form data:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred during form submission:', error)
        }
    };

    const validate = (values: any) => {
        const errors: { [key: string]: string } = {};
        if (!values.name) {
            errors.name = "Required";
        }
        if (!values.job) {
            errors.job = "Required";
        }
        if (!values.salary) {
            errors.salary = "Required";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }
        return errors;
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Registration</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                <Form>
                    <label className="form-label" htmlFor="name">Name:</label>
                    <Field className="form-input" type="text" name="name" placeholder="Enter your name" />
                    <ErrorMessage className="form-error" name="name" component="div" />

                    <label className="form-label" htmlFor="job">Job:</label>
                    <Field className="form-input" type="text" name="job" placeholder="Enter your job" />
                    <ErrorMessage className="form-error" name="job" component="div" />

                    <label className="form-label" htmlFor="salary">Salary:</label>
                    <Field className="form-input" type="text" name="salary" placeholder="Enter your salary" />
                    <ErrorMessage className="form-error" name="salary" component="div" />

                    <label className="form-label" htmlFor="email">Email:</label>
                    <Field className="form-input" type="text" name="email" placeholder="Enter your email" />
                    <ErrorMessage className="form-error" name="email" component="div" />

                    <button className="form-button" type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Forms;
