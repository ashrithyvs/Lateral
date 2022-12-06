import React, { useEffect, useState } from "react";
import Jug from "./Jug";
function WaterJug() {
  const [Jug1, setJug1] = useState(4);
  const [Jug2, setJug2] = useState(3);
  const [target, setTarget] = useState(2);
  const [result, setResult] = useState([]);
  function BFS(a, b, target) {
    let m = new Array(1000);
    for (let i = 0; i < 1000; i++) {
      m[i] = new Array(1000);
      for (let j = 0; j < 1000; j++) {
        m[i][j] = -1;
      }
    }

    let isSolvable = false;
    let path = [];

    let q = [];
    q.push([0, 0]);

    while (q.length != 0) {
      let u = q[0];

      q.shift();

      if (u[0] > a || u[1] > b || u[0] < 0 || u[1] < 0) continue;

      if (m[u[0]][u[1]] > -1) continue;
      path.push([u[0], u[1]]);

      m[u[0]][u[1]] = 1;
      if (u[0] == target || u[1] == target) {
        isSolvable = true;
        if (u[0] == target) {
          if (u[1] != 0) path.push([u[0], 0]);
        } else {
          if (u[0] != 0) path.push([0, u[1]]);
        }

        let sz = path.length;
        let res = [];
        for (let i = 0; i < sz; i++) {
          let temp = [];
          temp.push(path[i][0]);
          temp.push(path[i][1]);
          res.push(temp);
        }
        return res;
      }

      q.push([u[0], b]);
      q.push([a, u[1]]);

      for (let ap = 0; ap <= Math.max(a, b); ap++) {
        let c = u[0] + ap;
        let d = u[1] - ap;

        if (c == a || (d == 0 && d >= 0)) q.push([c, d]);

        c = u[0] - ap;
        d = u[1] + ap;

        if ((c == 0 && c >= 0) || d == b) q.push([c, d]);
      }

      q.push([a, 0]);
      q.push([0, b]);
    }
    if (!isSolvable) return [];
  }

  useEffect(() => {
    if ((Jug1 !== 0) & (Jug2 !== 0)) setResult(BFS(Jug1, Jug2, target));
  }, [Jug1, Jug2, target]);
  return (
    <div className="bg-orange-300 w-full min-h-screen text-slate-50 flex flex-col mx-auto justify-center items-center space-y-6 py-20">
      <div className=" flex space-x-6">
        <div className="flex space-x-4">
          <span>Jug 1:</span>
          <input
            className="max-w-[4rem] text-center bg-transparent border-[1px] border-slate-50"
            value={Jug1}
            min={1}
            onChange={(e) => setJug1(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <span>Jug 2:</span>
          <input
            className="max-w-[4rem] text-center bg-transparent border-[1px] border-slate-50"
            value={Jug2}
            min={1}
            onChange={(e) => setJug2(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <span>Target:</span>
          <input
            className="max-w-[4rem] text-center bg-transparent border-[1px] border-slate-50"
            value={target}
            min={1}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
      </div>
      {result.length === 0 ? (
        <div>Not Possible</div>
      ) : (
        result.map((row, rowIdx) => {
          return (
            <div
              key={rowIdx}
              className="flex items-center justify-center space-x-6"
            >
              <h4 className="text-xl mb-auto font-bold">Move - {rowIdx} : </h4>
              {row.map((lts, ltsIdx) => {
                return (
                  <div>
                    <Jug key={ltsIdx} lts={lts} />
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}

export default WaterJug;
