import React, { useEffect, useState } from "react";



const SaveModal = (modal) => {
  const [showModal, setShowModal] = useState(modal);

  const [btnDescription, setBtnDescription] = useState(false);

  useEffect(() => {
        console.log(btnDescription)
      }); 


    return (
        <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-purple-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
    );
};

export default SaveModal;