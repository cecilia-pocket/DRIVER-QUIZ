import React, { useEffect, useState } from "react";
import API from "../API";
import { useSelector, useDispatch } from "react-redux";
import { Inc, Dec, UserSelecOption, ShowResult } from "../Reducer/Actions";

const Question = () => {
  let [State, setState] = useState(null);
  let [Index, setIndex] = useState(null);
  let [Res,setRes]=useState(null);

  let Dispatch = useDispatch();
  let Stats = useSelector((Stat) => {
    return Stat.Reducer;
  });
  let StatsTwo = useSelector((Stat) => {
    return Stat.ReducerTwo;
  });

  useEffect(() => {
    if (Stats.UserArray[Stats.Value] != null) {
      setIndex(Stats.UserArray[Stats.Value]);
      setState(true);
    } else {
      setState(false);
      setIndex(null);
    }
  });

  return (
    <div>
      <div className="text-[#141414] p-3 my-2 rounded-md">
        <div className="Ask font-bold">
          {`${API[Stats.Value].Question} ? `}{" "}
        </div>

        <div className="Options">
          {API[Stats.Value].Options.map((Elem, Ind) => {
            return (
              <label
                key={Ind}
                onClick={() => {
                  Dispatch(UserSelecOption(Stats.Value, Ind));
                }}
                htmlFor={Ind}
                className="flex space-x-2 Blur my-3 p-2 rounded-md items-center"
              >
                <input
                  type="radio"
                  id={Ind}
                  name={Stats.Value}
                  value={Elem}
                  className={`appearance-none bg-white h-[15px] w-[15px] rounded-full border-2 border-grey bg-${
                    Index !== null && Index == Ind && "[#BDB4FF]"
                  }`}
                />
                <p>{Elem}</p>
              </label>
            );
          })}
        </div>
      </div>
      <div className="Buttons flex w-[100%] justify-between space-x-2">
        <div
          onClick={() => {
            Dispatch(Dec());
          }}
          className="B1 bg-[#FFB985] w-[50%] p-2 rounded-md cursor-pointer text-center"
        >
          Précédent
        </div>
        <div
          onClick={() => {
            Dispatch(Inc());
          }}
          className={`B2 ${
            Stats.Value != API.length - 1
              ? "text-center block bg-[#FFB985] w-[50%] p-2 rounded-md cursor-pointer"
              : "hidden"
          }`}
        >
          Suivant
        </div>
        <div
          onClick={()=>{Dispatch(ShowResult())}}
          className={`B3 ${
            Stats.Value == API.length - 1
              ? "block bg-red-500 text-white w-[50%] p-2 rounded-md cursor-pointer text-center"
              : "hidden"
          }`}
        >
          Envoyer
        </div>
      </div>
      </div>
      );
  };

export default Question;
