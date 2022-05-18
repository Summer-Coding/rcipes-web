import { Form, Formik } from 'formik';
import React from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import * as yup from 'yup';
import FormField from '../Form/Field';
import './login.css';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string(),
});

const Login = () => {
  return (
    <Card>
      <CardHeader>Login</CardHeader>
      <CardBody>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={schema}
          // eslint-disable-next-line no-console
          onSubmit={(values) => console.log(values)}
        >
          <Form>
            <FormField name="email" required />
            <FormField name="password" type="password" />
            <Button type="submit" color="success">
              Submit
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};

export default Login;
