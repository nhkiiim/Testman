import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import historyDump from "../dummy/historyDump.json";
import HistoryList from "../components/HistoryList";
import CollectionsList from "../components/CollectionsList";

const ApiTest = () => {
    const [btnIndex, setBtnIndex] = useState(0);
    const [headerBody, setHeaderBody] = useState('header');
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

    const handleChangePayload = (e) => {
        const { value, name } = e.target
        setPayload({
            ...payload,
            [name]: value
        })
    }

    const clickSendBtn = () => {
        console.log({payload})
    }

    const clickHeaderBody = (e) => {
        setHeaderBody(e.target.name)
    }

    //  테이블 로우 추가하는 기능
    const pressEnter = (e) => {
        if(e.key === 'Enter') {
          console.log('add Tr')
        }
    }

    // useEffect(() => {
    //     console.log(payload)
    //   });

    return (
        <div>
            <Header />
            {/* history, collections 부분 */}
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
                        <input type="text" placeholder="base url" onChange={handleChangePayload} name="baseUrl"/>
                    </div>
                    <div className="flex">
                        <select name="method" id="" onChange={handleChangePayload} className="mr-2"> 
                            <option value="" selected disabled>method</option>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PATCH">PATCH</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                        <input type="text" name="uri" value={payload.uri} onChange={handleChangePayload} placeholder="Type uri here" className="border-2 border-purple-500"/>
                        <button className="border-2 border-purple-500" onClick={clickSendBtn}>Send</button>
                    </div>
                    <div>
                        <div className="flex">
                            <button className="mr-2" name="header" onClick={clickHeaderBody} className={headerBody=="header"?"underline":""}>
                                Headers
                            </button>
                            <button name="body" onClick={clickHeaderBody} className={headerBody=="body"?"underline":""}>
                                Body
                            </button>
                        </div>
                        {headerBody=="header"?
                        <div>
                            header table
                            <table className="border-2">
                                <thead>
                                    <tr>
                                        <th> 
                                            <input type="checkbox" />
                                        </th>
                                        <th>key</th>
                                        <th>value</th>
                                        <th>description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th> 
                                            <input type="checkbox" />
                                        </th>
                                        <th>
                                            <input type="text" />
                                        </th>
                                        <th>
                                            <input type="text" />
                                        </th>
                                        <th>
                                            <input type="text" />
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        :
                        <div>
                            body table
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiTest;