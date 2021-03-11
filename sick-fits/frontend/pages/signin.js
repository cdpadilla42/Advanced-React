import React from 'react';
import styled from 'styled-components';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const SignInPage = () => {
  return (
    <StyledGrid>
      <SignIn />
      <SignUp />
    </StyledGrid>
  );
};

export default SignInPage;
