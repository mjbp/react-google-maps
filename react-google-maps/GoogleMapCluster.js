var React = require('react'),
    Immutable = require('immutable'),
	MarkerClusterer = require('./libs/MarkerClusterer'),
    Constants = require('../../../constants/Constants'),
    GoogleMapCluster = React.createClass({

        propTypes: {
            map: React.PropTypes.object,
			markers: React.PropTypes.instanceOf(Immutable.List)
        },
        
        componentDidMount: function() {
            this.node = new MarkerClusterer(global.google.maps, this.props.map, this.props.markers.toArray(), Constants.ClusterDefaults);
        },
        
        componentWillUnmount: function() {
            this.node = null;
        },
		
        render: function() {
			if(!!this.node){
				this.node.clearMarkers();
				this.node.addMarkers(this.props.markers.toArray());
				this.node.redraw();
			}
            return null;
        }

    });

module.exports = GoogleMapCluster;