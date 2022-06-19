import React, { useState } from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Spinner,
} from 'reactstrap';
import * as yup from 'yup';
import FormField from '../Form/Field';
import { supabase } from '../../lib/supabaseClient.ts';
import './login.css';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const login = async (email, secondAttempt = false) => {
    setIsProcessing(true);
    const { error } = await supabase.auth.signIn(
      { email },
      {
        shouldCreateUser: false,
      },
    );

    if (error) {
      if (!secondAttempt && error?.message === 'Signups not allowed for otp') {
        try {
          await axios.post(`${baseUrl}/auth/sign-up`, {
            email,
          });
          await login(email, true);
          setIsSubmitted(true);
        } catch {
          toast.error('Could not sign up user');
        }
      } else {
        toast.error('Could not sign up user');
      }
    }
    setIsProcessing(false);
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
                  <FormField name="email" disabled={isProcessing} required />
                  <Button
                    type="submit"
                    color="success"
                    disabled={isSubmitted || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span>Loading...</span>
                        <Spinner
                          className="button-spinner"
                          color="light"
                          size="sm"
                        />
                      </>
                    ) : (
                      <>Send magic link</>
                    )}
                  </Button>
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
