import React, {  createRef } from "react";
import Map from "./map";
import ModalResponse from "../layout/modalResponse";
var rutas: Array<string> = [],
  usedPoints: Array<Array<string>> = [];

interface State {
  rutas: Array<string>;
  ruta: string;
}

class MapComponent extends React.Component<State> {
  state: State = {
    rutas: [],
    ruta: "123",
  };
  private rutasDiv = createRef<HTMLDivElement>();

  componentDidMount() {
    this.generateRutas(this.state.ruta);
  }

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  generateRutas = (ruta: string) => {
    const re = /^[1-5\b]+$/;
    if (ruta.includes("1") && ruta !== "") {
      if (re.test(ruta)) {
        this.rutasDiv.current!.innerHTML = "";
        this.routes(ruta);
      } else {
        ModalResponse({
          title: "Generación de rutas",
          text: "Debe ingresar numeros del 1 al 5.",
          res: 404,
        });
      }
    } else {
      ModalResponse({
        title: "Generación de rutas",
        text: "Debe ingresar el punto origen, el cual es 1.",
        res: 404,
      });
    }
  };
  routes = (ruta: string) => {
    var i: number,
      point: Array<string>,
      points: Array<string> = ruta.split("");

    for (i = 0; i < points.length; i++) {
      point = points.splice(i, 1);
      usedPoints.push(point);
      if (points.length === 0 && usedPoints[0][0] === "1") {
        rutas[rutas.length] = usedPoints.join("");
      }
      this.routes(points.join(""));
      points.splice(i, 0, point[0]);
      usedPoints.pop();
    }
    this.setState({ rutas });
  };

  render() {
    return (
      <div className="container-rutas">
        <h1>Generador de rutas</h1>
        <div className="group calculador">
          <input
            type="text"
            id="ruta"
            name="ruta"
            maxLength={5}
            onChange={this.handleChange}
            value={this.state.ruta}
          />
          <button
            onClick={(e) => {
              this.generateRutas(this.state.ruta);
            }}
          >
            Calcular Rutas
          </button>
        </div>

        <div ref={this.rutasDiv} id="rutas" className="row">
          {this.state.rutas.map((val, id) => {
            return (
              <div key={id} className="column">
                <Map ruta={val.split("")} />
              </div>
            );
          })}
        </div>
        <div className="group">Powered by @Richard Restrepo López</div>
      </div>
    );
  }
}

export default MapComponent;
