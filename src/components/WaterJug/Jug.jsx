import React from "react";

const Water = ({ idx, max }) => {
  return (
    <div
      className={`w-full h-[2rem] bg-blue-600 ${
        idx === max - 1 && "rounded-b-xl"
      }`}
    />
  );
};

function Jug({ lts }) {
  return (
    <div className="border-2 border-slate-50 rounded-b-xl border-t-0 min-h-[16rem] min-w-[8rem] flex flex-col justify-end">
      {Array(Math.round(lts))
        .fill()
        .map((lt, i) => {
          return <Water key={i} idx={i} max={Math.round(lts)} />;
        })}

      <span className="relative bottom-8 text-center h-0">{lts}lts</span>
    </div>
  );
}

export default Jug;
