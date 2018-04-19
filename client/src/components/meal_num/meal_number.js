import React, { Component } from 'react';
import axios from 'axios';
import Header from '../general/header';
import MealNumButton from './meal-num-btn';
import Next from '../general/next_button';
import '../../assets/css/mealNumber.css';
import {Link, Redirect} from 'react-router-dom';
import mealdb from '../info_storage/meal-db';
import mealschosen from '../info_storage/meals-chosen';
import LogoHeader from '../general/logo-header';
import Loader from '../general/loader';
import auth from '../general/auth';
import ErrorModal from '../general/error-modal';

class MealNumber extends Component {
    constructor(props) {
        super(props);

        this.modalClose = this.modalClose.bind(this);

        this.state = {
            confirmingMeals: false,
            numOfMeals: [],
            showLoader: false,
            modalStatus: false,
            message: ''
        };
    };

    setNumberOfMeals(num) {
        while (mealschosen.length) {
            mealschosen.pop();
        };
        for (var i= 0; i < num; i++){
            let randomIndex = Math.floor(Math.random() * mealdb.length);
            mealschosen.push(mealdb[randomIndex]);
            mealdb.splice(randomIndex,1);
        }
        this.setState({
            confirmingMeals: true
        });
    };

    storeNumChoice(num){
        this.setState({
            numOfMeals: num
        });
    }
    
    getRecipes() {        
        this.setState({
            showLoader: true
        });

        axios({
            url: 'http://localhost:8080/frontend/Ding-FINAL/endpoints/meals/newRecipes.php',
            // url: 'http://localhost:8888/dingLFZ/endpoints/mealGen.php',
            // url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/meals/newRecipes.php',
            method: 'post',
            data: {
                session_ID: localStorage.ding_sessionID
            }
        }).then( resp => {
            console.log('Meal gen response: ', resp);

            this.setState({
                showLoader: false
            });

            for (var i=0; i < resp.data.length; i++) {
                mealdb.push(resp.data[i]);
            };

            if (typeof resp.data === undefined) {
                this.setState({
                    modalStatus: true,
                    message: "Server Error. Please try again later."
                });
            };

            if (!this.state.modalStatus) {
                this.setNumberOfMeals(this.state.numOfMeals);                
            };
        }).catch( err => {
            console.log('Meal gen error: ', err);

            this.setState({
                showLoader: false
            });
        });
    };

    modalClose() {
        this.setState({
            modalStatus: false
        });
    };

    render() {

        return (
            <div className='mealNumContainer'>
                {this.state.modalStatus && <ErrorModal message={this.state.message} onClick={this.modalClose} />}
                {this.state.showLoader && <Loader />}
                <LogoHeader />
                <div className="container">
                    <Header title={'How Many Recipes?'} />
                    <div className="button-column collection" style={{border: 'none'}}>
                        <MealNumButton title={'1'} style={'button'} determineSelected={ this.state.numOfMeals.includes('1')} mealnumclick={this.storeNumChoice.bind(this)}/>  
                        <MealNumButton title={'3'} style={'button'} determineSelected={ this.state.numOfMeals.includes('3')} mealnumclick={this.storeNumChoice.bind(this)}/>
                        <MealNumButton title={'5'} style={'button'} determineSelected={ this.state.numOfMeals.includes('5')} mealnumclick={this.storeNumChoice.bind(this)}/>   
                        <MealNumButton title={'7'} style={'button'} determineSelected={ this.state.numOfMeals.includes('7')} mealnumclick={this.storeNumChoice.bind(this)}/>   
                    </div>  
                    <div className="right" style={{marginTop: `2.2vh`}}>
                        <Next onclick={this.getRecipes.bind(this)} />          
                    </div>
                    {this.state.confirmingMeals && <Redirect path to={{pathname: '/mymeals', state: {confirmingMeals: true}}} />}
                </div>                
            </div>
        );
    };
};

export default auth(MealNumber);