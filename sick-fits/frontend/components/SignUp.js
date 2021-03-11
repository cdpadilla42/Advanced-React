import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SIGN_UP = gql`
  mutation SIGN_UP($email: String!, $password: String!, $name: String!) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      email
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, clearForm } = useForm({
    email: 'johnathan@mail.com',
    name: 'Johny ',
    password: 'JohnJohnJohn',
  });

  const [signUpUser, { data, loading, error }] = useMutation(SIGN_UP, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signUpUser().catch((err) => console.error(err));
    if (result) {
      console.log('Youre ine!');
      clearForm();
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up for an Account</h2>
      <DisplayError error={data?.authenticateUserWithPassword || error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} – Please go ahead and sign
            in!
          </p>
        )}
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
            required
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
            required
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
            minLength="8"
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
