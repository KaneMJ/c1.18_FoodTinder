import React, {Component} from 'react';
import LoginHide from './loginhide';
import RegisterHide from './registerhide';

class Login extends Component{
    constructor(props){
        super(props);

        this.loginClicked = this.loginClicked.bind(this);
        this.goBackLogin = this.goBackLogin.bind(this);
        this.registerClicked = this.registerClicked.bind(this);
        this.goBackRegister = this.goBackRegister.bind(this);
        this.state = {
            loginHide: false,
            registerHide: false
        }
    }
    loginClicked(e){
        e.preventDefault();
        this.setState({
            loginHide: !this.state.loginHide
        });
    }
    registerClicked(e){
        e.preventDefault();
        this.setState({
            registerHide: !this.state.registerHide
        });
    }
    goBackLogin(){
        this.setState({
            loginHide: !this.state.loginHide
        });
    }
    goBackRegister(){
        this.setState({
            registerHide: !this.state.registerHide
        });
    }
    render(){
        return (
            <div className="loginContainer">
                <h2 className='loginLogo'>Ding</h2>
                <h4 className='loginSlogan'>Dinner is served</h4>
                <div className='loginButtons'>
                    {this.state.loginHide && <LoginHide returnFX={this.goBackLogin}/>}
                    {this.state.registerHide && <RegisterHide returnFX={this.goBackRegister}/>}
                    {!this.state.loginHide && !this.state.registerHide && <button className="loginButton btn-large black" onClick={this.loginClicked}>Login</button>}
                    <br />
                    {!this.state.loginHide && !this.state.registerHide && <button className="registerButton btn-large black" onClick={this.registerClicked}>Register</button>}
                </div>
            </div>
        );
    }
};

export default Login;