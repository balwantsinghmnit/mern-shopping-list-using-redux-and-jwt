//@ts-ignore
import React, { Component } from 'react';
import {Button, Modal,Alert, ModalHeader, ModalBody, Form, FormGroup, Label, Input,NavLink} from "reactstrap";
//@ts-ignore
import {connect} from "react-redux";
//@ts-ignore
import PropTypes from "prop-types";
import {register} from "../../actions/authActions.js";
import {clearErrors} from "../../actions/errorActions.js";

class RegisterModal extends Component {
//@ts-ignore
    constructor(props)
    {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            modal:false,
            msg:null
        }
    }

    componentDidUpdate(prevProps)
    {
        const {error,isAuthenticated} = this.props;
        if(error !== prevProps.error)
        {
            //check for register error
            if(error.id==='REGISTER_FAIL')
            {
                this.setState({
                    msg:error.msg.msg
                });
            }
            else{
                this.setState({msg:null});
            }
        }
            if(this.state.modal)
            {
                if(isAuthenticated)
                {
                    this.toggle();
                }   
            }    
        
    }

    toggle = () =>{
        //clear errors
        this.props.clearErrors();
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
        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        };
        this.props.register(newUser);
    }


    render() {
        return (
            <div>
            <NavLink onClick={this.toggle} href="#">Register</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="Name" onChange={this.onChange} className="mb-3" />

                                <Label htmlFor="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}  className="mb-3"/>

                                <Label htmlFor="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} className="mb-3" />

                                <Button color="info" style={{marginTop:'2rem'}} block type="submit">Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

RegisterModal.propTypes = {
    isAuthentcated:PropTypes.bool,
    error:PropTypes.object.isRequired,
    register:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error
});

export default connect(mapStateToProps,{clearErrors,register})(RegisterModal);
