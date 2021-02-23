import { gql, useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
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
      id: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  console.log({ data });
  return <p>Hey singles {data.Product.name}</p>;
}
