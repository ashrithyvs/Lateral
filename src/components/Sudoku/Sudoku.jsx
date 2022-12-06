import React, { useEffect } from "react";
import InputBoard from "./InputBoard";
import OutputBoard from "./OutputBoard";
import { useState } from "react";
function Sudoku() {
  let N = 9;

  function solveSudoku(grid, row, col) {
    let output = grid;
    if (row == N - 1 && col == N) return output;

    if (col == N) {
      row++;
      col = 0;
    }
    if (grid[row][col] != 0) return solveSudoku(grid, row, col + 1);

    for (let num = 1; num < 10; num++) {
      if (isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (solveSudoku(grid, row, col + 1)) return output;
      }

      grid[row][col] = 0;
    }
    return false;
  }
  function print(grid) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) document.write(grid[i][j] + " ");
      document.write("<br>");
    }
  }

  function isSafe(grid, row, col, num) {
    for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;

    for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;

    let startRow = row - (row % 3),
      startCol = col - (col % 3);

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == num) return false;

    return true;
  }

  const grid = [
    [3, 1, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const input = JSON.parse(JSON.stringify(grid));

  const [inputBoard, SetInputBoard] = useState([]);

  const [outputBoard, SetOutputBoard] = useState([]);

  useEffect(() => {
    SetInputBoard(input);
  }, []);

  return (
    <div className="bg-[#035fbb] w-full min-h-screen text-slate-50 flex flex-col mx-auto justify-center items-center space-y-6 ">
      <div className="flex space-x-6">
        {inputBoard.length !== 0 && (
          <InputBoard grid={inputBoard} SetInputBoard={SetInputBoard} />
        )}
        {outputBoard.length !== 0 && <OutputBoard grid={outputBoard} />}
      </div>
      <button
        className="px-4 py-2 rounded-lg border-[1px] border-slate-50"
        onClick={() => {
          inputBoard.length !== 0 && SetOutputBoard(solveSudoku(grid, 0, 0));
        }}
      >
        Solve
      </button>
    </div>
  );
}

export default Sudoku;
