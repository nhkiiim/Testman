import React, { useEffect, useState } from "react";

const HistoryList = ({index, method, url}) => {
    const [methodColor, setMethodColor] = useState('text-purple');
    const changeColor = (method) => {
        if (method == 'GET') {
            setMethodColor('text-purle')
        } else if (method == 'POST'){
            setMethodColor('text-red')
        }
    }
    useEffect(() => {
        console.log(methodColor)
    });

    return (
        <div className="w-[372px] pt-3 h-10 ">
        <div className="text-1xl">
            {changeColor({method})}
            <span className={methodColor}>
                {method} 
            </span>
            <span className="px-[10px]">
                {url}
            </span>
        </div>
        </div>
    );
};

export default HistoryList;