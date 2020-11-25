//import * as React from 'react';
import { MapLayer, withLeaflet, MapLayerProps } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-google';

interface mapLayerProps extends MapLayerProps {
  map: any;
  ruta: L.LatLng[];
  labels: Array<string>;
  coordenadas: Array<string>;
}

class Routing extends MapLayer<mapLayerProps> {
  createLeafletElement() {
    const { map, ruta, labels, coordenadas } = this.props;
    console.log('labels: ', labels);
    let leafletElement = L.Routing.control({
      plan: L.Routing.plan(ruta, {
        createMarker: function (i: number, wp: any) {
          console.log('i: ', i, labels);
          return L.marker(wp.latLng, {
            draggable: false,
          })
            .bindTooltip(labels[i], { permanent: true })
            .bindPopup(
              '<p><b>Punto:</b> ' +
                labels[i] +
                '</p> <p> <b>Coordenadas:</b> ' +
                coordenadas[i] +
                '</p>'
            );
        },
        routeWhileDragging: false,
      }),
      lineOptions: {
        styles: [
          {
            color: 'blue',
            opacity: 0.6,
            weight: 5,
          },
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 10,
      },
      addWaypoints: false,
      //draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      show: false,
    }).addTo(map.leafletElement);
    leafletElement.hide();
    return leafletElement.getPlan();
  }
}

export default withLeaflet(Routing);
