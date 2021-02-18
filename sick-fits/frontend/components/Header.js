import React from 'react';
import Link from 'next/link';
import Nav from './Nav';
import styled from 'styled-components';

const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  background-color: red;
  position: relative;
  transform: skew(-7deg);
  color: white;

  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

const Header = () => {
  return (
    <HeaderStyles>
      <div className="bar">
        <Link href="/">
          <Logo>
            <a>Sick fits</a>
          </Logo>
        </Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </HeaderStyles>
  );
};

export default Header;
