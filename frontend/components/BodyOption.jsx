import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";

const BodyOption = () => {
  const [bodyOption, setBodyOption] = useState('none')

  const handleBodyOption = (e) => {
    setBodyOption(e.target.value)

  }

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
    const paramsList = [...params]
    const newParam = {
      paramCheckbox:false,
      paramKey:'',
      paramValue:'',
      paramDescription:''
    }
    paramsList.push(newParam)
    setParams(newParam)
  }

  const handleParam = index => (e) => {
    const {name, value} = e.target
  }

  const [uploadFile, setUploadFile] = useState('')

  const handleUploadFile = (e) => {
    setUploadFile(e.targe.files)
  }

  useEffect(() => {
    console.log(bodyOption)
  });
  return (
    <div>
      <form>
        <fieldset>                        
          <label><input type="radio" name="bodyOption" value="none" onChange={handleBodyOption} checked={bodyOption=="none"}/>none</label>           
          <label><input type="radio" name="bodyOption" value="formData" onChange={handleBodyOption} checked={bodyOption=="formData"}/>form-data</label>            
          <label><input type="radio" name="bodyOption" value="formUrlencoded" onChange={handleBodyOption} checked={bodyOption=="formUrlencoded"}/>x-www-form-urlencoded</label>
          <label><input type="radio" name="bodyOption" value="binary" onChange={handleBodyOption} checked={bodyOption=="binary"}/>binary</label>              
        </fieldset>
      </form>
      {
      (function(){
        switch (bodyOption){
          case "none":
            return <div>
              This request does not have a body
            </div>
          case "formData":
            return <table className="border-2">
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
          case "binary":
            return <div>
              <label className="input-file-button cursor-pointer" for="input-file">
                Select File
              </label>
              <input type="file" id="input-file" style={{display:"none"}} onChange={handleUploadFile}/>
            </div>
        }
      })()
      }
    </div>
  );
};

export default BodyOption;