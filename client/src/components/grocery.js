import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import Settings from './settings';

class Grocery extends Component{
    constructor(props){
        super(props);


    }
    render(){
        return (
            <div className="groceryContainer Oxygen">
            <header className="groceryHeader" style={{paddingRight: `26px`}}>
                    <div className="groceryBack"><Link to='/mymeals'><i className="fas fa-arrow-left iconcolor"></i></Link></div>
                    <div className="groceryLogo lobsterFont">Ding</div>
                    <div className="groceryAdd"></div>
            </header>
            <main className="groceryMainArea">
                    <h3 className="groceryHead card-panel lobsterFont">Grocery List</h3>
                    <div className="groceryList">
                    <h4 className="grocerySection lobsterFont">Beans</h4>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName oxygenFont'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName oxygenFont'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName oxygenFont'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName oxygenFont'>14oz beans</label>
                    </div>
                    <h3 className="grocerySection lobsterFont">More Beans</h3>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <h3 className="grocerySection lobsterFont">Dessert Beans</h3>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <h3 className="grocerySection">More Beans So It Scrolls</h3>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    </div>
            </main>
            <footer className="groceryFooter">
                    <div className="groceryMygrocery"><Link to='/mymeals'><i className="far fa-list-alt"></i></Link></div>
                    <div className="groceryGroceries"><i className="fas fa-shopping-cart"></i></div>
                    <div className="grocerySettings"><Link to='/settings'><i className="fas fa-cogs"></i></Link></div>
            </footer>
            </div>
        )
    }
}

export default Grocery;