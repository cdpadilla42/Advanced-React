import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT = gql`
  mutation SIGN_OUT {
    endSession
  }
`;

export default function SignOut() {
  const [signOut, {}] = useMutation(SIGN_OUT, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  function handleSignOut(e) {
    e.preventDefault();
    signOut();
  }

  return <a onClick={handleSignOut}>Sign Out</a>;
}
