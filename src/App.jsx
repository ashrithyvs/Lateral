import { useState } from "react";
import { Sudoku, WaterJug, EightPuzzle, NQueen } from "./components";

function App() {
  const problems = [
    { title: "8 Puzzle", component: <EightPuzzle /> },
    { title: "Water Jug", component: <WaterJug /> },
    { title: "N Queen", component: <NQueen /> },
    { title: "Sudoku", component: <Sudoku /> },
  ];
  const [currentProblem, setCurrentProblem] = useState(problems[3].component);

  return (
    <div className="min-w-[99.2vw] min-h-screen  bg-[#2B2D42]">
      <ul className="flex flex-wrap text-sm font-medium text-center mx-auto items-center justify-center py-4 text-slate-50">
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
      <h4 className="text-xl py-4 w-full text-center text-slate-50">
        Ashrith Yakkali - 19MIS7057
      </h4>
    </div>
  );
}

export default App;
