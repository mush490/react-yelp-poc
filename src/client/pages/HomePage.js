import React from 'react';
import { connect } from 'react-redux';
import { getLocation } from '../actions';
import { searchRestaurants, randomRestaurant } from '../actions';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.getLocation();
    }

    render(){
        return (
            <div className="center-align" style={{ marginTop: '200px' }} >
                <h3>Welcome</h3>
                <p>Check out these awesome features</p>
                {this.renderLocation()}
                <button onClick={this.getResturant.bind(this)}>Get Restaurant</button>
            </div>
        );
    }

    getResturant(){
        console.log('in restaurant: '+this.props);
        if (this.props.location)
            this.props.randomRestaurant('pizza',this.props.location.coords.latitude,this.props.location.coords.longitude);
    }
    
    renderLocation(){
        if (!this.props.location){
            return <div>Location Loading...</div>
        } else {
            return (
                <div>{this.renderRestaurant()}
                </div>
            );
        }  
    }

    renderRestaurant(){
        if (this.props.restaurant){

            return <div>{this.props.restaurant.name}</div>
        } else {
            return <div>HI</div>
        }
    }
}

function mapStateToProps({ location, restaurant}) {
    return { location: location,
             restaurant: restaurant };
            
}

export default {
    component: connect(mapStateToProps, {getLocation,searchRestaurants,randomRestaurant})(HomePage)
};


