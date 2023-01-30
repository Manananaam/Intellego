import React from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const SignUpScreen = () => {
  return (
    <>
      <p>hi, this will be the signup screen</p>
      <Form>
        <div>
          <Form.Group className='mb-3' controlId='formBasicFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type='text' placeholder='Enter first name' />
          </Form.Group>
        </div>
        <div>
          <Form.Group className='mb-3' controlId='formBasicLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' placeholder='Enter last name' />
          </Form.Group>
        </div>
        <div>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>
        </div>
        <div>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
        </div>
        <div>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SignUpScreen;
