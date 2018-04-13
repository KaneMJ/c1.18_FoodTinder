import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import registerstorage from '../info_storage/register-storage';

class RegisterHide extends Component{
    constructor(props){
        super(props);

        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
        this.state = {
            emailValue: '',
            passwordValue: '',
            confirmValue: '',
            emailFocused: false,
            passwordFocused: false,
            confirmFocused: false,
            emailCheck: {
                textDecoration: 'none'
            },
            passwordLength: {
                textDecoration: 'none'
            },
            passwordCharacters: {
                textDecoration: 'none'
            },
            confirmMatches: {
                textDecoration: 'none'
            }
        }
    }
    emailChange(e) {
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
        registerstorage.email = e.target.value;
    };

    passwordChange(e) {
        this.setState({
            passwordValue: e.target.value
        }, () => {
            this.checkPWLength();
            this.checkPWChars();
        });
        registerstorage.password = e.target.value;
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

    confirmChange(e) {
        if (e.target.value === this.state.passwordValue){
            this.setState({
                confirmValue: e.target.value,
                confirmMatches: {textDecoration: 'line-through'}
            });
        } else {
            this.setState({
                confirmValue: e.target.value,
                confirmMatches: {textDecoration: 'none'}
            });
        };
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
        } else if (targetField === 'confirm'){
            this.setState({
                confirmFocused: true
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
        } else if (targetField === 'confirm'){
            this.setState({
                confirmFocused: false
            });
        };
    };

    render(){
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
                    <div className='col s8 offset-s2 inputField'>
                        <label className='white-text'>Confirm Password</label>
                        <input type='password' className='white-text' value={this.state.confirmValue} onChange={this.confirmChange} onFocus={()=>this.fieldFocused('confirm')} onBlur={()=>this.fieldBlurred('confirm')}/>
                        {this.state.confirmFocused && <div className='validationText1'>
                            <div style={this.state.confirmMatches} >
                                {this.state.confirmMatches.textDecoration === 'line-through' && <div className='checkmark'>✓</div>}Must match current password
                            </div>
                        </div>}
                    </div>
                    <div className='col s2' />
                    <Link to='/diet-selection' className='btn center-align blue darken-2 waves-effect waves-light'>Register</Link>
                </form>
            </div>
        );
    };
};

export default RegisterHide;