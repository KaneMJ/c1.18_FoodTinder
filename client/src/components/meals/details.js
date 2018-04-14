import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../general/footer';
import LogoHeader from '../general/logo-header';

class Details extends Component {
    constructor(props) {
        super(props);
        
        this.headerClicked = this.headerClicked.bind(this);

        this.state = {
            recipeComplete: false,
            ingrTarget: 'detailsSelectedList',
            instrTarget: '',
            nutrTarget: '',
            ingrList: {
                display: 'inline'
            },
            instrList: {
                display: 'none'
            },
            nutrList: {
                display: 'none'
            }
        };        
    };

    headerClicked(target) {
        let selectedSection= {};
        switch (target){
            case 'ingr':
                selectedSection = {
                    ingrTarget: 'detailsSelectedList',
                    instrTarget: '',
                    nutrTarget: '',
                    ingrList: {
                        display: 'inline'
                    },
                    instrList: {
                        display: 'none'
                    },
                    nutrList: {
                        display: 'none'
                    }
                };
                break;
            case 'instr':
                selectedSection = {
                    ingrTarget: '',
                    instrTarget: 'detailsSelectedList',
                    nutrTarget: '',
                    ingrList: {
                        display: 'none'
                    },
                    instrList: {
                        display: 'inline'
                    },
                    nutrList: {
                        display: 'none'
                    }
                };
                break;
            case 'nutr':
                selectedSection = {
                    ingrTarget: '',
                    instrTarget: '',
                    nutrTarget: 'detailsSelectedList',
                    ingrList: {
                        display: 'none'
                    },
                    instrList: {
                        display: 'none'
                    },
                    nutrList: {
                        display: 'inline'
                    }
                };
                break;
        };
        this.setState({
            ...selectedSection
        });
    };

    recipeComplete() {
      
    }

    render() {

        console.log(this.props);

        const {mealInfo, hide, index, complete} = this.props;
        
        const instrMap = mealInfo.instructions.map((item, index) => {
            return <li className='collection-item' key={index}>{index+1}. {mealInfo.instructions[index].step}</li>
        });

        const ingrMap = mealInfo.ingredients.map((item, index) => {
            return <li className='collection-item' key={index}>{`${mealInfo.ingredients[index].amount} ${mealInfo.ingredients[index].unit_type} ${mealInfo.ingredients[index].ingredient}`}</li>
        });

        // const nutrMap = mealInfo[1].map((item, index) => {
        //     return <li className='collection-item' key={index}>{index+1}. {mealInfo[3].step}</li>
        // });

        return(
            <div className="detailsContainer">
                <LogoHeader onClick={hide} back={true} style={{position: 'fixed'}}/>
                <main className="detailsMainArea">
                    <img src={mealInfo.image} alt="" className="detailsImg" />
                    <h3 className='detailsName'>{mealInfo.name}</h3>
                    <h5 className='detailsTime'>Time Commitment: 30 minutes</h5>
                    <div className={"detailsIngredientsHead " + this.state.ingrTarget} onClick={()=>this.headerClicked('ingr')} >Ingredients</div>
                    <div className={"detailsInstructionsHead " + this.state.instrTarget} onClick={()=>this.headerClicked('instr')} >Instructions</div>
                    <div className={"detailsNutritionHead " + this.state.nutrTarget} onClick={()=>this.headerClicked('nutr')} >Nutrition</div>
                    <div className="detailsIngredientsList" style={this.state.ingrList}>
                        <ul className='collection'>
                            {ingrMap}
                        </ul>
                    </div>
                    <div className="detailsInstructionsList" style={this.state.instrList}>
                        <ul className='collection'>
                            {instrMap}
                        </ul>
                        {!this.props.hidecomplete && <button className="completeButton btn green darken-2" onClick={()=>complete(index)}>Complete</button>}
                    </div>
                    <div className="detailsNutritionList" style={this.state.nutrList}>
                        <ul className='collection'>
                            <li className='collection-item'>WIP please don't sue</li>
                        </ul>
                    </div>
                </main>
                <Footer />
            </div>
        );
    };
};

export default Details;