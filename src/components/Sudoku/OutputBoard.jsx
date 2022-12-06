import React from "react";
import OutputTile from "./OutputTile";
function OutputBoard({ grid }) {
  return (
    <div className="flex flex-col">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="flex flex-row">
            {row.map((tile, tileIdx) => {
              return <OutputTile key={tileIdx} element={tile} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default OutputBoard;
