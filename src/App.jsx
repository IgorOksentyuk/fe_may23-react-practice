/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import { Product } from './components/Product';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductsFilter } from './components/ProductsFilter';

function categoreById(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId);
}

function userById(userId) {
  return usersFromServer.find(user => user.id === userId);
}

const products = productsFromServer.map(product => ({
  ...product,
  category: categoreById(product.categoryId),
  user: userById(categoreById(product.categoryId).ownerId),
}));

function getFilteredProducts(allProducts, selectedName) {
  const visibleProducts = allProducts;

  if (selectedName !== 'All') {
    return visibleProducts.filter(
      product => product.user.name === selectedName,
    );
  }

  return visibleProducts;
}

export const App = () => {
  const [selectedUserName, setSelectedUserName] = useState('All');
  const visibleProducts = getFilteredProducts(products, selectedUserName);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <ProductsFilter
          products={products}
          selectedUserName={selectedUserName}
          setSelectedUserName={setSelectedUserName}
        />

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {
              visibleProducts.map(
                product => <Product key={product.id} product={product} />,
              )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
