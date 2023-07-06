/* eslint-disable jsx-a11y/accessible-emoji */

export const Product = ({ product }) => {
  console.log('product');

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {product.id}
      </td>

      <td data-cy="ProductName">{product.name}</td>
      <td data-cy="ProductCategory">
        {`${product.category.icon} - ${product.category.title}`}
      </td>

      <td
        data-cy="ProductUser"
        className={product.user.sex === 'm'
          ? 'has-text-link'
          : 'has-text-danger'
        }
      >
        {product.user.name}
      </td>
    </tr>
  );
};
