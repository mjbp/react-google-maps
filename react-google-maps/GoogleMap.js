var React = require('react'),
    ReactDOM = require('react-dom'),
    assign = require('object-assign'),
    GoogleMap = React.createClass({
        
        propTypes: {
            onMapLoad: React.PropTypes.func,
            options: React.PropTypes.object,
            onResize: React.PropTypes.func,
            onZoom: React.PropTypes.func,
            onCentreChange: React.PropTypes.func,
            onBoundsChange: React.PropTypes.func,
            bounds: React.PropTypes.object,
            centre: React.PropTypes.array,
            mapStyle: React.PropTypes.object,
            type: React.PropTypes.string,
            mapControlStyle: React.PropTypes.string,
            mapControlPosition: React.PropTypes.string,
            zoomControlPosition: React.PropTypes.string
        },
                                           
        componentDidMount: function(){
            if(!!global.google) {
                this.map = new global.google.maps.Map(ReactDOM.findDOMNode(this.refs.map_dom), assign({}, this.props.options, {
                    center: new global.google.maps.LatLng(this.props.centre[0], this.props.centre[1]),
                    mapTypeId: global.google.maps.MapTypeId[this.props.type],
                    mapTypeControlOptions: {
                        style: global.google.maps.MapTypeControlStyle[this.props.mapControlStyle],
                        position: global.google.maps.ControlPosition[this.props.mapControlPosition]
                    },
                    zoomControlOptions: {
                        position: global.google.maps.ControlPosition[this.props.zoomControlPosition]
                    },
                }));
                this.bindMapEvents();
                this.userCentre = new global.google.maps.LatLng(this.props.centre[0], this.props.centre[1]);
            }
        },
        
        componentWillReceiveProps: function(nextProps) {
            if(!!nextProps.bounds) {
                this.map.fitBounds(nextProps.bounds); 
            }
            if(nextProps.centre !== this.props.centre) {
                this.map.panTo({lat: nextProps.centre[0], lng: nextProps.centre[1]});
            }
        },

        bindMapEvents: function(){
            //Bind these to functions to parent exposed to business logic
            /*
            //retain centre of map on window resize
            //store userCentre in state or locally scoped variable
            */
            global.addEventListener('resize', this.handleResize);
            global.google.maps.event.addListener(this.map, 'center_changed', function(){
                this.props.onCentreChange();
            }.bind(this));
            global.google.maps.event.addListener(this.map, 'zoom_changed', function(){
                this.props.onZoom(this.map.getZoom());
            }.bind(this));
            
            //bounds_changed triggered too much
            //use idle or throttle
            global.google.maps.event.addListener(this.map, 'idle', function(){
                this.userCentre = this.map.getCenter();
                this.props.onBoundsChange(this.map.getBounds());
            }.bind(this));

            this.handleMapLoad(this.map);
        },
        
        handleMapLoad: function(map) {
            if (typeof this.props.onMapLoad === 'function') {
                global.google.maps.event.addListenerOnce(map, 'idle', function () {
                    this.props.onMapLoad(map);
                }.bind(this));
            }
            
        },
        
        handleResize: function(){
            this.map.setCenter(this.userCentre);
        },
        
        render: function() {
            return <div className='map_canvas'>
                        <div
                            style={this.props.mapStyle}
                            ref="map_dom"
                            >
                        </div>
                        {this.props.children}
                    </div>;
        }

    });

module.exports = GoogleMap;