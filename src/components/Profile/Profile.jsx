import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { Button, Spinner } from 'reactstrap';
import FormField from '../Form/Field';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAxiosPrivate } from '../../lib/useAxiosPrivate';
import ProfileDeleteModal from './ProfileModal';

const schema = yup.object().shape({
  username: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const Profile = ({ user }) => {
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
      setIsProcessing(false);
      setProcessingButton(null);
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
      <p>Email: {user.email}</p>
      {isLoading ? (
        <Spinner className="page-spinner" />
      ) : (
        <Formik
          initialValues={{
            username: profile?.username ?? '',
            firstName: profile?.firstName ?? '',
            lastName: profile.lastName ?? '',
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            await handleSubmit(values);
          }}
          onReset={async (_, { resetForm }) => {
            resetForm();
            await handleLoadData();
          }}
        >
          <Form>
            <FormField name="username" disabled={isProcessing} required />
            <FormField
              name="firstName"
              labelText="First Name"
              disabled={isProcessing}
              required
            />
            <FormField
              name="lastName"
              labelText="Last Name"
              disabled={isProcessing}
              required
            />
            <Button type="submit" color="success" disabled={isProcessing}>
              {isProcessing && processingButton === 'submit' ? (
                <>
                  <span>Loading...</span>
                  <Spinner className="button-spinner" color="light" size="sm" />
                </>
              ) : (
                <>Submit</>
              )}
            </Button>
            <Button
              type="reset"
              color="warning"
              disabled={isProcessing}
              className="mx-3"
            >
              {isProcessing && processingButton === 'reset' ? (
                <>
                  <span>Loading...</span>
                  <Spinner className="button-spinner" color="light" size="sm" />
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
                  <span>Loading...</span>
                  <Spinner className="button-spinner" color="light" size="sm" />
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

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Profile;
