import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DocumentMask = (props) => {
  const TYPES = {
    CPF: '999.999.999-999',
    CNPJ: '99.999.999/9999-99',
  };
  const MAX_LENGTH = clear(TYPES.CNPJ).length;

  const { onChange, type } = props;

  let value = clear(props.value);

  if (value) {
    value = applyMask(value, TYPES[getMask(value)]);
  }

  function onLocalChange(ev) {
    let value = clear(ev.target.value);
    const mask = getMask(value);

    let nextLength = value.length;

    if (value[0]?.match(/[0-9]/) && nextLength > MAX_LENGTH) return;

    value = applyMask(value, TYPES[mask]);

    if (!props.useMask) {
      ev.target.value = clear(value);
    } else {
      ev.target.value = value;
    }

    onChange(ev, mask);
  }

  function getMask(value) {
    return value.length > 11 ? 'CNPJ' : 'CPF';
  }

  function applyMask(value, mask) {
    if (!value[0]?.match(/[0-9]/)) {
      return value;
    }

    let result = '';

    let inc = 0;
    Array.from(value).forEach((letter, index) => {
      if (!mask[index + inc].match(/[0-9]/)) {
        result += mask[index + inc];
        inc++;
      }
      result += letter;
    });
    return result;
  }

  function clear(value) {
    if (!value[0]?.match(/[0-9]/)) {
      return value;
    }

    return value && value.replace(/[^0-9]/g, '');
  }

  let originalProps = { ...props };
  delete originalProps.useMask;

  return (
    <Form.Control
      {...originalProps}
      type={type}
      value={value}
      onChange={onLocalChange}
    ></Form.Control>
  );
};

DocumentMask.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
  useMask: true,
};

DocumentMask.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  useMask: PropTypes.bool,
};

export default DocumentMask;
