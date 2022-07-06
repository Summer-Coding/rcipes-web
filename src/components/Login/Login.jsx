import React, { useState } from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import { Field, Submit } from 'formik-strap';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import './login.css';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const login = async (email) => {
    try {
      await axios.post(`${baseUrl}/auth/login`, {
        email,
      });
      setIsSubmitted(true);
    } catch {
      toast.error('Could not sign in user. Please try again');
    }
  };

  return (
    <section className="login">
      {isSubmitted ? (
        <div>Check your email to confirm login.</div>
      ) : (
        <Card>
          <CardHeader tag="h3">
            <span className="ms-3">Login</span>
          </CardHeader>
          <CardBody>
            <Container>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={schema}
                onSubmit={async (values) => {
                  await login(values.email);
                }}
              >
                <Form>
                  <Field name="email" withLoading required />
                  <Submit withSpinner>Send Magic Link</Submit>
                </Form>
              </Formik>
            </Container>
          </CardBody>
        </Card>
      )}
    </section>
  );
};

export default Login;
