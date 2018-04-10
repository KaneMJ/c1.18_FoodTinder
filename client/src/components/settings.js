import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LogoHeader from './logo-header';
import Footer from './footer';

class Settings extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (                      
            <div className='settingsContainer'>
                <LogoHeader />
                <h2 className='settingsHeader lobsterFont'>Settings</h2>
                <button className='settingsButton oxygenFont'><Link to='/diet-settings'>Reset Filters</Link></button>
                <br/>
                <button className='settingsButton oxygenFont'><Link to='meal-num-settings'>Add Meals</Link></button>
                <br/>
                <button className='settingsButton oxygenFont'><Link to='/'>Logout</Link></button>
                <Footer />  
            </div>      
        )
    }
}

export default Settings;