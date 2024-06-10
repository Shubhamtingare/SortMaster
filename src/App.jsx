import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VisualizerController from "./components/VisualizerController.jsx";
import SortingVisualizer from "./components/SortingVisualizer.jsx";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    default: {
      sortingAlgorithm: "Bubble Sort",
      size: "15",
      speed: "Fast",
      barColor: "Blue",
      pointerColor: "Red",
      sortedColor: "Green",
      sort: false,
      randomize: true,
    },
    sorted: false,
  });

  const controllerDataHandler = (e) => {
    setState({
      default: {
        sortingAlgorithm: e["sortingAlgorithm"],
        size: e["size"],
        speed: e["speed"],
        barColor: e["barColor"],
        pointerColor: e["pointerColor"],
        sortedColor: e["sortedColor"],
        sort: e["sort"],
        randomize: e["randomize"],
      },
      sorted: false,
    });

    if (e["sort"] === true) {
      var element = document.getElementById("sortingVisualizer");
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const visualizerDataHandler = (e) => {
    setState((prevState) => ({
      ...prevState,
      sorted: e,
    }));
  };

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <p style={{ color: "white" }}></p>
          </Col>
        </Row>
        <Row xl={2} lg={2} md={2} sm={1} xs={1}>
          <Col xl={4} lg={4} md={4}>
            <VisualizerController
              controllerDataHandler={controllerDataHandler}
              visualizerData={state.sorted}
            >
              {state.sorted}
            </VisualizerController>
          </Col>
          <Col id="sortingVisualizer">
            <SortingVisualizer
              visualizerDataHandler={visualizerDataHandler}
              controllerData={state.default}
            ></SortingVisualizer>
          </Col>
        </Row>
        <Row xl={1} lg={1} md={1} sm={1} xs={1}>
          <Col>
            <h6>Author : Akshat Jain & Ashutosh Gautam</h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
