
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/light-v10", // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 4, // starting zoom
});


new mapboxgl.Marker({ color: 'orange', rotation: 0 })
        .setLngLat(campground.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({offset: 25, className: 'my-class'})
            .setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`)
        )
        .addTo(map);