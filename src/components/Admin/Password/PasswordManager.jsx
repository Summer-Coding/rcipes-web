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
import { toast } from 'react-toastify';
import * as yup from 'yup';
import FormField from '../../Form/Field';
import { supabase } from '../../../lib/supabaseClient.ts';
import './passwordManager.css';

const schema = yup.object().shape({
  password: yup.string().required(),
});

const PasswordManager = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (password) => {
    setIsProcessing(true);
    const { error } = await supabase.auth.update({
      password,
    });

    if (error) {
      toast.error(
        'There was an issue submitting your password. Please try again.',
        {
          toastId: 'password-error',
        },
      );
    } else {
      toast.success('Successfully updated password!', {
        toastId: 'password-success',
      });
    }
    setIsProcessing(false);
  };

  return (
    <section className="password-manager">
      <Card>
        <CardHeader tag="h3">
          <span className="ms-3">Password Manager</span>
        </CardHeader>
        <CardBody>
          <Container>
            <Formik
              initialValues={{ password: '' }}
              validationSchema={schema}
              onSubmit={async (values, { resetForm }) => {
                await handleSubmit(values.password);
                resetForm();
              }}
            >
              <Form>
                <FormField
                  name="password"
                  type="password"
                  disabled={isProcessing}
                  required
                />
                <Button type="submit" color="success" disabled={isProcessing}>
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
                    <>Submit</>
                  )}
                </Button>
              </Form>
            </Formik>
          </Container>
        </CardBody>
      </Card>
    </section>
  );
};

export default PasswordManager;
