import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";

class Tuple {
  constructor(first, second, operation) {
    this.first = first;
    this.second = second;
    this.operation = operation;
  }
}

const SortingVisualizer = (props) => {
  const [arr, setArr] = useState([]);
  const [sortingAlgorithm, setSortingAlgorithm] = useState("");
  const [size, setSize] = useState("");
  const [speed, setSpeed] = useState("");
  const [barColor, setBarColor] = useState("");
  const [pointerColor, setPointerColor] = useState("");
  const [sortedColor, setSortedColor] = useState("");
  const [sort, setSort] = useState(false);
  const [randomize, setRandomize] = useState(false);
  const [sorted, setSorted] = useState(false);

  const width = window.screen.width;
  const height = window.screen.height;

  useEffect(() => {
    initializeArray();
  }, [props.controllerData]);

  const initializeArray = () => {
    const controllerData = props.controllerData;
    let temp = new Set();
    while (temp.size !== parseInt(controllerData["size"])) {
      temp.add(getRandomElement());
    }
    temp = Array.from(temp);
    setArr(temp);
    setSortingAlgorithm(controllerData["sortingAlgorithm"]);
    setSize(controllerData["size"]);
    setSpeed(controllerData["speed"]);
    setBarColor(getColor(controllerData["barColor"]));
    setPointerColor(getColor(controllerData["pointerColor"]));
    setSortedColor(getColor(controllerData["sortedColor"]));
    setSort(controllerData["sort"]);
    setRandomize(controllerData["randomize"]);
  };

  useEffect(() => {
    if (sort) {
      switch (sortingAlgorithm) {
        case "Cocktail Sort":
          cocktailSort();
          break;
        case "Heap Sort":
          heapSort();
          break;
        case "Insertion Sort":
          insertionSort();
          break;
        case "Linear Sort":
          linearSort();
          break;
        case "Merge Sort":
          mergeSortUtil();
          break;
        case "Quick Sort":
          quickSortUtil();
          break;
        case "Selection Sort":
          selectionSort();
          break;
        default:
          bubbleSort();
          break;
      }
    } else {
      initializeArray();
    }
  }, [sort, sortingAlgorithm, randomize, size]);

  const bubbleSort = async () => {
    setSorted(false);
    props.visualizerDataHandler(false);
    const bars = document.getElementsByClassName("array-bar");
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        bars[j].style.backgroundColor = pointerColor;
        bars[j + 1].style.backgroundColor = pointerColor;
        const e = parseInt(bars[j].innerHTML);
        const f = parseInt(bars[j + 1].innerHTML);
        if (e > f) {
          [bars[j].innerHTML, bars[j + 1].innerHTML] = [
            bars[j + 1].innerHTML,
            bars[j].innerHTML,
          ];
          [bars[j].style.width, bars[j + 1].style.width] = [
            bars[j + 1].style.width,
            bars[j].style.width,
          ];
          if (randomize) return;
          await sleep(getSpeed(speed));
          if (randomize) return;
        }
        bars[j].style.backgroundColor = barColor;
        bars[j + 1].style.backgroundColor = barColor;
      }
      bars[n - i - 1].style.backgroundColor = sortedColor;
    }
    bars[0].style.backgroundColor = sortedColor;
    setSorted(true);
    props.visualizerDataHandler(true);
  };

  const cocktailSort = async () => {
    setSorted(false);
    props.visualizerDataHandler(false);
    const bars = document.getElementsByClassName("array-bar");
    let swapped = true;
    let start = 0;
    let end = bars.length - 1;
    while (swapped) {
      swapped = false;
      for (let i = start; i < end; ++i) {
        if (parseInt(bars[i].innerHTML) > parseInt(bars[i + 1].innerHTML)) {
          bars[i].style.backgroundColor = pointerColor;
          bars[i + 1].style.backgroundColor = pointerColor;
          if (randomize) return;
          await sleep(getSpeed(speed));
          if (randomize) return;
          bars[i].style.backgroundColor = barColor;
          bars[i + 1].style.backgroundColor = barColor;
          [bars[i].innerHTML, bars[i + 1].innerHTML] = [
            bars[i + 1].innerHTML,
            bars[i].innerHTML,
          ];
          [bars[i].style.width, bars[i + 1].style.width] = [
            bars[i + 1].style.width,
            bars[i].style.width,
          ];
          swapped = true;
        }
      }
      if (!swapped) break;
      swapped = false;
      bars[end].style.backgroundColor = sortedColor;
      --end;
      for (let i = end - 1; i >= start; --i) {
        if (parseInt(bars[i].innerHTML) > parseInt(bars[i + 1].innerHTML)) {
          bars[i].style.backgroundColor = pointerColor;
          bars[i + 1].style.backgroundColor = pointerColor;
          if (randomize) return;
          await sleep(getSpeed(speed));
          if (randomize) return;
          bars[i].style.backgroundColor = barColor;
          bars[i + 1].style.backgroundColor = barColor;
          [bars[i].innerHTML, bars[i + 1].innerHTML] = [
            bars[i + 1].innerHTML,
            bars[i].innerHTML,
          ];
          [bars[i].style.width, bars[i + 1].style.width] = [
            bars[i + 1].style.width,
            bars[i].style.width,
          ];
          swapped = true;
        }
      }
      bars[start].style.backgroundColor = sortedColor;
      ++start;
    }
    let i = start;
    let j = end;
    while (i <= j) {
      bars[j].style.backgroundColor = sortedColor;
      bars[i].style.backgroundColor = sortedColor;
      i++;
      j--;
    }
    setSorted(true);
    props.visualizerDataHandler(true);
  };

  const heapSort = async () => {
    setSorted(false);
    props.visualizerDataHandler(false);
    const bars = document.getElementsByClassName("array-bar");
    for (let e = 1; e < bars.length; e++) {
      let i = e;
      while (i > 0) {
        if (
          parseInt(bars[i].innerHTML) >
          parseInt(bars[Math.floor((i - 1) / 2)].innerHTML)
        ) {
          const x = i;
          const y = Math.floor((i - 1) / 2);
          const temp = bars[x].innerHTML;
          const tempWidth = bars[x].style.width;
          bars[x].style.backgroundColor = pointerColor;
          bars[y].style.backgroundColor = pointerColor;
          bars[x].innerHTML = bars[y].innerHTML;
          bars[x].style.width = bars[y].style.width;
          bars[y].innerHTML = temp;
          bars[y].style.width = tempWidth;
          await sleep(getSpeed(speed));
          bars[x].style.backgroundColor = barColor;
          bars[y].style.backgroundColor = barColor;
          i = y;
        } else {
          break;
        }
      }
      if (randomize) return;
      await sleep(getSpeed(speed));
      if (randomize) return;
    }
    for (let e = bars.length - 1; e > 0; e--) {
      bars[0].style.backgroundColor = pointerColor;
      bars[e].style.backgroundColor = pointerColor;
      const temp = bars[0].innerHTML;
      const tempWidth = bars[0].style.width;
      bars[0].innerHTML = bars[e].innerHTML;
      bars[0].style.width = bars[e].style.width;
      bars[e].innerHTML = temp;
      bars[e].style.width = tempWidth;
      await sleep(getSpeed(speed));
      bars[0].style.backgroundColor = barColor;
      bars[e].style.backgroundColor = barColor;
      let end = e - 1;
      let i = 0;
      while (i <= end) {
        const leftIndex = 2 * i + 1;
        if (leftIndex > end) break;
        let rightIndex = 2 * i + 2;
        if (rightIndex > end) rightIndex = leftIndex;
        if (
          parseInt(bars[i].innerHTML) >=
          Math.max(
            parseInt(bars[leftIndex].innerHTML),
            parseInt(bars[rightIndex].innerHTML)
          )
        )
          break;
        if (
          parseInt(bars[leftIndex].innerHTML) >=
          parseInt(bars[rightIndex].innerHTML)
        ) {
          const x = i;
          const y = leftIndex;
          bars[x].style.backgroundColor = pointerColor;
          bars[y].style.backgroundColor = pointerColor;
          const temp = bars[x].innerHTML;
          const tempWidth = bars[x].style.width;
          bars[x].innerHTML = bars[y].innerHTML;
          bars[x].style.width = bars[y].style.width;
          bars[y].innerHTML = temp;
          bars[y].style.width = tempWidth;
          await sleep(getSpeed(speed));
          bars[x].style.backgroundColor = barColor;
          bars[y].style.backgroundColor = barColor;
          i = y;
        } else {
          const x = i;
          const y = rightIndex;
          bars[x].style.backgroundColor = pointerColor;
          bars[y].style.backgroundColor = pointerColor;
          const temp = bars[x].innerHTML;
          const tempWidth = bars[x].style.width;
          bars[x].innerHTML = bars[y].innerHTML;
          bars[x].style.width = bars[y].style.width;
          bars[y].innerHTML = temp;
          bars[y].style.width = tempWidth;
          await sleep(getSpeed(speed));
          bars[x].style.backgroundColor = barColor;
          bars[y].style.backgroundColor = barColor;
          i = y;
        }
      }
      bars[e].style.backgroundColor = sortedColor;
      if (randomize) return;
      await sleep(getSpeed(speed));
      if (randomize) return;
    }
    bars[0].style.backgroundColor = sortedColor;
    setSorted(true);
    props.visualizerDataHandler(true);
  };

  // Implement other sorting functions similarly...

  const getColor = (colorString) => {
    const colorMap = {
      Red: "#FF0000",
      Green: "#00FF00",
      Blue: "#0000FF",
      Yellow: "#FFFF00",
      Orange: "#FFA500",
      Purple: "#800080",
      Pink: "#FFC0CB",
    };
    return colorMap[colorString] || "#000000";
  };

  const getRandomElement = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const getSpeed = (speed) => {
    const speedMap = {
      Slow: 1000,
      Medium: 500,
      Fast: 100,
    };
    return speedMap[speed] || 500;
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <div className="array-container">
      {arr.map((value, index) => (
        <div
          className="array-bar"
          key={index}
          style={{
            backgroundColor: barColor,
            width: `${(width - size * 5) / size}px`,
            height: `${(height / 1.5) * (value / 100)}px`,
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default SortingVisualizer;
