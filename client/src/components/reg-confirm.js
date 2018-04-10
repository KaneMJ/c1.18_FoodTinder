import React, {Component} from 'react';
import registerstorage from './register-storage';
import '../assets/css/reg-confirm.css'
import {Link} from 'react-router-dom';
import LogoHeader from './logo-header';

class RegisterConfirm extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div className='regConfirmContainer container'>
                <div className='nav-wrapper blue darken-2 z-depth-1'>
                    <div className='brand-logo center white-text'>Ding</div>
                </div>
                <h3 className='center regConfirmHeader'>Confirm Choices</h3>
                <div className='regConfirmSelectionArea center'>
                    <div className='regConfirmLabel'>Email Address</div>
                    <div>{registerstorage.email}</div>
                    <div className='regConfirmLabel'>Diet Selection</div>
                    <div>{registerstorage.diet}</div>
                    <div className='regConfirmLabel'>Allergies</div>
                    <div>{registerstorage.allergy.join(', ') || 'None'}</div>
                </div>
                <div className='regConfirmButtonContainer'>
                    <Link to='/' className='btn red darken-2'>Back to start</Link>
                    <Link to='/meal-number' className='btn blue darken-2'>All set!</Link>
                </div>
                <div className='page-footer bottom blue darken-2 z-depth-1 regConfirmFooter'>
                </div>
            </div>
        )
    }
}

export default RegisterConfirm;