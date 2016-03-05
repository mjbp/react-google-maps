var Marker = (function() {
    
        function make(props) {
            if([].toString.call(props) !== '[object Object]') { return null; }
            return new global.google.maps.Marker({
                            id: props.id,
                            title: props.title || null,
                            thumbnail: props.thumbnail || null,
                            icon: props.icon,
                            clickable: props.clickable,
                            draggable: props.draggable || false,
                            animation: props.animation || null,
                            map: props.map,
                            position: props.position
                        });
        }

        return {
            make: make
        };

    }());

module.exports = Marker;