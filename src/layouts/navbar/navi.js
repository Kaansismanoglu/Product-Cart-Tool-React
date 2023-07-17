import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartSummary from '../Main/CartSummary';
import { Link } from 'react-router-dom';
import { NavLink, Navbar } from 'reactstrap';

export default class navi extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
              <a class="navbar-brand" href="/">Product Cart System</a>
            </div>
            <div>
              <Navbar class="justify-content-between:center;" light expand="md">
                <NavLink className="nav-link">
                  <Link to="form">
                    Form
                  </Link>
                </NavLink>
                <CartSummary cart={this.props.cart.length} products={this.props.cart} RemovetoCart={this.props.RemovetoCart} />
              </Navbar>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
