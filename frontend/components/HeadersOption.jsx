import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { setParamsState } from "../store/modules/api";

const HeadersOption = () => {
  const [tableCnt, setTableCnt] = useState([0]);

  const [params, setParams] = useState([{
    paramCheckbox:false,
    paramKey:'',
    paramValue:'',
    paramDescription:''
  }])

  const clickPlusBtn = () => {
    const cntList = [...tableCnt]
    const counter = cntList.slice(-1)[0] + 1
    cntList.push(counter)
    setTableCnt(cntList)
    setParams(() => {
      return [...params, {
        paramCheckbox:false,
        paramKey:'',
        paramValue:'',
        paramDescription:''
      }]
    })
  }

  const handleParam = index => (e) => {
    const { value, name } = e.target
    const copied = params.slice()
    setParams(() => {
      [...params.slice(0, index), {
        ...copied[index],
        [name]:value
      },
      ...params.slice(index + 1)
    ]
    })
    return useDispatch(setParamsState(params))
  }

  return (
    <div>
      <table className="border-2">
        <thead>
          <tr>
            <th> 
            </th>
            <th>key</th>
            <th>value</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {tableCnt && tableCnt.map((item, i) =>(
            <tr key={i} onChange={handleParam(i)}>
              <th> 
                <input type="checkbox" name="paramCheckbox"/>
              </th>
              <th>
                <input type="text" name="paramKey"/>
              </th>
              <th>
                <input type="text" name="paramValue"/>
              </th>
              <th>  
                <input type="text" name="paramDescription"/>
              </th>
            </tr>
          )) }
          <tr>
            <button onClick={clickPlusBtn}>
              <PlusCircleIcon className="w-8 text-purple-400" />
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HeadersOption;