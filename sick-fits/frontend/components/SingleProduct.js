import Link from 'next/link';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';
import styled from 'styled-components';
import AddToCart from './AddToCart';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;

  img {
    object-fit: contain;
    width: 100%;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id: Product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
      </div>
    </ProductStyles>
  );
}
