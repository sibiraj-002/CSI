$(document).ready(function () {
    // Define country and city data
    var countryData = [
        // { latLng: [22.14, 79.01], name: 'India', regionCode: 'IN' },
        // Add more countries as needed
    ];

    var cityData = [
        { latLng: [13.32, 77.60], name: 'Bengaluru', countryCode: 'IN', regionCode: 'IN-KA' },
        { latLng: [30.90, 75.85], name: 'Ludhiana', countryCode: 'IN', regionCode: 'IN-PB' },
        { latLng: [10.96, 78.07], name: 'Karur', countryCode: 'IN', regionCode: 'IN-TN' },
        { latLng: [26.91, 75.79], name: 'Jaipur', countryCode: 'IN', regionCode: 'IN-RJ' },
        { latLng: [22.57, 88.36], name: 'Kolkata', countryCode: 'IN', regionCode: 'IN-WB' },
        { latLng: [11.12, 77.34], name: 'Tirupur', countryCode: 'IN', regionCode: 'IN-TN' },
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
    $('.project-slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        centerMode: false,
        variableWidth: false,
        centerPadding: '0',
        adaptiveHeight: false,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                  slidesToShow: 3,
                }
              },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
    });

    // Keep track of the currently selected marker
    var currentSelectedMarker = null;
    $(".jvectormap-marker:first-child").addClass("active");
    $('#geographic-map').on('click', '.jvectormap-marker', function (e) {
        // Check if the clicked element has a data-index attribute
        var dataIndex = $(e.target).data('index');
        var dataName = $(e.target).data('name');
        $(".jvectormap-marker").removeClass("active");
        if (dataIndex !== undefined) {
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
    
            // Scroll to the clicked slide
            $('.project-slider').slick('slickGoTo', dataIndex);
    
            // Pause and resume the autoplay (if enabled) to ensure proper slide transition
            var autoplay = $('.project-slider').slick('slickGetOption', 'autoplay');
            if (autoplay) {
                $('.project-slider').slick('slickPause');
                setTimeout(function () {
                    $('.project-slider').slick('slickPlay');
                }, 50);
            }
        }
    });

    function updateMarkerDataName(dataIndex, dataName) {
        // Find all markers in the SVG and update their data-name attribute
        $('#geographic-map svg g.jvectormap-marker g[data-index]').each(function () {
            $(this).attr('data-name', dataName);
        });
    }

});
