import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import historyDump from "../dummy/historyDump.json";
import HistoryList from "../components/HistoryList";

const ApiTest = () => {
    const [btnIndex, setBtnIndex] = useState(0);
    const clickHistory = () => {
        setBtnIndex(0);
    }
    const clickCollections = () => {
        setBtnIndex(1)
    }
    useEffect(() => {
        console.log(btnIndex)
      });
    return (
        <div>
            <Header />
            <div>
                {btnIndex?
                <div>
                    <div>
                        <button onClick={clickHistory} >History</button>
                        <button onClick={clickCollections} class="underline">Collections</button>
                    </div>
                    <div>
                        Collections List
                    </div>
                </div>                
                :
                <div>
                    <div>
                        <button onClick={clickHistory} class="underline">History</button>
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
        </div>
    );
};

export default ApiTest;