import React, { useState } from 'react';
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

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const login = async (email) => {
    setIsProcessing(true);
    await supabase.auth.signIn({ email });
    setIsSubmitted(true);
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
