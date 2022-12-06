import React from "react";

function InputTile({ element }) {
  return (
    <div className="font-extrabold text-xl p-5 bg-[#2691fb] border-[1px]">
      <input
        value={element}
        className="bg-transparent w-3 outline-none border-0"
      />
    </div>
  );
}

export default InputTile;
