import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import Settings from '../settings/settings';
import LogoHeader from '../general/logo-header';
import Footer from '../general/footer';
import '../../assets/css/grocery.css';

class Grocery extends Component{
    constructor(props){
        super(props);

    }
    
    render(){
        return (
            <div className="groceryContainer Oxygen">
            <LogoHeader style={{position: 'fixed'}}/>
            <main className="mainArea">
                <h4 className="head card-panel lobsterFont z-depth-2">List</h4>
                <div className="list">
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item1' />
                                <label className='name oxygenFont' htmlFor='item1'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item2' />
                                <label className='name oxygenFont' htmlFor='item2'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item3' />
                                <label className='name oxygenFont' htmlFor='item3'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item4' />
                                <label className='name oxygenFont' htmlFor='item4'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item5' />
                                <label className='name oxygenFont' htmlFor='item5'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item6' />
                                <label className='name oxygenFont' htmlFor='item6'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item7' />
                                <label className='name oxygenFont' htmlFor='item7'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item8' />
                                <label className='name oxygenFont' htmlFor='item8'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item9' />
                                <label className='name oxygenFont' htmlFor='item9'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item10' />
                                <label className='name oxygenFont' htmlFor='item10'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item11' />
                                <label className='name oxygenFont' htmlFor='item11'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item12' />
                                <label className='name oxygenFont' htmlFor='item12'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item13' />
                                <label className='name oxygenFont' htmlFor='item13'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item14' />
                                <label className='name oxygenFont' htmlFor='item14'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item15' />
                                <label className='name oxygenFont' htmlFor='item15'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item16' />
                                <label className='name oxygenFont' htmlFor='item16'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item17' />
                                <label className='name oxygenFont' htmlFor='item17'>14oz beans</label>
                        </div>
                        <div className="item">
                                <input type='checkbox' className='check filled-in' id='item18' />
                                <label className='name oxygenFont' htmlFor='item18'>14oz beans</label>
                        </div>
                </div>
            </main>
            <Footer currentPage='grocery' />
            </div>
        );
    };
};

export default Grocery;