import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  Spinner,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { useAxiosPrivate } from '../../../lib/useAxiosPrivate';
import './users.css';

const Users = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [userProcessing, setUserProcessing] = useState(null);
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

  const handlePromoteToAdmin = async (userId) => {
    setUserProcessing(userId);
    try {
      await axiosPrivate.post('/admin/create', {
        id: userId,
      });
    } catch {
      toast.error(
        'There was an error updating the user. Please check the logs.',
        {
          toastId: 'create-admin-error',
        },
      );
    } finally {
      setUserProcessing(null);
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Spinner className="page-spinner" />
      ) : (
        <>
          {(users ?? []).length > 0 ? (
            users.map((user) => (
              <ListGroupItem key={user.id} className="user-list-item">
                <Row>
                  <Col sm={8}>
                    <ListGroupItemHeading>{user.username}</ListGroupItemHeading>
                    <ListGroupItemText>
                      <div>
                        {user.firstName} {user.lastName}
                      </div>
                      <div>{user.email}</div>
                      <div>{user.isActive ? <>Active</> : <>Inactive</>}</div>
                    </ListGroupItemText>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-end">
                    {!(user.roles ?? []).includes('admin') && (
                      <Button
                        color="warning"
                        onClick={() => handlePromoteToAdmin(user.userId)}
                        disabled={user.userId === userProcessing}
                      >
                        {user.id === userProcessing ? (
                          <>
                            <span>Loading...</span>
                            <Spinner
                              className="button-spinner"
                              color="light"
                              size="sm"
                            />
                          </>
                        ) : (
                          <>Promote to Admin</>
                        )}
                      </Button>
                    )}
                  </Col>
                </Row>
              </ListGroupItem>
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
