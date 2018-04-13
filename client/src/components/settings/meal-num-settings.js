import React, { Component } from 'react';
import Header from '../general/header';
import MealNumButton from '../meal_num/meal-num-btn';
import Next from '../general/next_button';
import '../../assets/css/mealNumber.css';
import {Link} from 'react-router-dom';
import mealdb from '../info_storage/meal-db';
import mealschosen from '../info_storage/meals-chosen';
import LogoHeader from '../general/logo-header';

class MealNumberSettings extends Component {

    setNumberOfMeals(num) {
        while (mealschosen.length) {
            mealschosen.pop();
        };

        for (var i= 0; i< num; i++) {
            let randomIndex = Math.floor(Math.random() * mealdb.length);
            mealschosen.push(mealdb[randomIndex]);
            mealdb.splice(randomIndex,1);
        };
    };

    render() {
        return (
            <div>
                <LogoHeader back={true} location={'/settings'}/>
                <div className="container">
                    <Header title={'Amount Of Meals?'} />
                    <div className="button-column collection">
                        <MealNumButton title={'1'} style={'button'} mealnumclick={this.setNumberOfMeals.bind(this)}/>  
                        <MealNumButton title={'3'} style={'button'} mealnumclick={this.setNumberOfMeals.bind(this)}/>
                        <MealNumButton title={'5'} style={'button'} mealnumclick={this.setNumberOfMeals.bind(this)}/>   
                        <MealNumButton title={'7'} style={'button'} mealnumclick={this.setNumberOfMeals.bind(this)}/>   
                    </div>                    
                    <Link to='/mymeals'className="right bottom"><Next style={'bottom'} name='Done'/></Link>                    
                </div>                
            </div>
        );
    };
};

export default MealNumberSettings;