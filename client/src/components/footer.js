import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class Footer extends Component {
    render() {
        return (
            <footer className="mealsFooter">
                <div className="mealsMyMeals"><Link to='/mymeals'><i className="far fa-list-alt"></i></Link></div>
                <div className="mealsGroceries"><Link to='/grocery'><i className="fas fa-shopping-cart"></i></Link></div>
                <div className="mealsSettings"><Link to='/settings'><i className="fas fa-cogs"></i></Link></div>
            </footer>
        );
    };
};

export default Footer;