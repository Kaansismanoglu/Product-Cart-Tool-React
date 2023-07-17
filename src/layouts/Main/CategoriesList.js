import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CategoriesList extends Component {
    state = {
        categories: [],
    };

    componentDidMount() {
        this.getCategories();
    }

    getCategories = () => {
        fetch('http://localhost:3000/categories')
            .then((response) => response.json())
            .then((data) => this.setState({ categories: data }));
    };

    render() {
        return (
            <>
                <h3>{this.props.title}</h3>
                <ListGroup>
                    <ListGroupItem onClick={() => this.props.changeCategory({ id: 0, name: 'All Products' })} active={this.props.currentCategory === "All Products"? true : false}>
                        All Products
                    </ListGroupItem>
                    {this.state.categories.map((category) => (
                        <ListGroupItem onClick={() => this.props.changeCategory(category)}
                            key={category.id} active={this.props.currentCategory === category.name? true : false}>
                            {category.name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </>
        )
    }
}
