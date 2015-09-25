var React = require('react');
var WeatherStore = require('../stores/WeatherStore.js');
var Reflux = require('reflux');
/*
    Component to show the weather icon, the weather blurb and current temperature.
*/
var WeatherPreview = React.createClass({
    
    /*
        Using RefluxJS here to listen to the store being triggered.  Here, when the store changes, we
        invoke the onWeatherChange method.
    */
    mixins: [Reflux.listenTo(WeatherStore,"onWeatherChange")],
    
    /*
        This is the initial state we want to set our app with on page load.  But we will also use this if 
        the user enters invalid data.
    */
    defaultState: {
        description: 'Honestly, we wish this was the correct zipcode',
        temperature: null,
        imageIconClass: '',
        caption: ''
    },

    getInitialState: function(){
       return this.defaultState;
    },
    
    /*
        Method gets invoked when store changes. See how we set this.state with the data from the Ajax call.
    */
    onWeatherChange: function(data){
        var respCode = parseInt(data.cod, 10);
        if(respCode === 200){
            this.setState({
                description: data.weather[0].description,
                temperature: data.main.temp,
                caption: data.weather[0].main,
                imageIconClass: this.setWeatherIcon(data.weather[0].icon)
            });
        }
        else{
            this.setState(this.defaultState);
        }
    },
    
    /*
        Helper method to decide which icon to use
    */
    setWeatherIcon: function(icon){
        var selectedIcon = '';
        switch(icon){
            //cloudy night
            case "02n":
            case "03n":
            case "04n":
                selectedIcon = 'cloudy-night';
                break;
            //cloudy day
            case "02d":
            case "03d":
            case "04d":
                selectedIcon = 'cloudy-day';
                break;
            //sunny day
            case "01d":
                selectedIcon = 'clear-day';
                break;
            // clear night
            case "01n":
                selectedIcon = 'clear-night';
                break;
            //shower rain
            case "10d":
            case "10n":
                selectedIcon = 'shower-rain';
                break;
            //rain
            case "04n":
            case "04d":
                selectedIcon = 'rain';
                break;
            //mist
            case "50d":
            case "50n":
                selectedIcon = 'mist';
                break;
            //thunderstorm
            case "11d":
            case "11n":
                selectedIcon = 'thunderstorm';
                break;
            //snow
            case "13d":
            case "13n":
                selectedIcon = 'snow';
                break;
            default:
                selectedIcon = 'clear-day';
                break;
        }
        return "weather-icon " + selectedIcon;
    },

    /*
        Render gets called this.state's value changes.  We don't have to invoke this manually. 
        If you look at the code, you will observe that we display different views depending
        on the logic.
    */
    render: function(){
        if(this.state.temperature !== null){
            return(
                <div className="well well-lg">
                    <div className="row">
                        <div className="col-sm-5 col-md-4">
                           <div className={this.state.imageIconClass}></div>
                        </div>
                        <div className="col-sm-7 col-md-8">
                            <div className="caption">
                                <span className="label label-success temperature">{this.state.temperature} &deg;F</span>
                                <h3 className="description">{this.state.description}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="well well-lg">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="teaser">Interested in the weather?  Go ahead and try me out!</p>
                        </div>
                    </div>
                </div>
            );
        }

    }
});

module.exports = WeatherPreview;
