var React = require('react');
var WeatherForm = require('../components/WeatherForm.jsx');
var WeatherStore = require('../stores/WeatherStore.js');
var WeatherActions = require('../actions/WeatherActions.js');
var WeatherPreview = require('../components/WeatherPreview.jsx');

/* 
    Main component that houses the other 2 components we will be using.  
*/
var WeatherApp = React.createClass({
    /*
        The app handles the getWeatherFunction.  You will see below how we pass it as 
        a prop to the child components.
    */
    
    handleGetWeather: function(zipcode, country){
        WeatherActions.getWeather({
            zipcode: zipcode,
            country: country
        });
    },
    
    /*
        HTML is written directly into this JS file.  This might be new for you, 
        but remember, it isn't a bad practice especially if each of your component
        just does one thing and nothing else.
    */
    render: function(){
       return(
         <div className="row">
            //notice how we're passing an attribute onGetWeather here.  This will ensure
            //the child has access to the method declared in the parent.
            <WeatherForm onGetWeather={this.handleGetWeather} />
            <WeatherPreview />
        </div>
        );
    }
});

module.exports = WeatherApp;
