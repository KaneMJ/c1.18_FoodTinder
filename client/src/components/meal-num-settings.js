import React, { Component } from 'react';
import Header from './header';
import MealNumButton from './meal-num-btn';
import Next from './next_button';
import '../assets/css/mealNumber.css';
import {Link} from 'react-router-dom';
import mealdb from './meal-db';
import mealschosen from './meals-chosen';
import LogoHeader from './logo-header';

class MealNumberSettings extends Component {

    setNumberOfMeals(num){
        while (mealschosen.length){
            mealschosen.pop();
            console.log('Meals chosen: ', mealschosen);
        }
        for (var i= 0; i< num; i++){
            let randomIndex = Math.floor(Math.random() * mealdb.length);
            mealschosen.push(mealdb[randomIndex]);
            mealdb.splice(randomIndex,1);
            console.log('Meals chosen: ', mealschosen);
        }
    }

    render() {
        return (
            <div>
                <LogoHeader />
                <div className="container">
                    <Header title={'Amount Of Meals?'} />
                    <div className="button-column collection">
                        <MealNumButton title={'1'} style={'button'} mealnumclick={this.setNumberOfMeals.bind(this)}/>  
                        <MealNumButton title={'3'} style={'button'} mealnumclick={this.setNumberOfMeals.bind(this)}/>
                        <MealNumButton title={'5'} style={'button'} mealnumclick={this.setNumberOfMeals.bind(this)}/>   
                        <MealNumButton title={'7'} style={'button'} mealnumclick={this.setNumberOfMeals.bind(this)}/>   
                    </div>  
                    <div className="right bottom">
                    <Link to='/mymeals'><Next style={'bottom'} name='Done'/></Link>                  
                    </div>  
                </div>                
            </div>
        );
    };
};

export default MealNumberSettings;