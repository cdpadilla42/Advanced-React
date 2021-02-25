import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p></p>;
  }

  return (
    <PaginationStyles>
      <Head>Sick Fits – Page {page} of _____ </Head>
      <Link href="/">Prev</Link>
      <p>Page __ of ___</p>
      <p>{data._allProductsMeta.count} Items Total</p>
      <Link href="/">next</Link>
    </PaginationStyles>
  );
}
