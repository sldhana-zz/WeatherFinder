var React = require('react');

var WeatherForm = React.createClass({
    /*
        This method  will be invoked once before the component is mounted. The return value will 
        be used as the initial value of this.state.
    */
    getInitialState: function(){
        return {
            zipcode: "",
            country: "US"
        };
    },
    
    /*
        You're going to notice that this method gets called from the form below.  When the user types into
        the zipcode textbox and changes the value, handleZipcode change method gets called and it updates
        this.state.
    
    */
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
    
    /*
        This method gets called when a user clicks on the Get Weather button below.  See how
        we call the method passed in via the parent component in the previous code.  Since this.state
        gets changed when the user interacted with the textbox and the dropdown, we don't have to grab
        the latest values.  Instead, we can just read the values directly and pass them on.
    */
    handleGetWeather: function(event){
        event.preventDefault();
        //this.props.onGetWeather was passed into this component.  
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
                                //onChange method defined above
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
                                //onClick method defined above
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
