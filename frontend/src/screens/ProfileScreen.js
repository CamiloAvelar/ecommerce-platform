import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import DocumentMask from '../components/DocumentMask';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import {
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants';
import { loggedListOrder } from '../actions/orderActions';

const ProfileScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const pageSize = 10;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [document, setDocument] = useState('');
  const [hidden, setHidden] = useState(true);
  const [successUpdate, setSuccessUpdate] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error: errorUpdate } = userUpdateProfile;

  const orderLoggedList = useSelector((state) => state.orderLoggedList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
    pages,
    page,
  } = orderLoggedList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user?.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        if (success) {
          setSuccessUpdate(true);
          setTimeout(() => {
            setSuccessUpdate(false);
          }, 1500);
        }
      } else {
        setName(user.name);
        setEmail(user.email);
        setDocument(user.document);
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }

      dispatch(loggedListOrder(pageNumber, pageSize));
    }
  }, [dispatch, history, userInfo, user, success, pageNumber, pageSize]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('Password do not match');
    } else if (
      user.name === name &&
      user.document === document &&
      user.email === email &&
      !newPassword
    ) {
      dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: 'No changes found' });
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, password, newPassword })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {successUpdate && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='document'>
            <Form.Label>Document</Form.Label>
            <DocumentMask type='text' value={document} disabled></DocumentMask>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button
            variant='secondary'
            className='mb-3'
            onClick={() => setHidden(!hidden)}
          >
            Change password
          </Button>{' '}
          {hidden ? (
            ''
          ) : (
            <>
              <Form.Group controlId='newPassword'>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='confirmNewPassword'>
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </>
          )}
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelived ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate
              pages={pages}
              page={page}
              redirect='/profile/orders'
            ></Paginate>
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
