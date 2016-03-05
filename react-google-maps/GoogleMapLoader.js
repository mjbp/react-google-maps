var React = require('react'),
    GoogleMap = require('./').GoogleMap,
    GoogleMapAPILoader = require('./').GoogleMapAPILoader,
    GoogleMapLoader = React.createClass({
        
        propTypes: {
            onAPILoad: React.PropTypes.func,
            onMapLoad: React.PropTypes.func,
            onResize: React.PropTypes.func,
            onZoom: React.PropTypes.func,
            onCentreChange: React.PropTypes.func,
            onBoundsChange: React.PropTypes.func,
            type: React.PropTypes.string,
            bounds: React.PropTypes.object,
            options: React.PropTypes.object,
            centre: React.PropTypes.array,
            mapStyle: React.PropTypes.object,
            mapControlStyle: React.PropTypes.string,
            mapControlPosition: React.PropTypes.string,
            zoomControlPosition: React.PropTypes.string
        },
    
        componentDidMount: function() {
            GoogleMapAPILoader()
                .then(function(google){
                
                    this.handleAPILoad();
                
                }.bind(this))
                .catch(function(e){
                    console.error(e);
                    //hide map instead of throwing...
                    throw e;
                });
        },
        
        handleAPILoad: function() {
            if (typeof this.props.onAPILoad === 'function') {
                this.props.onAPILoad();
            }
        },
        
        handleMapLoad: function(map) {
            if (typeof this.props.onMapLoad === 'function') {
                setTimeout(function(){
                    this.props.onMapLoad(map);
                }.bind(this), 0);
            }
        },
        
        render: function() {
            return <div className='map_canvas'>{!!global.google ? 
                         (<GoogleMap
                            onMapLoad={this.handleMapLoad}
                            options={this.props.options}
                            centre={this.props.centre}
                            mapStyle={this.props.mapStyle}
                            onResize={this.props.onResize}
                            onMapReady={this.handleMapReady}
                            onZoom={this.props.onZoom}
                            onCentreChange={this.props.onCentreChange}
                            onBoundsChange={this.props.onBoundsChange}
                            bounds={this.props.bounds}
                            type={this.props.type}
						    mapControlStyle={this.props.mapControlStyle}
						    mapControlPosition={this.props.mapControlPosition}
						    zoomControlPosition={this.props.zoomControlPosition}
                            >{this.props.children}</GoogleMap>) : null}</div>;
        }

    });

module.exports = GoogleMapLoader;