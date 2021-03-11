import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

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

const SIGN_UP = gql`
  mutation SIGN_UP($email: String!, $password: String!, $name: String!) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      email
    }
  }
`;

export default function SignUp() {
  const router = useRouter();
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signInUser, { data, loading, error }] = useMutation(SIGN_IN_USER, {
    variables: inputs,
    // refetch current logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: result } = await signInUser();
    // TODO render appropriate responses to success and failure
    if (result.authenticateUserWithPassword.sessionToken) {
      console.log('Youre ine!');
      clearForm();
      // Push to home page
      router.push('/');
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up for an Account</h2>
      <DisplayError error={data?.authenticateUserWithPassword || error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
