import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';

const ALL_PRODUCTS_QUERY = gql`
  query GET_ALL_PRODUCTS {
    allProducts {
      name
      id
      description
      price
      photo {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
