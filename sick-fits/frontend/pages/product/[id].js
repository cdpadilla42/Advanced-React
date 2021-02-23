import { gql, useQuery } from '@apollo/client';

const SINGLE_ITEM_QUERY = gql`
  query PRODUCT {
    Product(where: { id: "60351d2ea0ba5f03e4e18fb1" }) {
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

export default function singleProduct({ query }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);

  console.log({ data, loading, error });

  return <p>Hey singles {query.id}</p>;
}
