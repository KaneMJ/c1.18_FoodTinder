import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import registerstorage from './register-storage';

class RegisterHide extends Component{
    constructor(props){
        super(props);

        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {
            emailValue: '',
            passwordValue: '',
            confirmValue: '',
            pageLink: false
        }
    }
    goBack(e){
        const stateCopy = {...this.state};
        const {emailValue, passwordValue, confirmValue} = this.state;
        const emailValidification = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        registerstorage.email = stateCopy.emailValue;
        registerstorage.password = stateCopy.passwordValue;
        e.preventDefault();

        if(passwordValue.length < 8 || passwordValue.length > 32){
            alert('Please input a password between 8 and 32 characters long');
        } else if (passwordValue !== confirmValue){
            alert('Please make sure your passwords fully match');
        } else if (!emailValidification.test(emailValue)){
            alert('Please enter a valid email address');
        } else {
            this.setState({
                pageLink: true
            });
        }
        // if(this.state.emailValue.length === 0 || this.state.passwordValue.length === 0 || this.state.confirmValue.length === 0){
        //     alert('put stuff in the dang fields');
        //     return;
        // } else if (this.state.passwordValue.length !== this.state.confirmValue.length){
        //     alert('match yer daggum passwords')
        //     return;
        // } else {
        //     this.setState({
        //         pageLink: true
        //     })
        // }
    }
    emailChange(e){
        this.setState({
            emailValue: e.target.value
        })
    }
    passwordChange(e){
        this.setState({
            passwordValue: e.target.value
        })
    }
    confirmChange(e){
        this.setState({
            confirmValue: e.target.value
        })
    }
    render(){
        return (
            <form>
                <div>
                    <label>Email</label>
                    <input type='text' value={this.state.emailValue} onChange={this.emailChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' value={this.state.passwordValue} onChange={this.passwordChange}/>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type='password' value={this.state.confirmValue} onChange={this.confirmChange}/>
                </div>
                {!this.state.pageLink ? <Link to={''} onClick={this.goBack} className='btn red darken-3'>Submit</Link> : <Redirect push to={'/diet-selection'} onClick={this.goBack} className='btn green darken-2'>Submit</Redirect>}
            </form>
        );
    }
}

export default RegisterHide;