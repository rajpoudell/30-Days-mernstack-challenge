
import React from "react";
import { Formik, Form, Field, ErrorMessage,FormikHelpers } from 'formik';

//for bydefault value to be set 
const initialValues = {
    name: '',
    email: '',
    job:'',
    salary:''
  };
const  Forms:React.FC = ()=> {
      
      //for submitting function
      const onSubmit = async(values: any,{ resetForm }: FormikHelpers<any>) => {
        try {
            const response = await fetch("http://localhost:3001/user",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });

            alert("Submitted to databases\n"+ JSON.stringify(values, null, 2));
            resetForm();
            if (response.ok) {
                // Successful API call, handle the response if needed
                console.log('Form data sent successfully:', values);
                resetForm(); // Optionally reset the form after successful submission
              } else {
                // Handle API error
                console.error('Failed to send form data:', response.statusText);
              }
            
            
        } catch (error) {
            console.error('Error occurred during form submission:', error)
        }

      };

      //validate form and for showing error
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
    <div>
        <center>
            <h1>Registration</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate} >
                <Form >
                    <label htmlFor="" > Name: <Field type="text" name="name" placeholder="Enter your name" /></label>
                    <ErrorMessage name="name" />
                        <br />
                    <label htmlFor="" > job: <Field type="text" name="job" placeholder="Enter your job" /></label>
                    <ErrorMessage name="job" />
                        <br />
                    <label htmlFor="" > salary: <Field type="text" name="salary" placeholder="Enter your salary" /></label>
                    <ErrorMessage name="salary" />
                        <br />

                    <label htmlFor="" > Email: <Field type="text" name="email" placeholder="Enter your email" /></label>
                    <ErrorMessage name="email" component="div" />

                    <button type="submit">Submit</button>

                </Form>
            </Formik>
        </center>
    </div>

  );
}

export default Forms;