import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const SIGN_IN_USER = gql`
  mutation SIGN_IN_USER($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
  });

  const [signInUser, { data, loading, error }] = useMutation(SIGN_IN_USER, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: result } = await signInUser();
    console.log(result);
    // TODO render appropriate responses to success and failure
    if (
      result.authenticateUserWithPassword.__typename ===
      'UserAuthenticationWithPasswordFailure'
    ) {
      console.log('FAILED');
    }

    if (result.authenticateUserWithPassword.sessionToken) {
      console.log('Youre ine!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError
        error={
          data?.authenticateUserWithPassword.code === 'FAILURE'
            ? data?.authenticateUserWithPassword
            : error
        }
      />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            id="email"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password "
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}
