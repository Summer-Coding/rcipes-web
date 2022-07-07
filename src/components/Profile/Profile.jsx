import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, Spinner } from 'reactstrap';
import { Field, Submit } from 'formik-strap';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAxiosPrivate } from '../../lib/useAxiosPrivate';
import ProfileDeleteModal from './ProfileModal';

const schema = yup.object().shape({
  username: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const Profile = () => {
  const { email } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingButton, setProcessingButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleLoadData = async () => {
    setIsProcessing(true);
    setProcessingButton('reset');
    try {
      const profileData = await axiosPrivate.get('profile');
      setProfile(profileData?.data);
    } catch {
      toast.error(
        'There was an error retrieving your profile. Please try again.',
        {
          toastId: 'get-profile-error',
        },
      );
    } finally {
      setIsProcessing(false);
      setProcessingButton(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleSubmit = async (values) => {
    setIsProcessing(true);
    setProcessingButton('submit');
    try {
      const profileData = await axiosPrivate.post(`/profile`, {
        ...values,
      });

      setProfile(profileData.data);
    } catch {
      toast.error(
        'There was an error updating your profile. Please try again.',
        {
          toastId: 'update-profile-error',
        },
      );
    } finally {
      setProcessingButton(null);
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    setProcessingButton('delete');
    try {
      const profileData = await axiosPrivate.delete(`/profile`);
      setProfile(profileData.data);
      return <Navigate to="/" />;
    } catch {
      toast.error(
        'There was an error deleting your profile. Please try again.',
        {
          toastId: 'delete-profile-error',
        },
      );
    } finally {
      setIsProcessing(false);
      setProcessingButton(null);
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <p>Email: {email}</p>
      {isLoading ? (
        <Spinner className="page-spinner" />
      ) : (
        <Formik
          initialValues={{
            username: profile?.username ?? '',
            firstName: profile?.firstName ?? '',
            lastName: profile?.lastName ?? '',
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Form>
            <Field name="username" disabled={isProcessing} required />
            <Field
              name="firstName"
              labelText="First Name"
              withLoading
              required
            />
            <Field name="lastName" labelText="Last Name" withLoading required />
            <Submit withSpinner color="success">
              Submit
            </Submit>
            <Button
              type="button"
              color="warning"
              disabled={isProcessing}
              className="mx-3"
              onClick={() => handleLoadData()}
            >
              {isProcessing && processingButton === 'reset' ? (
                <>
                  <Spinner className="button-spinner" color="light" size="sm" />
                  <span className="ms-2">Loading...</span>
                </>
              ) : (
                <>Reset</>
              )}
            </Button>
            <Button
              type="button"
              color="danger"
              disabled={isProcessing}
              onClick={() => setIsModalOpen(true)}
            >
              {isProcessing && processingButton === 'delete' ? (
                <>
                  <Spinner className="button-spinner" color="light" size="sm" />
                  <span className="ms-2">Loading...</span>
                </>
              ) : (
                <>Delete</>
              )}
            </Button>
          </Form>
        </Formik>
      )}
      {isModalOpen && <ProfileDeleteModal handleDelete={handleDelete} />}
    </>
  );
};

export default Profile;
