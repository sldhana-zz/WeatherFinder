var React = require('react');
var WeatherForm = require('../components/WeatherForm.jsx');
var WeatherStore = require('../stores/WeatherStore.js');
var WeatherActions = require('../actions/WeatherActions.js');
var WeatherPreview = require('../components/WeatherPreview.jsx');

var WeatherApp = React.createClass({
    handleGetWeather: function(zipcode, country){
        WeatherActions.getWeather({
            zipcode: zipcode,
            country: country
        });
    },

    render: function(){
       return(
         <div className="row">
            <WeatherForm onGetWeather={this.handleGetWeather} />
            <WeatherPreview />
        </div>
        );
    }
});

module.exports = WeatherApp;
