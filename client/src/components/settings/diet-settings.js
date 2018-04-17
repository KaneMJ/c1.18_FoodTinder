import React, { Component } from 'react';
import Header from '../general/header';
import Button from '../general/button';
import Next from '../general/next_button';
import newFilter from '../info_storage/new-filter-storage';
import '../../assets/css/diet-selection.css';
import {Link} from 'react-router-dom';
import LogoHeader from '../general/logo-header';


class DietSettings extends Component {   
    constructor(props) {
        super(props);

        this.handleSelected = this.handleSelected.bind(this);

        this.state = {
            selected: [],
            value: false
        };
    };
    
    handleSelected(buttonObject) {
        const { selected } = this.state;

        if(!selected.includes(buttonObject.props.title)) {
            this.setState({
                selected: [buttonObject.props.title],
                value: true
            });
        }
        newFilter.diet = buttonObject.props.title;
    };

    render() {
        const { handleSelected } = this;

        return (
            <div class='dietSettingsContainer'>
                <LogoHeader back={true} location={'/settings'}/>
                <div className="container">
                    <Header title={'What\'s Your Type?'}/>
                    <div className="center-align" style={{marginTop: `2vh`}}>
                        <Button title={'None'} descrip={'Send It'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('None')} />  
                        <Button title={'Vegetarian'} descrip={'Lover Of Greens'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Vegetarian')} />   
                        <Button title={'Vegan'} descrip={'Veggie Fanatic'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Vegan')} />
                        <Button title={'Ketogenic'} descrip={'Coachella Bod Meal Plan'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Ketogenic')} />        
                    </div>  
                    <div className="right" style={{marginTop: `3vh`}}>
                        {(this.state.value) && <Link to='/allergy-settings'><Next /></Link> }                   
                    </div>     
                </div>                
            </div>
        );  
    };
};

export default DietSettings;