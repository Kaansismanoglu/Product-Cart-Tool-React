import { React, Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navi from './layouts/navbar/navi';
import ProductList from './layouts/Main/ProductList';
import CategoriesList from './layouts/Main/CategoriesList';
import alertify from 'alertifyjs';
import { Routes, Route } from 'react-router-dom';
import NotFound from './layouts/ErrorPage/NotFound';
import FormAction from './forms/FormAction';

export default class App extends Component {
  state = {
    products: [],
    currentCategory: '',
    cart: [],
  };

  AddToCart = (product) => {
    let newCart = this.state.cart;
    if (newCart.find((c) => c.id === product.id)) {
      newCart.find((c) => c.id === product.id).quantity++;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.name + " added to cart!");
  };

  RemovetoCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.name + " removed from cart!");
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.name });
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = currentCategory => {
    let url = "http://localhost:3000/products";
    if (currentCategory) {
      url += "?category_id=" + currentCategory;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  render() {
    let titlecategory = "Category List";
    let titleproductlist = "Product List";
    return (
      <>
        <Navi cart={this.state.cart} RemovetoCart={this.RemovetoCart} />
        <Container>
          <Row>
            <Col xs="3">
              <CategoriesList changeCategory={this.changeCategory} title={titlecategory} currentCategory={this.state.currentCategory} />
            </Col>
            <Col xs="9">
              <Routes>
                <Route exact path="/" element={<ProductList title={titleproductlist} currentCategory={this.state.currentCategory} products={this.state.products} AddtoCart={this.AddToCart}/>}/>
                <Route exact path="form" element={<FormAction/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
