import React, { Component } from 'react';
import Header from './header';
import Button from './button';
import Next from './next_button';
import registerstorage from './register-storage';
import '../assets/css/diet-selection.css';
import {Link} from 'react-router-dom';
import LogoHeader from './logo-header';


class DietSelection extends Component {   
    constructor(props) {
        super(props);

        this.state = {
            selected: []
        };

        this.handleSelected = this.handleSelected.bind(this);
    };
    
    handleSelected(buttonObject) {
        console.log("This is the thing", buttonObject);  
        const { selected } = this.state;

        if(!selected.includes(buttonObject.props.title)) {
            this.setState({
                selected: [buttonObject.props.title]
            });
        }
        registerstorage.diet = buttonObject.props.title;
        console.log(registerstorage); 
        // else {
        //     debugger;
        //     //remove the item from the array and replace with new title
        //     let currentArray = selected;      
        //     currentArray.splice(0, 1);
        //     this.setState({
        //         selected: currentArray
        //     });
        // };
    };

    render() {
        const { handleSelected } = this;
        console.log(this.state.selected);

        return (
            <div>
                <LogoHeader />
                <div className="container">
                    <Header title={'What\'s Your Type?'}/>
                    <div className="center-align" style={{marginTop: `2vh`}}>
                        <Button title={'None'} descrip={'Send It'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('None')} />  
                        <Button title={'Ketogenic'} descrip={'Coachella Bod Meal Plan'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Ketogenic')} />     
                        <Button title={'Vegetarian'} descrip={'Lover Of Greens'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Vegetarian')} />   
                        <Button title={'Vegan'} descrip={'Veggie Fanatic'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Vegan')} />   
                        <Button title={'Pescatarian'} descrip={'Fish N\' Greens'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Pescatarian')} />
                    </div>  
                    <div className="right" style={{marginTop: `3vh`}}>
                    <Link to='/allergy-selection'><Next /></Link>                  
                    </div>     
                </div>                
            </div>
        );  
    };
};

export default DietSelection;