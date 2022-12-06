import { useState } from "react";
import Tile from "./Tile";
function NQueen() {
  const N = 8;
  const initial = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const [board, setBoard] = useState(initial);

  function isSafe(board, row, col) {
    for (let i = 0; i < col; i++) {
      if (board[row][i] == 1) return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
      if (board[i][j]) return false;

    for (let i = row, j = col; j >= 0 && i < N; i++, j--)
      if (board[i][j]) return false;

    return true;
  }

  function solveNQUtil(board, col) {
    if (col >= N) return true;

    for (let i = 0; i < N; i++) {
      if (isSafe(board, i, col) == true) {
        board[i][col] = 1;

        if (solveNQUtil(board, col + 1) == true) return true;

        board[i][col] = 0;
      }
    }
    return false;
  }

  function solveNQ() {
    let board = JSON.parse(JSON.stringify(initial));

    if (solveNQUtil(board, 0) == false) {
      return [];
    }

    return board;
  }

  return (
    <div className="bg-[#8ea5bb] w-full min-h-screen text-slate-50 flex flex-col mx-auto justify-center items-center py-12">
      <div className="flex flex-col">
        {board.length !== 0 ? (
          board.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="flex flex-row">
                {row.map((tile, tileIdx) => {
                  return <Tile key={tileIdx} element={tile} />;
                })}
              </div>
            );
          })
        ) : (
          <h4 className="text-4xl">No Solution Found</h4>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => setBoard(solveNQ())}
          className="border-2 font-bold py-2 px-4 mt-6  rounded-lg"
        >
          Solve
        </button>{" "}
        <button
          onClick={() => setBoard(initial)}
          className="border-2 font-bold py-2 px-4 mt-6  rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default NQueen;
