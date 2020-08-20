import React from 'react';
import {
  Form,
  Button,
  Input,
  Icon,
} from 'antd';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';

//const [form] = Form.useForm();
const FormItem = Form.Item;
class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values) => {
            if (!err) {
                this.props.onAuth(
                    values.userName, 
                    values.email,
                    values.password,
                    values.confirm
                    );

                //console.log('Received values of form: ', values);
            }
            this.props.history.push('/');
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two Passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value,callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>    
            <FormItem>
                {getFieldDecorator('userName', {
                rules: [{required: true, message: 'Please input your Username:'}]
                })(
                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </FormItem>

            <FormItem>
                {getFieldDecorator('email', {               
                    rules: [{
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    }],
                })(
            
            <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </FormItem>

            <FormItem>
                {getFieldDecorator('password', {
                rules: [{
                    required: true,
                    message: 'Please input your password:',
                }, {
                    validator: this.validateToNextPassword,
                }],
                })(            
                <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />)} 
            </FormItem>

            <FormItem>
                    {getFieldDecorator('confirm',{
                        rules: [{
                            required: true, 
                            message:  'Please confirm your password:',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(

            <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirm Password" />)}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                 Sign Up
                </Button> 
                Or&nbsp; 
            <NavLink style={{marginRight: '10px'}} to='/login/'>
                Login
            </NavLink>
            </FormItem>
        </Form>
    );
};
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);

//ReactDOM.render(<RegistrationForm />, mountNode);