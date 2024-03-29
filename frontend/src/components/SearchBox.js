import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
    e.target.reset();
  };

  return (
    <Form className="d-flex mr-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search For Products"
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="primary" type="submit" id="button-search">
          <i className="fa fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
