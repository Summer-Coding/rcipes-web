import React from 'react';
import { Form, Formik } from 'formik';
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import { Field, Submit } from 'formik-strap';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { supabase } from '../../../lib/supabaseClient.ts';
import './passwordManager.css';

const schema = yup.object().shape({
  password: yup.string().required(),
});

const PasswordManager = () => {
  const handleSubmit = async (password) => {
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
                <Field name="password" type="password" withLoading required />
                <Submit withSpinner>Submit</Submit>
              </Form>
            </Formik>
          </Container>
        </CardBody>
      </Card>
    </section>
  );
};

export default PasswordManager;
