import React, { useEffect, useState } from "react";

const AuthKey = () => {
  const [authType, setAuthType] = useState("");
  const handleAuthType = (e) => {
    setAuthType(e.target.value);
  };
  const [apiKey, setApiKey] = useState({
    key: "",
    value: "",
    addTo: "",
  });

  const [bearerToken, setBearerToken] = useState("");

  const [basicAuth, setBasicAuth] = useState({
    username: "",
    password: "",
  });

  const [awsSignature, setAwsSignature] = useState({
    accessKey: "",
    secretKey: "",
  });

  const handleApiKey = (e) => {
    const { value, name } = e.target;
    setApiKey({
      ...apiKey,
      [name]: value,
    });
  };

  const handleBearerToken = (e) => {
    setBearerToken(e.target.value);
  };

  const handleBasicAuth = (e) => {
    const { value, name } = e.target;
    setBasicAuth({
      ...basicAuth,
      [name]: value,
    });
  };

  const handleAwsSignature = (e) => {
    const { value, name } = e.target;
    setAwsSignature({
      ...awsSignature,
      [name]: value,
    });
  };

  // useEffect(() => {
  //       console.log(awsSignature)
  //     });

  return (
    <div className="w-full mt-5">
      Authorization
      <div className=" flex ">
        <div className="mt-6 flex">
          <p className="mr-20 text-gray-500">Type</p>
          <p className="mr-20 text-gray-500">:</p>
        </div>
        <button className="w-[120px] h-[35px] bg-gray-200 rounded-md mt-[16px]">
          Bearer Token
        </button>

        {/* <select
          name="method"
          id=""
          defaultValue="No Auth"
          onChange={handleAuthType}
          className="bg-gray-200 border border-gray-300 h-9 pr-[30px] mr-8 rounded-sm mt-5"
        >
          <option value="noAuth">No Auth</option>
          <option value="apiKey">API Key</option>
          <option value="bearerToken">Bearer Token</option>
          <option value="basicAuth">Basic Auth</option>
          <option value="awsSignature">AWS Signature</option>
        </select> */}
      </div>
      <div>
        <input
          type="text"
          name="key"
          onChange={handleApiKey}
          value={apiKey.key}
          className="border w-full h-9 pl-3 mt-5 rounded-sm"
          placeholder="Key"
        />
      </div>
      {/* <div>
        {(function () {
          switch (authType) {
            case "noAuth":
              return null;
            case "apiKey":
              return (
                <div className="mt-8 ml-8">
                  <div className="flex text-gray-700">
                    <p className="text-sm">Key</p>
                    <input
                      type="text"
                      name="key"
                      onChange={handleApiKey}
                      value={apiKey.key}
                      className="ml-[280px] border w-[280px] h-8 pl-3"
                      placeholder="Key"
                    />
                  </div>
                  <div className="flex mt-10 text-gray-600">
                    <p className="text-sm">Value</p>
                    <input
                      type="text"
                      name="value"
                      onChange={handleApiKey}
                      value={apiKey.value}
                      className="ml-[268px] border w-[280px] h-8 pl-3"
                      placeholder="Value"
                    />
                  </div>
                  <div className="flex mt-10 text-gray-600">
                    <p className="text-sm">Add to</p>
                    <input
                      type="text"
                      name="addTo"
                      onChange={handleApiKey}
                      value={apiKey.addTo}
                      className="ml-[261px] border w-[280px] h-8"
                    />
                  </div>
                </div>
              );
            case "bearerToken":
              return (
                <div className="mt-8 ml-8 flex text-gray-700">
                  <p className="text-sm">Token</p>
                  <input
                    type="text"
                    name="token"
                    onChange={handleBearerToken}
                    value={bearerToken}
                    className="ml-[264px] border w-[280px] h-8 pl-3"
                    placeholder="Token"
                  />
                </div>
              );
            case "basicAuth":
              return (
                <div className="mt-8 ml-8">
                  <div className="flex text-gray-700">
                    <p className="text-sm">Username</p>
                    <input
                      type="text"
                      name="username"
                      onChange={handleBasicAuth}
                      value={basicAuth.username}
                      className="ml-[238px] border w-[280px] h-8 pl-3"
                      placeholder="Username"
                    />
                  </div>
                  <div className="flex mt-10 text-gray-600">
                    <p className="text-sm">Password</p>
                    <input
                      type="password"
                      name="password"
                      onChange={handleBasicAuth}
                      value={basicAuth.password}
                      className="ml-[241px] border w-[280px] h-8 pl-3"
                      placeholder="Password"
                    />
                  </div>
                </div>
              );
            case "awsSignature":
              return (
                <div className="mt-8 ml-8">
                  <div className="flex text-gray-700">
                    <p className="text-sm">Access Key</p>
                    <input
                      type="text"
                      name="accessKey"
                      onChange={handleAwsSignature}
                      value={awsSignature.accessKey}
                      className="ml-[230px] border w-[280px] h-8 pl-3"
                      placeholder="Access Key"
                    />
                  </div>
                  <div className="flex mt-10 text-gray-700">
                    <p className="text-sm">Secret Key</p>
                    <input
                      type="text"
                      name="secretKey"
                      onChange={handleAwsSignature}
                      value={awsSignature.secretKey}
                      className="ml-[235px] border w-[280px] h-8 pl-3"
                      placeholder="Secret Key"
                    />
                  </div>
                </div>
              );
          }
        })()}
      </div> */}
    </div>
  );
};

export default AuthKey;
