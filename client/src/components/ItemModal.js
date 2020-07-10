import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from "reactstrap";
import {connect} from "react-redux";
import {addItem} from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            modal:false,
            name:''
        }
    }

    toggle = () =>{
        this.setState({
            modal:!this.state.modal
        });
    }

    onChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = (e)=>{
        e.preventDefault();
        this.props.addItem(this.state.name);
        this.setState({name:''});
        this.toggle();
    }
    render() {
        return (
            <div>
               {this.props.isAuthenticated ? <Button color="info" style={{marginBottom:"2rem"}} onClick={this.toggle} >Add Item</Button> : <h4 className="mb-3 ml-4">Please Log in to manage items</h4>}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add To Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label htmlFor="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add Shopping Item" onChange={this.onChange} />
                                <Button color="info" style={{marginTop:'2rem'}} block type="submit">Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

ItemModal.propTypes = {
    addItem:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
};

const mapStateToProps = state => ({
    items:state.item,
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{addItem})(ItemModal);
