$(document).ready(function () {
    // Define country and city data
    var countryData = [
        { latLng: [22.14, 79.01], name: 'India', regionCode: 'IN' },
        { latLng: [37.09, -95.71], name: 'United States', regionCode: 'US' },
        { latLng: [35.86, 104.19], name: 'China', regionCode: 'CN' }
        // Add more countries as needed
    ];

    var cityData = [
        { latLng: [13.08, 80.27], name: 'Chennai', countryCode: 'IN', regionCode: 'IN-TN' },
        { latLng: [28.61, 77.23], name: 'Delhi', countryCode: 'IN', regionCode: 'IN-DL' },
        { latLng: [40.71, -74.01], name: 'New York', countryCode: 'US', regionCode: 'US-NY' },
        { latLng: [34.05, -118.24], name: 'Los Angeles', countryCode: 'US', regionCode: 'US-CA' },
        { latLng: [39.90, 116.40], name: 'Beijing', countryCode: 'CN', regionCode: 'CN-BJ' },
        { latLng: [31.23, 121.47], name: 'Shanghai', countryCode: 'CN', regionCode: 'CN-SH' },
        { latLng: [21.17, 72.83], name: 'Surat', countryCode: 'IN', regionCode: 'IN-GJ' },
        { latLng: [21.71, 72.14], name: 'Bhavnagar', countryCode: 'IN', regionCode: 'IN-GJ' },
        { latLng: [22.42, 72.89], name: 'Borsad', countryCode: 'IN', regionCode: 'IN-KA' },
        { latLng: [13.32, 77.60], name: 'Bengaluru', countryCode: 'IN', regionCode: 'IN-KA' },
        // Add more cities as needed
    ];

    // Assign sequential index to each marker
    var dataIndex = 0;
    var markers = countryData.concat(cityData).map(function (marker) {
        marker.dataIndex = dataIndex++;
        return marker;
    });

    // Initialize the vector map
    var map = $("#geographic-map").vectorMap({
        map: "world_mill_en",
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderOpacity: 0.25,
        borderWidth: 1,
        zoomOnScroll: true,
        color: '#009efb',
        regionStyle: {
            initial: {
                fill: '#818181'
            }
        },
        markerStyle: {
            initial: {
                fill: '#fff',
                'fill-opacity': 1,
                stroke: '#000',
                'stroke-width': 5,
                'stroke-opacity': 0.6,
                'data-name': 'default' // default value if data-name is not set
            },
            selected: {
                fill: '#009efb'
            }
        },
        markers: markers,
        enableZoom: true,
        hoverColor: '#009efb',
        hoverOpacity: null,
        normalizeFunction: 'linear',
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#c9dfaf',
        selectedRegions: [],
        showTooltip: true,
    });

    // Initialize the Slick Slider
    $('.map-slider').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 2000,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: false,
        adaptiveHeight: false
    });

    // Keep track of the currently selected marker
    var currentSelectedMarker = null;
    $(".jvectormap-marker:first-child").addClass("active");  
    // Attach click event to the map container
    $('#geographic-map').on('click', function (e) {
        // Check if the clicked element has a data-index attribute
        var dataIndex = $(e.target).data('index');
        var dataName = $(e.target).data('name');
        $(".jvectormap-marker:first-child").removeClass("active");  
        if (dataIndex !== undefined) {
            // Change the active slide based on the clicked data-index
            $('.map-slider').slick('slickGoTo', dataIndex);

            // Update the marker's data-name attribute
            updateMarkerDataName(dataIndex, dataName || 'default');

            // Remove 'active' class from the previously selected marker
            if (currentSelectedMarker !== null) {
                currentSelectedMarker.removeClass('active');
            }

            // Add 'active' class to the selected marker
            $(e.target).addClass('active');

            // Update the currently selected marker
            currentSelectedMarker = $(e.target);
        }
    });

    function updateMarkerDataName(dataIndex, dataName) {
        // Find all markers in the SVG and update their data-name attribute
        $('#geographic-map svg g.jvectormap-marker g[data-index]').each(function () {
            $(this).attr('data-name', dataName);
        });
    }

});
