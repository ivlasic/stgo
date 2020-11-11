document.addEventListener("DOMContentLoaded", function () {

    var USEOSM = false; // use unlimited OSM maps (in case carto maps runs above limits)


    // generate markers
    if (directory.length > 0) {

        var markers = L.markerClusterGroup({
            showCoverageOnHover: false,
            maxClusterRadius: 30,
            spiderfyDistanceMultiplier: 2
        });

        for (var i = 0, max = directory.length; i < max; i++) {

            // set popup content
            var content = '' +
                '<div class="user">';

            if (directory[i].image) {
                content += '' +
                    '<div class="user__image">' +
                        '<a href="' + directory[i].image + '" target="_blank"><img class="user__image-src" src="' + directory[i].image + '" alt=""></a>';
              }

            if (directory[i].image2) {
                content += '' +
                         '<a href="' + directory[i].image2 + '" target="_blank"><img class="user__image-src" src="' + directory[i].image2 + '" alt=""></a>' +
                    '</div>';
            }

            content += '' +
                    '<div class="user__data">';

            if (directory[i].name) {
                content += '' +
                        '<h2 class="user__name">' + directory[i].name + '</h2>';
            }

            if (directory[i].opis) {
                content += '' +
                        '<p class="user__opis">' + directory[i].opis + '</p>';
            }

            if (directory[i].kooE) {
                content += '' +
                        '<dl class="user__koo"><dt>E <span>HTRS96/TM (m)</span>: </dt><dd>' + directory[i].kooE + '</dd><dt>N <span>HTRS96/TM (m)</span>: </dt><dd>' + directory[i].kooN + '</dd><dt>H <span>HVRS71 (m)</span>: </dt><dd>' + directory[i].kooH + '</dd><dt>H <span>HVRS1875 (m)</span>: </dt><dd>' + directory[i].kooH1875 + '</dd></dl>';
            }

            if (directory[i].links) {
                content += '' +
                        '<div class="user__links">' +
                            '<ul class="user__links-list">' +
                            '<li class="user__links-listitem streetview"><a href="' + directory[i].StreetView + '" target="_blank" rel="noopener noreferrer" title="Lokacija se otvara u Google Street View-u. Ukoliko tražena lokacija nema dostupan street view, pojaviti će se crni ekran ili će se locirati na vašu lokaciju.">' + '<i class="fa fa-street-view" aria-hidden="true"></i> Street View' + "</a></li>";

                for (var j = 0; j < 4; j++) {
                    if (directory[i]['links'][j]) {
                        var link = directory[i]['links'][j];
                        var linkText = link.replace(/(http:\/\/|https:\/\/)/i, '');
                        content += "" + '<li class="user__links-listitem"><a href="' + link + '" target="_blank" rel="noopener noreferrer">' + '<i class="fa fa-external-link" aria-hidden="true"></i> ' + linkText + "</a></li>";
                    }
                }

                content += '' +
                            '</ul>' +
                        '</div>';
            }

            content += '' +
                    '</div>' +
                '</div>';

            // init popup
            var popup = L.popup({
                maxWidth: 450
            }).setContent(content);

            // add user ID
            // this helps us to determine popups
            popup.userID = directory[i].id;

            // init marker
            var marker = L.marker([directory[i].latitude, directory[i].longitude], {
                alt: directory[i].name
            }).bindPopup(popup);

            // add user ID
            // this helps us to determine markers
            marker.userID = directory[i].id;

            // add to markers
            marker.addTo(markers);
        }
    }

    // set map attributes
    if (USEOSM) {
        // OSM maps (unlimited)
        var mapAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
        var mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var tiles = L.tileLayer(mapUrl, {attribution: mapAttribution});
    }
    else {
        // Carto maps (limited to 75.000 requests)
        var mapAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>';
        var mapUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/{style}/{z}/{x}/{y}@2x.png';
        var tiles = L.tileLayer(mapUrl, {style: 'rastertiles/voyager_labels_under', attribution: mapAttribution});
    }

    var ivAttribution = ' | Podaci © <a href="http://www.hzinfra.hr/">HŽI</a> | ' +
    'Izrada © <a href="http://ivgeo.net/">ivgeo</a>',
    DGUAttribution = 'DOF5 2011 © <a href="http://www.dgu.hr">DGU</a>';


    var geoportal = L.tileLayer.wms("http://geoportal.dgu.hr/wms", {
        layers: 'DOF',
        format: 'image/png',
        transparent: true,
        attribution: DGUAttribution + ivAttribution
    });

    var geoportalKat = L.tileLayer.wms("https://oss.uredjenazemlja.hr/OssWebServices/inspireService/wms?token=a1df4f97e769af9c5d41106cbf943e26791d956e23cdeffadf379046dcbbbc8d", {
        layers: 'CP.CadastralZoning,CP.CadastralParcel',
        format: 'image/png',
        transparent: true,
        attribution: DGUAttribution + ivAttribution
    });

    var izgledpruge = {
        "color": "#3c0610",
        "weight": 5,
        "opacity": 0.65
    };
    var pruge = L.geoJson(pruga, {
        style: izgledpruge,
        onEachFeature: function(feature, layer){
            var popupContent = "<p>Pruga <strong>" + feature.properties.OznakaPrug + " " + feature.properties.NazivPruge + "</strong></p><p>Građevinska duljina pruge " + feature.properties.DuljPruge + " (km)</p>";
            
            if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }

            layer.bindPopup(popupContent);
        }
    });

	/* HZIPOI */
    function popProzorHZIkolodvori(feature, layer){
        var popupContent = "<p>Kolodvor <strong>" + feature.properties.name + "</strong></p>";
        
        if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
        }
        layer.bindPopup(popupContent);
    }

    function HZIPOIMarker(feature, latlng) {
            var smallIcon = L.icon({
                iconSize: [16, 16],
                iconAnchor: [8, 16],
                popupAnchor:  [0, -16],
                iconUrl: 'img/' + feature.properties.Ikona + '.png'
            });
            return L.marker(latlng, {icon: smallIcon, title: feature.properties.name, alt: feature.properties.name}).bindTooltip(feature.properties.name, {offset: [0, 34], direction: 'center', permanent: false, opacity: 0.9, className:"hzipoi"});
    }

    var HZIkolodvori = L.geoJson(HZIPOI, {
        filter: function(feature, layer) {
            return feature.properties.fclass =='railway_station';
        },
        onEachFeature: popProzorHZIkolodvori,
        pointToLayer: HZIPOIMarker
    });

    function popProzorHZIstajalista(feature, layer){
            var popupContent = "<p>Stajalište <strong>" + feature.properties.name + "</strong></p>";
            
            if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }
            layer.bindPopup(popupContent);
    }

    var HZIstajalista = L.geoJson(HZIPOI, {
        filter: function(feature, layer) {
            return feature.properties.fclass =='railway_halt';
        },
        onEachFeature: popProzorHZIstajalista,
        pointToLayer: HZIPOIMarker
    });
    /* end HZIPOI */

    // use custom marker icons
    L.Icon.Default.prototype.options.iconUrl = '../../../images/leaflet-icons/marker-icon.png';
    L.Icon.Default.prototype.options.iconRetinaUrl = '../../../images/leaflet-icons/marker-icon-2x.png';

    // generate map
    var map = L.map('map', {
        layers: [tiles, markers],
        minZoom: 2,
        preferCanvas: true,
        maxBounds: [[82, -200], [-70, 200]], // fit world, provide extra space to left and right (lng 200 instead of 180)
        maxBoundsViscosity: 1.0, // don’t drag map outside the bounds
        zoomSnap: 0.2
    });

    var baseMaps = {
        "Streets": tiles,
        "DOF": geoportal,
        "Katastar": geoportalKat
    };

    var overlayMaps = {
        "Kolodvori": HZIkolodvori,
        "Stajališta": HZIstajalista,
        "Pruge": pruge
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);

    // save reference to markers
    // this makes it easier for us to determine marker layers
    map.markers = markers;

    // fit bounds to map so all markers are visible
    map.fitBounds(markers.getBounds(), {
        padding: [70, 70]
    });

    // set map ready
    // this helps us to hold back actions triggered by events
    map.ready = true;

    // handle info popover
    var popover = document.getElementById('popover');
    var popoverOpen = document.getElementById('popover-open');
    var popoverClose = document.getElementById('popover-close');

    popoverOpen.addEventListener('click', function () {
        popover.classList.toggle('popover--active');
    });

    popoverClose.addEventListener('click', function () {
        popover.classList.toggle('popover--active');
    });

    L.DomEvent.on(document, 'keydown', function (e) {
        // ESC
        if (e.which == 27) {
            popover.classList.remove('popover--active');
        }
    });

    // show popover on first visit (if URL does not contain hash)
    var supportsLS = window.localStorage && localStorage.getItem;
    var hasHash = window.location.hash.length > 0;
    if (supportsLS && !hasHash && !localStorage.getItem('isReturningVisitor')) {
        localStorage.setItem('isReturningVisitor', true);
        popover.classList.add('popover--active');
    }

    /* Geolokacija */
    map.addControl(L.control.locate({
        position: 'topleft',
        setView: 'once',
        flyTo: true,
        returnToPrevBounds: true,
        strings: {
            title: "Pokaži gdje sam!!",
            popup: "Nalazite se unutar ovog kruga"
        },
        locateOptions: {
            enableHighAccuracy: true,
            maxZoom: 16
    }}));

    /* Mjerilo */
    L.control.scale({metric: true, imperial: false}).addTo(map);
});
