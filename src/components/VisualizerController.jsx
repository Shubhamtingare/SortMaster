import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
import SplitButton from "react-bootstrap/SplitButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./VisualizerController.css";

const VisualizerController = (props) => {
  const [sortingAlgorithm, setSortingAlgorithm] = useState("Bubble Sort");
  const [speed, setSpeed] = useState("Fast");
  const [size, setSize] = useState("15");
  const [barColor, setBarColor] = useState("Blue");
  const [pointerColor, setPointerColor] = useState("Red");
  const [sortedColor, setSortedColor] = useState("Green");
  const [message, setMessage] = useState(
    "Feeling lazy ? its OK , just click Sort ! "
  );

  const randomizeRef = useRef();
  const sortRef = useRef();

  useEffect(() => {
    if (props.visualizerData === true) {
      randomizeRef.current.textContent = "Randomize Array";
    }
  }, [props.visualizerData]);

  const update = () => {
    return {
      sortingAlgorithm,
      speed,
      size,
      barColor,
      pointerColor,
      sortedColor,
    };
  };

  const randomize = () => {
    randomizeRef.current.textContent = "Randomize Array";
    sortRef.current.disabled = false;
    document.getElementById("speed").disabled = false;
    document.getElementById("size").disabled = false;
    document.getElementById("sortingAlogrithm").disabled = false;
    document.getElementById("barColor").disabled = false;
    document.getElementById("pointerColor").disabled = false;
    document.getElementById("sortedColor").disabled = false;

    const temp = update();
    temp["sort"] = false;
    temp["randomize"] = true;

    props.controllerDataHandler(temp);
  };

  const sort = () => {
    randomizeRef.current.textContent = "Stop & Randomize Array";
    sortRef.current.disabled = true;
    document.getElementById("speed").disabled = true;
    document.getElementById("size").disabled = true;
    document.getElementById("sortingAlogrithm").disabled = true;
    document.getElementById("barColor").disabled = true;
    document.getElementById("pointerColor").disabled = true;
    document.getElementById("sortedColor").disabled = true;

    const temp = update();
    temp["sort"] = true;
    temp["randomize"] = false;
    temp["sorted"] = false;

    props.controllerDataHandler(temp);
  };

  return (
    <div className="VisualizerController">
      <Container>
        <Row>
          <Col>
            <h1>
              Sorting
              <br />
              Visualizer
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <SplitButton
              title={sortingAlgorithm}
              id="sortingAlgorithmSplitButton"
              variant="light"
              onSelect={setSortingAlgorithm}
            >
              <Dropdown.Header>Sorting Algorithm</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Bubble Sort">
                Bubble Sort (Default)
              </Dropdown.Item>
              <Dropdown.Item eventKey="Cocktail Sort">
                Cocktail Sort
              </Dropdown.Item>
              <Dropdown.Item eventKey="Heap Sort">Heap Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Insertion Sort">
                Insertion Sort
              </Dropdown.Item>
              <Dropdown.Item eventKey="Linear Sort">Linear Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Merge Sort">Merge Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Quick Sort">Quick Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Selection Sort">
                Selection Sort
              </Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={speed}
              id="speed"
              variant="light"
              onSelect={setSpeed}
            >
              <Dropdown.Item disabled>Speed Of Visualization</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Very Fast">Very fast</Dropdown.Item>
              <Dropdown.Item eventKey="Fast">Fast (Default)</Dropdown.Item>
              <Dropdown.Item eventKey="Normal">Normal</Dropdown.Item>
              <Dropdown.Item eventKey="Slow">Slow</Dropdown.Item>
              <Dropdown.Item eventKey="Very Slow">Very Slow</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={size}
              id="size"
              variant="light"
              onSelect={(e) => {
                const temp = update();
                temp["sort"] = false;
                temp["randomize"] = true;
                temp["size"] = e;
                setSize(e);
                props.controllerDataHandler(temp);
              }}
            >
              <Dropdown.Item disabled>Size Of Array</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="10">10</Dropdown.Item>
              <Dropdown.Item eventKey="15">15(Default)</Dropdown.Item>
              <Dropdown.Item eventKey="20">20</Dropdown.Item>
              <Dropdown.Item eventKey="25">25</Dropdown.Item>
              <Dropdown.Item eventKey="30">30</Dropdown.Item>
              <Dropdown.Item eventKey="35">35</Dropdown.Item>
              <Dropdown.Item eventKey="40">40</Dropdown.Item>
              <Dropdown.Item eventKey="45">45</Dropdown.Item>
              <Dropdown.Item eventKey="50">50</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={barColor}
              id="barColor"
              variant="light"
              onSelect={(e) => {
                const temp = update();
                temp["sort"] = false;
                temp["randomize"] = false;
                temp["barColor"] = e;
                setBarColor(e);
                props.controllerDataHandler(temp);
              }}
            >
              <Dropdown.Item disabled>Color Of Bar</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Black">Black</Dropdown.Item>
              <Dropdown.Item eventKey="Blue">Blue (Default)</Dropdown.Item>
              <Dropdown.Item eventKey="Cyan">Cyan</Dropdown.Item>
              <Dropdown.Item eventKey="Green">Green</Dropdown.Item>
              <Dropdown.Item eventKey="Pink">Pink</Dropdown.Item>
              <Dropdown.Item eventKey="Red">Red</Dropdown.Item>
              <Dropdown.Item eventKey="Yellow">Yellow</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={pointerColor}
              id="pointerColor"
              variant="light"
              onSelect={setPointerColor}
            >
              <Dropdown.Item disabled>Color Of Comparisons</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Black">Black</Dropdown.Item>
              <Dropdown.Item eventKey="Blue">Blue</Dropdown.Item>
              <Dropdown.Item eventKey="Cyan">Cyan</Dropdown.Item>
              <Dropdown.Item eventKey="Green">Green</Dropdown.Item>
              <Dropdown.Item eventKey="Pink">Pink</Dropdown.Item>
              <Dropdown.Item eventKey="Red">Red (Default)</Dropdown.Item>
              <Dropdown.Item eventKey="Yellow">Yellow</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SplitButton
              title={sortedColor}
              id="sortedColor"
              variant="light"
              onSelect={setSortedColor}
            >
              <Dropdown.Item disabled>Color Of Sorted Elements</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="Black">Black</Dropdown.Item>
              <Dropdown.Item eventKey="Blue">Blue</Dropdown.Item>
              <Dropdown.Item eventKey="Cyan">Cyan</Dropdown.Item>
              <Dropdown.Item eventKey="Green">Green (Default)</Dropdown.Item>
              <Dropdown.Item eventKey="Pink">Pink</Dropdown.Item>
              <Dropdown.Item eventKey="Red">Red</Dropdown.Item>
              <Dropdown.Item eventKey="Yellow">Yellow</Dropdown.Item>
            </SplitButton>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button
              ref={randomizeRef}
              size="lg"
              variant="danger"
              onClick={randomize}
            >
              Randomize Array
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button ref={sortRef} size="lg" variant="success" onClick={sort}>
              Sort !
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert>{message}</Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VisualizerController;
