import React, { Component } from 'react';
import { Table, Button, Pagination, PaginationLink, PaginationItem } from "reactstrap";

export default class ProductList extends Component {

    state = {
        currentPage: 1,
        itemsPerPage: 10
    }

    handleClick = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    handlePreviousClick = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({ currentPage: currentPage - 1 });
        }
    }

    handleNextClick = () => {
        const { currentPage, itemsPerPage } = this.state;
        const { products } = this.props;
        const totalPages = Math.ceil(products.length / itemsPerPage);
        if (currentPage < totalPages) {
            this.setState({ currentPage: currentPage + 1 });
        }
    }

    renderPageNumbers() {
        const { products } = this.props;
        const { itemsPerPage, currentPage } = this.state;
        const pageNumbers = Math.ceil(products.length / itemsPerPage);

        return (
            Array.from({ length: pageNumbers }).map((_, index) => (
                <PaginationItem key={index} active={index + 1 === currentPage}>
                    <PaginationLink href="#" onClick={() => this.handleClick(index + 1)}>
                        {index + 1}
                    </PaginationLink>
                </PaginationItem>
            ))
        );
    }

    render() {
        const { products } = this.props;
        const { currentPage, itemsPerPage } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <>
                <h3>{this.props.title} - {this.props.currentCategory}</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td onClick={() => this.props.AddtoCart(product)}>
                                        <Button color="info">Add to Cart</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Pagination>
                    <PaginationItem>
                        <PaginationLink first href="#" onClick={() => this.handleClick(1)} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink previous href="#" onClick={this.handlePreviousClick} />
                    </PaginationItem>
                    {this.renderPageNumbers()}
                    <PaginationItem>
                        <PaginationLink next href="#" onClick={this.handleNextClick} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last href="#" onClick={() => this.handleClick(Math.ceil(products.length / itemsPerPage))} />
                    </PaginationItem>
                </Pagination>
            </>
        );
    }
}
