var React = require('react'),
    Marker = require('./libs/Marker'),
    GoogleMapMarker = React.createClass({
        propTypes: {
            id: React.PropTypes.string,
            map: React.PropTypes.any,
			icon: React.PropTypes.string,
            //icon: React.PropTypes.object,
			//shape:React.PropTypes.object,
            clickable: React.PropTypes.bool,
            draggable: React.PropTypes.bool,
            position: React.PropTypes.array
        },
        
        componentDidMount: function() {
            this.node = Marker.make({
                id: this.props.id,
                position: new global.google.maps.LatLng(this.props.position[0], this.props.position[1]),
                draggable: this.props.clickable,
                clickable: this.props.clickable,
                icon: this.props.icon,
				//shape: this.props.shape,
                animation: this.props.animation
            });
            
            this.node.setMap(this.props.map);
            
            /* Refactor */
            if(!!this.props.dragListener){
                global.google.maps.event.addListener(this.node, "dragend", this.props.dragListener);
            }
        },
        
        componentWillUnmount: function() {
            this.node.setMap(null);
        },
        
        render: function() {
            return null;
        }

    });

module.exports = GoogleMapMarker;