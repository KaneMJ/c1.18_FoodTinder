import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';


class LoginHide extends Component{
    constructor(props){
        super(props);

        this.fieldFocused = this.fieldFocused.bind(this);
        this.fieldBlurred = this.fieldBlurred.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {
            dataValue: '',
            emailValue: '',
            passwordValue: '',
            emailFocused: false,
            passwordFocused: false,
            emailCheck: {
                textDecoration: 'none'
            },
            passwordLength: {
                textDecoration: 'none'
            },
            passwordCharacters: {
                textDecoration: 'none'
            }
        };
    };

    //use thisprops.history.push to redirect user to the meals page inside then promise
    //use componentdidmount to call axios request to load the correct user meal 

    confirmUserInfo() {
            console.log('confirmation initiated');
            axios({
                url: 'http://localhost:80/frontend/Ding-FINAL/endpoints/user_login.php',
                method: 'post',
                data: {
                        email: this.state.emailValue,
                        password: this.state.passwordValue
                    },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((resp) => {
                console.log('WE GOT USER AUTH', resp);
                this.props.history.push('/mymeals');
            }).catch((err) => {
                console.log(err);
            });     
    }

    emailChange(e){
        const emailValidification = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({
            emailValue: e.target.value
        }, () => {
            if(emailValidification.test(this.state.emailValue)){
                const strikeThrough = {textDecoration: 'line-through'};
                this.setState({
                    emailCheck: strikeThrough
                });
            } else {
                const noStrike = {textDecoration: 'none'};
                this.setState({
                    emailCheck: noStrike
                });
            };
        });
    };

    passwordChange(e) {
        this.setState({
            passwordValue: e.target.value
        }, () => {
            this.checkPWLength();
            this.checkPWChars();
        });
    };

    checkPWLength() {
        if(this.state.passwordValue.length >= 8 && this.state.passwordValue.length <= 32){
            const strikeThrough = {textDecoration: 'line-through'};
            this.setState({
                passwordLength: strikeThrough
            });
        } else {
            const noStrike = {textDecoration: 'none'};
            this.setState({
                passwordLength: noStrike
            });
        };
    };

    checkPWChars() {
        const passwordChars = /^[a-z0-9]+$/i;
        if (passwordChars.test(this.state.passwordValue)){
            const strikeThrough = {textDecoration: 'line-through'};
            this.setState({
                passwordCharacters: strikeThrough
            });
        } else {
            const noStrike = {textDecoration: 'none'};
            this.setState({
                passwordCharacters: noStrike
            });
        };
    };

    goBack(e) {
        e.preventDefault();
        if(this.state.emailValue.length === 0 || this.state.passwordValue.length === 0){
            alert('put stuff in the dang fields');
            return;
        };
        this.props.returnFX();
    };

    fieldFocused(targetField) {
        if (targetField === 'email'){
            this.setState({
                emailFocused: true
            });
        } else if (targetField === 'password'){
            this.setState({
                passwordFocused: true
            });
        };
    };

    fieldBlurred(targetField) {
        if (targetField === 'email'){
            this.setState({
                emailFocused: false
            });
        } else if (targetField === 'password'){
            this.setState({
                passwordFocused: false
            });
        };
    };

    render(){
        const strikeThrough = {textDecoration: 'line-through'} 

        return (
            <div>
                <form onSubmit={this.goBack} className='row'>
                    <div className='col s8 offset-s2 inputField'>
                        <label className='white-text'>Email</label>
                        <input type='text' className='white-text' value={this.state.emailValue} onChange={this.emailChange} onFocus={()=>this.fieldFocused('email')} onBlur={()=>this.fieldBlurred('email')}/>
                        {this.state.emailFocused && <div style={this.state.emailCheck} className='validationText1'>
                            {this.state.emailCheck.textDecoration === 'line-through' && <div className='checkmark'>✓</div>}Must be valid email address
                        </div>}
                    </div>
                    <div className='col s2' />
                    <div className='col s8 offset-s2 inputField'>
                        <label className='white-text'>Password</label>
                        <input type='password' className='white-text' value={this.state.passwordValue} onChange={this.passwordChange} onFocus={()=>this.fieldFocused('password')} onBlur={()=>this.fieldBlurred('password')}/>
                        {this.state.passwordFocused && <div className='validationText2'>
                            <div style={this.state.passwordLength} >
                                {this.state.passwordLength.textDecoration === 'line-through' && <div className='checkmark'>✓</div>}Must be 8-32 characters long
                            </div>
                            <div style={this.state.passwordCharacters} >
                                {this.state.passwordCharacters.textDecoration === 'line-through' && <div className='checkmark'>✓</div>}Only contains numbers and letters
                            </div>
                        </div>}
                    </div>
                    <div className='col s2' />
                    <button to='/mymeals' className='btn center-align blue darken-2 waves-effect waves-light' onClick={this.confirmUserInfo.bind(this)}>Login</button>
                </form>
            </div>
        );
    };
};

export default LoginHide;