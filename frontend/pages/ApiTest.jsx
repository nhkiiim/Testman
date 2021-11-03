import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import historyDump from "../dummy/historyDump.json";
import HistoryList from "../components/HistoryList";
import CollectionsList from "../components/CollectionsList";
import { PlusCircleIcon } from "@heroicons/react/solid";
import AuthKey from "../components/AuthKey";
import HeadersOption from "../components/HeadersOption";
import BodyOption from "../components/BodyOption";
import SettingsOption from "../components/SettingsOption";
import responseDump from "../dummy/responseDump.json";
 
const ApiTest = () => {
    const [btnIndex, setBtnIndex] = useState(0);
    const [optionBtn, setOptionBtn] = useState('params');
    const [showModal, setShowModal] = useState(false);
    const [payload, setPayload] = useState({
        method:'',
        baseUrl:'baseUrl',
        uri:''
    })
    const clickHistory = () => {
        setBtnIndex(0);
    }

    const clickCollections = () => {
        setBtnIndex(1)
    }

    const handlePayload = (e) => {
        const { value, name } = e.target
        setPayload({
            ...payload,
            [name]: value
        })
    }

    const clickSendBtn = () => {
        console.log({payload})
    }

    const clickOptionBtn = (e) => {
        setOptionBtn(e.target.name)
    }
    
    const clickSaveBtn = () => {
        setShowModal(true)
    }

    const [btnDescription, setBtnDescription] = useState(false);

    const [tableCnt, setTableCnt] = useState([0]);
    
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
    // 아직 미구현 부분
    const handleParam = index => (e) => {
      const { value, name } = e.target
      const copied = params.slice()
      setParams(() => {
        return [...params.slice(0, index),
        {
          ...copied[index],
          [name]:value
        },
        ...params.slice(index + 1)
      ]
      })
    }

    const [params, setParams] = useState([{
      paramCheckbox:false,
      paramKey:'',
      paramValue:'',
      paramDescription:''
    }])

    const [bodyOption, setBodyOption] = useState('none')

    const handleBodyOption = (e) => {
      setBodyOption(e.target.value)

    }


    // useEffect(() => {
    //     console.log(params)
    //   });

    return (
        <div>
            <Header />
            {/* history, collections 부분 */}
            {showModal?
            <>
                (<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Save request</h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form className="flex flex-col w-[350px]" method="POST" action="#">
                        <div className="mb-6 pt-3 rounded">
                          <label className="block text-sm font-bold mb-0 ml-3" for="requestName">
                            Request Name
                          </label>
                          <input
                            type="text"
                            id="requestName"
                            className="bg-gray-200 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                          />
                        </div>
                        {!btnDescription ?
                        <div>
                        <button className="block text-gray-700 text-sm font-bold mb-3 ml-3 text-left underline" onClick={() => {
                          setBtnDescription(true)
                        }}>Add description</button>
                        </div>
                        :
                        <div className="mb-6 pt-3 rounded">
                          <label className="block text-sm font-bold mb-0 ml-3" for="description">
                            Description
                          </label>
                          <textarea
                            type="text"
                            id="description"
                            className=" resize-none overflow-auto bg-gray-200 rounded w-full h-40 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                          />
                        </div>
                          
                      }
        
                        <div className="mb-6 pt-3 rounded">
                          <label className="block text-sm font-bold mb-0 ml-3" for="URL">
                            Save to
                          </label>
                          <button className="bg-white w-full mb-0 ml-3 text-left hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50">
                            New Collection
                          </button>
                        </div>
                      </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-purple-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>)
              </>
            :
            null
            }
            <div className="flex">
                <div>
                    {btnIndex?
                    <div>
                        <div>
                            <button onClick={clickHistory} >History</button>
                            <button onClick={clickCollections} className="underline">Collections</button>
                        </div>
                        <div>
                            Collections List
                            <CollectionsList/>
                        </div>
                    </div>                
                    :
                    <div>
                        <div>
                            <button onClick={clickHistory} className="underline">History</button>
                            <button onClick={clickCollections}>Collections</button>
                        </div>
                        <div>
                            History List
                            {historyDump?.map(({ index, method, url }) => (
                                <HistoryList key={index} method={method} url={url} />
                            ))}
                        </div>
                    </div>
                    }
                    
                </div>
                {/* api test 입력 부분 */}
                <div>
                    {/* 제목, base url */}
                    <div className="flex">
                        <div className="mr-2">
                            API TEST
                        </div>
                        <input type="text" placeholder="base url" onChange={handlePayload} name="baseUrl"/>
                    </div>
                    <div className="flex">
                        <div className="mr-40">
                            Untitled Request
                        </div>
                        <button className="border-2 border-purple-500" onClick={clickSaveBtn}>Save</button>
                    </div>
                    <div className="flex">
                        <select name="method" id="" onChange={handlePayload} className="mr-2"> 
                            <option value="" selected disabled>method</option>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PATCH">PATCH</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                        <input type="text" name="uri" value={payload.uri} onChange={handlePayload} placeholder="Type uri here" className="border-2 border-purple-500"/>
                        <button className="border-2 border-purple-500" onClick={clickSendBtn}>Send</button>
                    </div>
                    <div>
                        <div className="flex">
                            <button name="params" onClick={clickOptionBtn} className={optionBtn=="params"?"underline":""}>
                                Params
                            </button>
                            <button name="authorization" onClick={clickOptionBtn} className={optionBtn=="authorization"?"underline":""}>
                                Authorization
                            </button>
                            <button name="headers" onClick={clickOptionBtn} className={optionBtn=="headers"?"underline":""}>
                                Headers
                            </button>
                            <button name="body" onClick={clickOptionBtn} className={optionBtn=="body"?"underline":""}>
                                Body
                            </button>
                            <button name="settings" onClick={clickOptionBtn} className={optionBtn=="settings"?"underline":""}>
                                Settings
                            </button>
                        </div>
                        {/* header 입력 부분 */}
                        {function(){
                          switch (optionBtn){
                            case "params":
                              return <div>
                              Quary Params
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
                          case "authorization":
                            return <div>
                            <AuthKey/>
                          </div>
                          case "headers":
                            return <div>
                              <HeadersOption/>
                            </div>
                          case "body":
                            return <div>
                              <BodyOption/>
                            </div>
                          case "settings":
                            return <SettingsOption/>
                          }
                        }()
                      }
                    <div>
                        Response
                        <div>
                            {responseDump.data.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
};

export default ApiTest;