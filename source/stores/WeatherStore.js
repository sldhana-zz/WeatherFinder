var Reflux = require('reflux');
var $ = require('zepto-browserify').$;
var WeatherActions = require('../actions/WeatherActions.js');


var WeatherStore = Reflux.createStore({
    weatherStore: {},
    baseUrl: "http://api.openweathermap.org/data/2.5/weather?zip={zip},{country}&units=imperial",
    listenables: [WeatherActions],

    getWeather: function(data){
        //check if zipcode + country key exists in store
        var key = data.zipcode + data.country,
            weather = this.getStoredWeather(key),
            self = this,
            ret = null;

        if(!weather){
            var url = this.baseUrl.replace("{zip}", data.zipcode)
            .replace("{country}", data.country);
            $.get(url, function(resp){
                self.storeWeather(key, resp);
                ret = resp;
                self.trigger(ret);
            });
        }
        else{
            ret = weather.data;
            this.trigger(ret);
        }
    },

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

    storeWeather: function(key, data){
        this.weatherStore[key] = {
            data: data,
            ts: new Date().getTime()
        }
    }
});

module.exports = WeatherStore;
