import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../assets/css/settings.css';
import LogoHeader from '../general/logo-header';
import Footer from '../general/footer';

class Settings extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (                      
            <div className='settingsContainer'>
                <LogoHeader />
                <div className="mainContainer container">
                    <h4 className='card-panel settingsHeader lobsterFont z-depth-2'>Settings</h4>
                    <Link to='/diet-settings'className='settingsButton oxygenFont btn-large'>Reset Filters</Link>
                    <Link to='meal-num-settings' className='settingsButton oxygenFont btn-large'>Add Meals</Link>
                    <Link to='/' className='settingsButton oxygenFont btn-large'>Logout</Link>                    
                </div>
                <Footer currentPage='settings' />  
            </div>      
        );
    };
};

export default Settings;