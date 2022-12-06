import React from "react";

function Tile({ element }) {
  return (
    <div className="font-extrabold text-4xl p-8 bg-[#dc847e] border-[1px]">
      {element}
    </div>
  );
}

export default Tile;
