import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './form.css'; // Import the CSS file

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });
  
  export const ValidationSchemaExample = () => {
    const [serverError, setServerError] = useState('');
  
    const handleSubmit = async (values, { setSubmitting,resetForm }) => {
      try {
        const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          // Handle non-200 responses here
          const errorData = await response.json();
          setServerError(errorData.message); // Assuming server sends error message in JSON
          alert(errorData.message);
          return;
        }
  
        // If response is OK, clear server error and do any necessary actions
        setServerError('');
        alert("Form submitted successfully!");
        resetForm();
        console.log('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        setServerError('An error occurred while submitting the form.');
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <div className="container">
        <h1 className="heading">Signup</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="fieldWrapper">
                <Field name="firstName" placeholder="First Name" className={`fieldInput ${errors.firstName && touched.firstName ? 'error' : ''}`} />
                {errors.firstName && touched.firstName ? (
                  <div className="errorMessage">{errors.firstName}</div>
                ) : null}
              </div>
              <div className="fieldWrapper">
                <Field name="lastName" placeholder="Last Name" className={`fieldInput ${errors.lastName && touched.lastName ? 'error' : ''}`} />
                {errors.lastName && touched.lastName ? (
                  <div className="errorMessage">{errors.lastName}</div>
                ) : null}
              </div>
              <div className="fieldWrapper">
                <Field name="email" type="email" placeholder="Email Address" className={`fieldInput ${errors.email && touched.email ? 'error' : ''}`} />
                {errors.email && touched.email ? <div className="errorMessage">{errors.email}</div> : null}
              </div>
              {serverError && <div className="serverError">{serverError}</div>}
              <button type="submit" className="submitButton" disabled={isSubmitting}>Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  };