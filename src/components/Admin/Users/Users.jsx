import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { useAxiosPrivate } from '../../../lib/useAxiosPrivate';

const Users = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const requestGetUsers = async () => {
    try {
      const users = await axiosPrivate.get('/admin/users');
      setUsers(users.data);
    } catch {
      toast.error(
        'There was an error retrieving the users. Please check the logs.',
        {
          toastId: 'users-error',
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestGetUsers();
  }, []);

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {users ? (
            (users ?? []).map((user) => (
              <>
                <h4 key={user.id}>{user.email}</h4>
                <p>{user.email}</p>
              </>
            ))
          ) : (
            <div>No users found</div>
          )}
        </>
      )}
    </>
  );
};

export default Users;
