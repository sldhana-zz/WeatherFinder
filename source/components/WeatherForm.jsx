var React = require('react');

var WeatherForm = React.createClass({
    getInitialState: function(){
        return {
            zipcode: "",
            country: "US"
        };
    },

    handleZipcodeChange: function(event){
        this.setState({
            zipcode: event.target.value
        });
    },

    handleCountryChange: function(event){
        this.setState({
            country: event.target.value
        });
    },

    handleGetWeather: function(event){
        event.preventDefault();
        this.props.onGetWeather(this.state.zipcode, this.state.country);

    },

    render: function(){
        return(
            <div className="zipcode-form">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="sr-only" htmlFor="zipcode">Zipcode</label>
                                <input type="text" id="zipcode" onChange={this.handleZipcodeChange} className="form-control input-lg" ref="zipcode" placeholder="Enter zipcode" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="sr-only" htmlFor="country">Country</label>
                                <select className="form-control input-lg" id="country" ref="country" onChange={this.handleCountryChange}>
                                    <option value="US">US</option>
                                    <option value="RU">Russia</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                    <option value="SP">Spain</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="form-group">
                                <button className="btn btn-success btn-lg" onClick={this.handleGetWeather}>Get Weather</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = WeatherForm;
