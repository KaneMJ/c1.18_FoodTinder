import React, {Component} from 'react';

class MealNumButton extends Component {

    setNumberOfMeals() {
        this.props.mealnumclick(this.props.title);
    };

    render() {
        return (
            <a className={`waves-effect waves-light btn oxygenFont mealButton ${this.props.style}`} onClick={this.setNumberOfMeals.bind(this)}>
                {this.props.title} <br/>
                {this.props.descrip}
            </a>
        );
    };
};

export default MealNumButton;