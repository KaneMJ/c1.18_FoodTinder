import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/general.css';

class LogoHeader extends Component {
    render() {
        return (
            <header className="headerBar z-depth-2" style={this.props.style}>
                {(this.props.back) ? <div className="groceryBack empty" onClick={this.props.onClick}><Link to={this.props.location || '/mymeals'}><i style={{fontSize: `2rem`}} className="fas fa-arrow-left iconcolor"></i></Link></div> : <div className="empty"></div>}
                <div className="lobsterFont">Ding</div>
                {(this.props.add) ? <div className="groceryAdd empty"><Link to='/meal-number'><i style={{fontSize: `2rem`}} className="far fa-plus-square"></i></Link></div> : <div className="empty"></div>}
            </header>
        );
    };
};

export default LogoHeader; 