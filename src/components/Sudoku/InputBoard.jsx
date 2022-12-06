import React from "react";
import InputTile from "./InputTile";
function InputBoard({ grid, SetInputBoard }) {
  return (
    <div className="flex flex-col">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="flex flex-row">
            {row.map((tile, tileIdx) => {
              return <InputTile key={tileIdx} element={tile} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default InputBoard;
