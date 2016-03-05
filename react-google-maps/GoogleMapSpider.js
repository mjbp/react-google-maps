var React = require('react'),
    Constants = require('../../../constants/Constants'),
	OverlappingMarkerSpiderfier = require('./libs/OverlappingMarkerSpiderfier'),
    GoogleMapSpider = React.createClass({

        propTypes: {
            map: React.PropTypes.any,
			markers: React.PropTypes.any,
            onClick: React.PropTypes.func
        },
        
        componentDidMount: function() {
			this.node = new OverlappingMarkerSpiderfier(global.google.maps, this.props.map, Constants.SpiderDefaults);
            this.renderSpiders();
        },
        
        componentWillUnmount: function() {
            this.removeClick();
            this.node = null;
        },
        
        removeClick: function(){
            this.node.removeListener('click', this.handleClick);
        },
                                          
        handleClick: function (marker) {
            //bind this to something in GoogleMap
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(marker.id);
            }
        },
        
        renderSpiders: function() {
            this.props.markers.forEach(function(marker){
                this.node.addMarker(marker);
            }.bind(this));

            this.node.addListener('click', this.handleClick);
        },
        
        render: function() {
            
            if(!!this.node){
                this.removeClick();
				this.node.clearMarkers();
				this.renderSpiders();
            }
            
            return null;
        }

    });

module.exports = GoogleMapSpider;