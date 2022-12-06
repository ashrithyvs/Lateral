import React from "react";

function Tile({ element }) {
  return (
    <div className="font-extrabold text-2xl p-8 bg-[#a8c3dd] border-[1px]">
      {element}
    </div>
  );
}

export default Tile;
