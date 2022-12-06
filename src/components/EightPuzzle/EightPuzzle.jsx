import { useState } from "react";
import Algo from "./Algo";
import Tile from "./Tile";

function EightPuzzle() {
  const algos = [
    { title: "Bidirectional Search", value: "bds" },
    { title: "A* Algorithm Search", value: "astar" },
    { title: "Breadth First Search", value: "bfs" },
    { title: "Depth Limit Search", value: "dls" },
    { title: "Iterative Deepening Search", value: "ids" },
  ];
  const [currentAlgo, setCurrentAlgo] = useState(algos[0].value);
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const startState = [1, 2, 3, 8, 0, 4, 7, 6, 5];
  const goalState = [5, 6, 7, 4, 0, 8, 3, 2, 1];

  function runAlgo() {
    setResult(null);
    const res = Algo(startState, goalState, currentAlgo);
    setLoading(false);
    setResult(res);
  }

  return (
    <div className="bg-[#B76D68] w-full min-h-screen text-slate-50 flex flex-col mx-auto justify-center items-center py-12">
      <div className="w-1/6 mb-12 flex flex-col items-center">
        <select
          value={currentAlgo}
          onChange={(e) => setCurrentAlgo(e.target.value)}
          className="w-full bg-[#B76D68] border-[1px] p-2 outline-slate-50 border-slate-50 mb-4 text-slate-50"
        >
          {algos.map((algo) => {
            return (
              <option key={algo.value} value={algo.value}>
                {algo.title}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => {
            setLoading(true);
            runAlgo();
          }}
          className=" px-4 border-[1px] border-slate-50 py-2 rounded-lg"
        >
          Start
        </button>
      </div>
      <div className="flex space-x-12">
        <div className="flex flex-col mx-auto">
          <div className="flex">
            {startState.map((state, idx) => {
              return idx <= 2 && <Tile key={idx} element={state} />;
            })}
          </div>
          <div className="flex">
            {startState.map((state, idx) => {
              return idx <= 5 && idx > 2 && <Tile key={idx} element={state} />;
            })}
          </div>{" "}
          <div className="flex">
            {startState.map((state, idx) => {
              return idx <= 8 && idx > 5 && <Tile key={idx} element={state} />;
            })}
          </div>
        </div>{" "}
        <div className="flex flex-col mx-auto">
          <div className="flex">
            {goalState.map((state, idx) => {
              return idx <= 2 && <Tile key={idx} element={state} />;
            })}
          </div>
          <div className="flex">
            {goalState.map((state, idx) => {
              return idx <= 5 && idx > 2 && <Tile key={idx} element={state} />;
            })}
          </div>{" "}
          <div className="flex">
            {goalState.map((state, idx) => {
              return idx <= 8 && idx > 5 && <Tile key={idx} element={state} />;
            })}
          </div>
        </div>
      </div>
      {isLoading == true || !result?.moves ? (
        <h4 className="text-2xl mt-6">PROCESSING</h4>
      ) : (
        <div className="flex flex-col space-y-4 items-center text-xl mt-6">
          <h4 className="text-2xl">{result?.moves && "Result :"}</h4>
          <h4>{result?.moves}</h4>
          <h4>{result?.result}</h4>
          <h4>{result?.time} </h4>
        </div>
      )}
    </div>
  );
}

export default EightPuzzle;
