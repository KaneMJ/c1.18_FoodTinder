import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'grey'
        };
    };

    componentWillReceiveProps(nextProps, prevState) {
        if (nextProps.determineSelected) {
            this.setState({
                color: 'rgb(6, 101, 156)',
            });
        } else {
            this.setState({
                color: 'gray',
            });
        };   
    };

    render() {
        return (
            <div>
                <a onClick={this.props.selectedCheck.bind(null, this)} style={{backgroundColor: this.state.color}} className={`btn-desk waves-effect waves-light btn z-depth-2 ${this.props.style}`}>
                <div>
                    <div className="title-container oxygenFont">
                       {this.props.title} 
                    </div>
                     <div>
                       {this.props.descrip}   
                    </div>                                       
                </div>
                </a>
            </div>
        );
    };
};

export default Button;
