import React, { Component } from 'react';
import Header from './header';
import Button from './button';
import Next from './next_button';
import registerstorage from './register-storage';
import '../assets/css/allergy-selection.css';
import {Link} from 'react-router-dom';
import LogoHeader from './logo-header';


class AllergySelection extends Component {
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
                registerstorage.allergy = this.state.selected;
            });
        } else {
            let currentSelected = selected;
            let itemLocation = currentSelected.indexOf(title);
            currentSelected.splice(itemLocation, 1);
            this.setState({
                selected: currentSelected
            },() => {
                registerstorage.allergy = this.state.selected;
            });
        };
    };

    render() {
        // const titles = ['Gluten','Dairy','Tree Nut', 'Peanuts', 'Shellfish', 'Soy', 'Egg', 'Wheat', 'Sesame', 'Seafood', 'Sulfite'];
        // const mapped = titles.map((item, index) => (
        //     <Button key={index} title={item} selectedCheck={ handleSelected } determineSelected={ selected.includes({item}) } />     
        // ));
        const { handleSelected } = this;
        const { selected } = this.state;
        console.log(this.state.selected);
        return (  
         <div>            
             <LogoHeader />
            <div className="container">
                <Header title={'Any Allergies?'} />
                <div className="row">
                {/* {mapped} */}
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
                <div className="right" style={{marginTop: `4vh`}}><Link to='/register-confirm'>
                <Next style={'bottom'}/>
                </Link></div>  
            </div>             
         </div>
        );
    };
};

export default AllergySelection;