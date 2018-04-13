import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../assets/css/meals.css'
import Details from './details';
import mealdb from '../info_storage/meal-db';
import mealschosen from '../info_storage/meals-chosen';
import MealCreator from './meal-creator';
import MealConfirm from './mealconfirm';
import LogoHeader from '../general/logo-header';
import Footer from '../general/footer';
import axios from 'axios';

class Meals extends Component{
    constructor(props) {
        super(props);

        this.state = {
            meals: mealschosen,
            showDetails: false,
            confirmingMeals: this.determineMealConfirmation.bind(this),
            mealDetail: {
                name: '',
                image: '',
                ingredients: '',
                instructions: '',
                index: ''
            },
            completeMeals: [
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'}
            ]
        };
    };

    componentDidMount() {
        console.log('pulling meals');
        axios({
            url: 'http://localhost:80/frontend/Ding-FINAL/endpoints/loginMealGrab.php',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((resp) => {
            console.log('WE GOT USER MEALS', resp);
        }).catch((err) => {
            console.log(err);
        });     
    };

    determineMealConfirmation() {
        if (!this.props.location.state){
            return false
        };
        const {confirmingMeals} = this.props.location.state;
        return confirmingMeals;
    };

    mealClicked(number, ingredients, instructions, name, image) {
        console.log(number);
        const newMealInfo = {
            name: name,
            image: image,
            ingredients: ingredients,
            instructions: instructions,
            index: number
        }
        this.setState({
            mealDetail: newMealInfo,
            showDetails: true
        });
    };

    hideDetails() {
        this.setState({
            showDetails: false
        });
    };

    removeMeal(event, index) {
        event.stopPropagation();
        let {meals} = this.state;
        meals.splice(index, 1);
        this.setState({
            meals: meals
        })
        this.addSubstituteMeal();
    };

    completeMeal(index) {
        let compMeals = [...this.state.completeMeals];
        compMeals[index] = {filter: 'grayscale(100%)'};
        this.setState({
            completeMeals: compMeals,
            showDetails: false
        });
    };

    addSubstituteMeal() {
        let randomIndex = Math.floor(Math.random() * mealdb.length);
        mealschosen.push(mealdb[randomIndex]);
        mealdb.splice(randomIndex, 1);
    };

    render() {

        const mealMap = this.state.meals.map((meal, index) => {
            return <MealCreator imgSrc={meal.imgSrc} mealName={meal.mealName} key={index} number={index} ingredients={meal.mealIngr} instructions={meal.mealInstr} onclick={this.mealClicked.bind(this)} deleteItem={this.removeMeal.bind(this)} completion={this.state.completeMeals[index]}/>
        });

        const {name, image, ingredients, instructions} = this.state.mealDetail;

        return(
            <div className="mealsContainer">
            <LogoHeader add={true}/>
                <main className="mealsMainArea">
                    {this.state.confirmingMeals() && <MealConfirm confirming={this.state.confirmingMeals()} />}
                    {mealMap}
                    {this.state.showDetails && <Details name={name} image={image} ingredients={ingredients} instructions={instructions} hide={this.hideDetails.bind(this)} complete={this.completeMeal.bind(this)} index={this.state.mealDetail.index} />}
                </main>
            <Footer currentPage='meals' />
            </div>
        );
    };
};

export default Meals;