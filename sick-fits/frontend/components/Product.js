import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
    </ItemStyles>
  );
}
