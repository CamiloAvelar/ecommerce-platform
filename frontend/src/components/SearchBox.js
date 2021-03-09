import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history, redirect, useButton, placeholder }) => {
  const [keyValue, setKeyValue] = useState('');

  const submitHandler = (keyword) => {
    setKeyValue(keyword);
    if (!useButton) {
      if (keyword.trim().length > 2) {
        history.push(`/search/${keyword}${redirect}`);
      } else {
        history.push(`${redirect}`);
      }
    }
  };

  const buttonHandler = () => {
    if (useButton) {
      if (keyValue.trim()) {
        history.push(`/search/${keyValue}${redirect}`);
      } else {
        history.push(`${redirect}`);
      }
    }
  };

  return (
    <Form onSubmit={buttonHandler} inline>
      <Form.Control
        type='text'
        name='search'
        onChange={(e) => submitHandler(e.target.value)}
        placeholder={placeholder}
        value={keyValue}
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      {useButton && (
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      )}
    </Form>
  );
};

SearchBox.defaultProps = {
  useButton: false,
  value: '',
};

export default SearchBox;
