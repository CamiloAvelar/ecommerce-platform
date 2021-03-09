import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Table, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import { listOrders } from '../actions/orderActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { LinkContainer } from 'react-router-bootstrap';
import Paginate from '../components/Paginate';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const pageNumber = match.params.pageNumber || 1;
  const pageSize = 10;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const orderList = useSelector((state) => state.orderList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
    page,
    pages,
  } = orderList;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push('/login');
    }

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/user/list');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }

    dispatch(listOrders(userId, pageNumber, pageSize));
  }, [
    dispatch,
    user,
    userId,
    history,
    successUpdate,
    userInfo,
    pageNumber,
    pageSize,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/user/list' className='btn btn-light my-3'>
        Go Back
      </Link>

      <Row>
        <Col md={3}>
          <h2>Edit User</h2>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loading && <Loader />}
          {error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
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
              <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          )}
        </Col>
        <Col md={9}>
          <h2>User Orders</h2>
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
                redirect={`/admin/user/${userId}/edit`}
              ></Paginate>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserEditScreen;
