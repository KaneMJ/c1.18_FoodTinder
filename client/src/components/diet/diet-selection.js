import React, { Component } from 'react';
import Header from '../general/header';
import Button from '../general/button';
import Next from '../general/next_button';
import registerstorage from '../info_storage/register-storage';
import '../../assets/css/diet-selection.css';
import {Link} from 'react-router-dom';
import LogoHeader from '../general/logo-header';

class DietSelection extends Component {   
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            value: false
        };

        this.handleSelected = this.handleSelected.bind(this);
    };

    handleSelected(buttonObject) { 
        const { selected } = this.state;

        if(!selected.includes(buttonObject.props.title)) {
            this.setState({
                selected: [buttonObject.props.title],
                value: true
            });
        }
        registerstorage.diet = buttonObject.props.title.toLowerCase();
    };

    render() {
        const { handleSelected } = this;

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
                    {this.state.value && <Link to='/allergy-selection'><Next /></Link>}
                    </div>     
                </div>                
            </div>
        );  
    };
};

export default DietSelection;