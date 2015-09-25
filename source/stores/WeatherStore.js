var Reflux = require('reflux');
var $ = require('zepto-browserify').$;
var WeatherActions = require('../actions/WeatherActions.js');


var WeatherStore = Reflux.createStore({
    weatherStore: {},
    baseUrl: "http://api.openweathermap.org/data/2.5/weather?zip={zip},{country}&units=imperial",
    //this line ensures that the WeatherStore listens for the actions defined in WeatherActions
    listenables: [WeatherActions],
    
    /*
    Calls an API to get the weather data given zipcode and country code
    */
    getWeather: function(data){
        /*
        We're going to attempt to find the data from the weatherStore object here.  
        If the data was saved within the last 10 minutes, then it's not stale and
        it can be returned.
        */
        var key = data.zipcode + data.country,
            weather = this.getStoredWeather(key),
            self = this,
            ret = null;

        if(!weather){
            // Make Ajax call
            var url = this.baseUrl.replace("{zip}", data.zipcode)
            .replace("{country}", data.country);
            $.get(url, function(resp){
                self.storeWeather(key, resp);
                ret = resp;
                /*
                    Here, once the store has received the data, it's going to tell whoever is 
                    listening that there is data ready for consumption.
                */
                self.trigger(ret);
                
            });
        }
        else{
            /*
                This is just the path where we find a cached copy in the store.  Trigger action
                works just like above.
            */
            ret = weather.data;
            this.trigger(ret);
        }
    },
    
    /*
        Helper method to get the stored data from the object. Checks if it's stale.  If
        it is, it removes the data from the dictionary and returns false. 
    */
    getStoredWeather: function(key){
        if (typeof this.weatherStore[key] === "undefined"){
            return false;
        }
        else{
            //make sure it hasn't been too stale
            var data = this.weatherStore[key],
                currentTime = new Date().getTime(),
                dataTime = data.ts,
                millisecondsInMinute = 60000,
                storageLength = 5 * millisecondsInMinute;

            //if too long, just delete cache so we get latest value
            if(data-dataTime > storageLength){
                delete this.weatherStore[key];
                return false;
            }

            return this.weatherStore[key];
        }
    },
    
    /*
        Another helper method to store the data received.
    */
    storeWeather: function(key, data){
        this.weatherStore[key] = {
            data: data,
            ts: new Date().getTime()
        }
    }
});

module.exports = WeatherStore;
