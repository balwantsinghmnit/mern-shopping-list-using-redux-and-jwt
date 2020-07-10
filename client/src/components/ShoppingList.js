// @ts-ignore
import React, { Component } from 'react';
// @ts-ignore
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
// @ts-ignore
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from "react-redux";
import {getItems, deleteItem} from "../actions/itemActions.js";
import PropTypes from "prop-types";


class ShoppingList extends Component {

    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick = (id) =>{
        this.props.deleteItem(id);
    }
    render() {
        const {items}  = this.props.items;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name })=>(
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                {this.props.isAuthenticated ? <Button className="remove-btn" color="danger" size="sm" onClick={this.onDeleteClick.bind(this,_id)}>&times;</Button> : null }
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    items:PropTypes.object.isRequired,
    getItems:PropTypes.func.isRequired,
    deleteItem:PropTypes.func.isRequired,
    addItem:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
};

const mapStateToProps = state => ({
    items: state.item,
    isAuthenticated:state.auth.isAuthenticated
});
export default connect(mapStateToProps,{getItems,deleteItem})(ShoppingList);