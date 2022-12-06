import { useState } from "react";
import {
  Sudoku,
  PathFinder,
  WaterJug,
  EightPuzzle,
  NQueen,
} from "./components";

function App() {
  const problems = [
    { title: "Sudoku", component: <Sudoku /> },
    // { title: "Path Finder", component: <PathFinder /> },
    { title: "Water Jug", component: <WaterJug /> },
    { title: "8 Puzzle", component: <EightPuzzle /> },
    { title: "N Queen", component: <NQueen /> },
  ];
  const [currentProblem, setCurrentProblem] = useState(problems[4].component);

  return (
    <div className="min-w-[99.2vw] min-h-screen">
      <ul className="flex flex-wrap text-sm font-medium text-center mx-auto items-center justify-center py-4 bg-slate-400 text-slate-50">
        {problems.map((problem, idx) => {
          return (
            <li
              key={idx}
              onClick={() => setCurrentProblem(problem.component)}
              className="cursor-pointer"
            >
              <div className="inline-block p-4 rounded-t-lg active ">
                {problem.title}
              </div>
            </li>
          );
        })}
      </ul>
      {currentProblem}
    </div>
  );
}

export default App;
