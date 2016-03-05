var React = require('react'),
    ReactDOM = require('react-dom'),
    GoogleMapOverlay = React.createClass({

        propTypes: {
            map: React.PropTypes.object,
            position: React.PropTypes.object,
            overlayDimensions: React.PropTypes.object
        },
        
        componentWillMount: function() {
            this.overlay = new global.google.maps.OverlayView();
            this.overlay.setMap(this.props.map);
            this.overlay.onAdd = this.onAdd;
            this.overlay.draw = this.draw;
            this.overlay.remove = this.remove;
            
            //assuming this is a single element, if not wrap this.props.childen in a div
            this.node = this.props.children;
        },
        
        componentWillUnmount: function() {
            this.remove();
        },
        
		//Google Maps OverlayView onAdd, draw and remove functions
        onAdd: function(){
            this.container = document.createElement('div');
            this.container.style.position = 'absolute';
        },
        
        draw: function(){
            this.renderContent();
            this.mountContainer();
            this.positionContainer();
        },
        
        remove: function(){
            if(!!this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
            ReactDOM.unmountComponentAtNode(this.container);
            this.overlay.setMap(null);
        },
        
        renderContent: function(){
            ReactDOM.render(this.node, this.container);
        },
        
        mountContainer: function(){
            this.overlay.getPanes().floatPane.appendChild(this.container);
        },
        
        positionContainer: function () {
            this.point = this.overlay.getProjection().fromLatLngToDivPixel(this.props.position);
            this.container.style.left = this.point.x - (this.props.overlayDimensions.width / 2) + 'px';
            this.container.style.top = this.point.y - (this.props.overlayDimensions.height + 55) + 'px';
            this.panInBounds();
        },
        
        panInBounds: function(){
            var projectionNW = this.overlay.getProjection().fromDivPixelToLatLng({
                    x: this.point.x - (this.props.overlayDimensions.width * 0.5),
                    y: this.point.y - ((this.props.overlayDimensions.height + 60) * 1.24)
                }),
                projectionE = this.overlay.getProjection().fromDivPixelToLatLng({
                    x: (this.point.x + (this.props.overlayDimensions.width * 0.51)),
                    y: this.point.y
                });

            if(!this.props.map.getBounds().contains(projectionNW)){
                var bounds = this.props.map.getBounds();
                bounds.extend(projectionNW);
                this.props.map.panToBounds(bounds);
            }

            if(!this.props.map.getBounds().contains(projectionE)){
                this.props.map.panBy(190, 0);
            }
        },
        
        render: function() {
            return null;
            
        }

    });

module.exports = GoogleMapOverlay;