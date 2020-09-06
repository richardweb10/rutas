import React, { Component } from 'react';
import { Map, TileLayer, MapControl } from 'react-leaflet';
import Routing from './RoutingMachine';
import L from 'leaflet';
import geo from './dataGeo';

interface Props {
  ruta: Array<string>;
}
interface State {
  lat: number;
  lng: number;
  zoom: number;
  isMapInit: boolean;
  ruta: Array<any>;
  labels: Array<string>;
  coordenadas: Array<string>;
  map: any;
}
class MapComponent extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      lat: geo[0][0],
      lng: geo[0][1],
      zoom: 14,
      isMapInit: false,
      ruta: [],
      labels: [],
      coordenadas: [],
      map: null,
    };
  }

  componentDidMount() {
    let ruta = [];
    let labels = [];
    let coordenadas = [];
    let p: number;
    for (const point of this.props.ruta) {
      console.log('point: ', point);
      p = parseInt(point);
      ruta.push(L.latLng(geo[p - 1][0], geo[p - 1][1]));
      labels.push(point);
      coordenadas.push('{' + geo[p - 1][0] + ',' + geo[p - 1][1] + '}');
    }
    this.setState({ ruta, labels, coordenadas });
  }

  saveMap = (map: any) => {
    //this.map = map;
    this.setState({
      isMapInit: true,
      map: map,
    });
  };

  render() {
    const { lat, lng, zoom } = this.state;
    const position = L.latLng(lat, lng);

    return (
      <div>
        <div className="group title">
          Ruta:{' '}
          {this.props.ruta.map((val, id) => {
            return (
              <span key={id}>
                {val + (this.props.ruta.length - 1 > id ? '->' : '')}
              </span>
            );
          })}{' '}
        </div>
        <Map center={position} zoom={zoom} ref={this.saveMap}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.state.isMapInit && (
            <Routing
              map={this.state.map}
              ruta={this.state.ruta}
              labels={this.state.labels}
              coordenadas={this.state.coordenadas}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default MapComponent;
