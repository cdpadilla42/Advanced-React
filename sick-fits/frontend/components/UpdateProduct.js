import Router from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

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

const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $name: String
    $price: Int
    $description: String
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // Get existing product
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  // We need the form to handle the updates
  const { inputs, handleChange } = useForm(data?.Product);
  // We need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT, {
    variables: {
      id,
      name: inputs.name,
      description: inputs.description,
      price: inputs.price,
    },
  });

  if (loading) return <p>Loading</p>;

  console.log(inputs);

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // TODO Handle submit
        const res = await updateProduct().catch(console.error);
        // Go To Product Page
        // Router.push(`/product/${id}`);
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        {/* <label htmlFor="image">
          Image
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            required
          />
        </label> */}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
