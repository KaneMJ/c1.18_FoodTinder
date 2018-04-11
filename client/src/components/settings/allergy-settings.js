import React, { Component } from 'react';
import Header from '../general/header';
import Button from '../general/button';
import Next from '../general/next_button';
import newFilter from '../info_storage/new-filter-storage';
import '../../assets/css/allergy-selection.css';
import {Link} from 'react-router-dom';
import LogoHeader from '../general/logo-header';


class AllergySettings extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            selected: []
        };

        this.handleSelected = this.handleSelected.bind(this);
    };

    handleSelected(buttonObject) {
        const { selected } = this.state;
        const { title } = buttonObject.props;

        if(!selected.includes(title)) {
            this.setState({
                selected: [...selected, title]
            },() => {
                newFilter.allergy = this.state.selected;
            });
        } else {
            let currentSelected = selected;
            let itemLocation = currentSelected.indexOf(title);
            currentSelected.splice(itemLocation, 1);
            this.setState({
                selected: currentSelected
            },() => {
                newFilter.allergy = this.state.selected;
            });
        };
    };

    render() {   
        const { handleSelected } = this;
        const { selected } = this.state;
        return (  
         <div>            
             <LogoHeader back={true} location={'/diet-settings'}/>
            <div className="container">
                <Header title={'Any Allergies?'} />
                <div className="row">
                    <Button title={'Gluten'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Gluten')} />  
                    <Button title={'Dairy'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Dairy')} />     
                    <Button title={'Tree Nut'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Tree Nut')} />   
                    <Button title={'Peanuts'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Peanuts')} />   
                    <Button title={'Shellfish'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Shellfish')} />
                    <Button title={'Soy'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Soy')} />
                    <Button title={'Egg'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Egg')} />
                    <Button title={'Wheat'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Wheat')} />
                    <Button title={'Sesame'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Sesame')} />
                    <Button title={'Seafood'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Seafood')} />
                    <Button title={'Sulfite'} selectedCheck={ handleSelected } determineSelected={ selected.includes('Sulfite')} />
                </div>  
                <div className="right" style={{marginTop: `4vh`}}><Link to='/mymeals'>
                <Next style={'bottom'}/>
                </Link></div>  
            </div>             
         </div>
        );
    };
};

export default AllergySettings;