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

class Meals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meals: mealschosen,
            showDetails: false,
            confirmingMeals: false,
            mealDetail: {
                name: '',
                image: '',
                ingredients: '',
                instructions: '',
                nutrition: '',
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
            // url: 'http://localhost:8080/frontend/Ding-FINAL/endpoints/loginMealGrab.php',
            // url: 'http://localhost:8888/dingLFZ/endpoints/loginMealGrab.php',
            url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/meals/userCurrentMeals.php',
            method: 'post',
            data: {
                session_ID: localStorage.ding_sessionID
            }
            }).then((resp) => {
            console.log('Login meals works: ', resp);
        }).catch((err) => {
            console.log(err);
        });     
    };

    determineMealConfirmation() {
        console.log(this.props);
        if (!this.props.location.state){
            this.setState({
                confirmingMeals: false
            });
            return;
        }
        const {confirmingMeals} = this.props.location.state;
        this.setState({
            confirmingMeals: confirmingMeals
        });
    };

    componentWillMount() {
        this.determineMealConfirmation();
    };

    closeMealConfirm() {
        this.setState({
            confirmingMeals: false
        });
    };

    mealClicked(number, mealInfo) {
        console.log('Infos: ', mealInfo);
        axios({
            url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/meals/recipeInstructions.php',
            method: 'post',
            data: {
                'recipe_id': mealInfo.recipe_id,
                'session_ID': localStorage.ding_sessionID
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( resp => {
            console.log('Ingr: ', resp)
        })
        // this.setState({
        //     showDetails: true
        // });
    };

    hideDetails(){
        this.setState({
            showDetails: false
        });
    };

    removeMeal(event, index){
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
            return <MealCreator mealInfo={meal} key={index} number={index} onclick={this.mealClicked.bind(this)} deleteItem={this.removeMeal.bind(this)} completion={this.state.completeMeals[index]} deleteable={this.state.confirmingMeals}/>
        });

        const {mealDetail} = this.state;


        return(
            <div className="mealsContainer">
                <LogoHeader add={true}/>
                <main className="mealsMainArea">
                    {this.state.confirmingMeals && <MealConfirm confirming={this.state.confirmingMeals} closeconfirm={this.closeMealConfirm.bind(this)} />}
                    {mealMap}
                    {this.state.showDetails && <Details mealInfo={mealDetail} hide={this.hideDetails.bind(this)} complete={this.completeMeal.bind(this)} index={this.state.mealDetail.index} hidecomplete={this.state.confirmingMeals} />}
                </main>
                <Footer currentPage='meals'/>
            </div>
        );
    };
};

export default Meals;