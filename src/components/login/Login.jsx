import React, { useState } from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Spinner,
} from 'reactstrap';
import FormField from '../Form/Field';
import { supabase } from '../../lib/supabaseClient.ts';
import './login.css';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string(),
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
    <>
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
                initialValues={{ email: '', password: '' }}
                validationSchema={schema}
                // eslint-disable-next-line no-console
                onSubmit={async (values) => {
                  await login(values.email);
                }}
              >
                <Form>
                  <FormField name="email" required />
                  <Button
                    type="submit"
                    color="success"
                    disabled={isSubmitted || isProcessing}
                  >
                    {isProcessing ? <>Loading...</> : <>Send magic link</>}
                    {isProcessing && (
                      <Spinner
                        style={{
                          marginLeft: '0.5rem',
                        }}
                        color="light"
                        size="sm"
                      />
                    )}
                  </Button>
                </Form>
              </Formik>
            </Container>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Login;
