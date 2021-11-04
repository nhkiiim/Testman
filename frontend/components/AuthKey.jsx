import React, { useEffect, useState } from "react";

const AuthKey = () => {
  const [authType, setAuthType] = useState('')
  const handleAuthType = (e) => {
    setAuthType(e.target.value)
  }
  const [apiKey, setApiKey] = useState({

    "key":'',
    "value":'',
    "addTo":''
    
  })

  const [bearerToken, setBearerToken] = useState('')

  const [basicAuth, setBasicAuth] = useState({
    "username":'',
    "password":''
  })

  const [awsSignature, setAwsSignature] = useState({
    "accessKey":'',
    "secretKey":''
  })

  const handleApiKey = (e) => {
    const { value, name } = e.target
    setApiKey({
      ...apiKey,
      [name]:value
    })
  }

  const handleBearerToken = (e) => {
    setBearerToken(e.target.value)
  }

  const handleBasicAuth = (e) => {
    const { value, name } = e.target
    setBasicAuth({
      ...basicAuth,
      [name]:value
    })
  }

  const handleAwsSignature = (e) => {
    const { value, name } = e.target
    setAwsSignature({
      ...awsSignature,
      [name]:value
    })
  }

  // useEffect(() => {
  //       console.log(awsSignature)
  //     });

  return (
    <div className="w-[372px] pt-3 h-10 flex">
      <div className="pr-2 flex">
        type
        <select name="method" id="" onChange={handleAuthType} className="mr-2"> 
          <option value="noAuth" selected>No Auth</option>
          <option value="apiKey">API Key</option>
          <option value="bearerToken">Bearer Token</option>
          <option value="basicAuth">Basic Auth</option>
          <option value="awsSignature">AWS Signature</option>
        </select>
      </div>
      <div>
      {
      (function(){
        switch (authType) {
          case "noAuth":
            return null
          case "apiKey":
            return <div>
              <div>key <input type="text" name="key" onChange={handleApiKey} value={apiKey.key}/></div>
              <div>value <input type="text" name="value" onChange={handleApiKey} value={apiKey.value}/></div>
              <div>Add to <input type="text" name="addTo" onChange={handleApiKey} value={apiKey.addTo}/></div>
            </div>
          case "bearerToken":
            return <div>
              Token <input type="text" name="token" onChange={handleBearerToken} value={bearerToken}/>
            </div>
          case "basicAuth":
            return <div>
              <div>username <input type="text" name="username" onChange={handleBasicAuth} value={basicAuth.username}/></div>
              <div>password <input type="password" name="password" onChange={handleBasicAuth} value={basicAuth.password}/></div>
            </div>
          case "awsSignature":
            return <div>
              <div>Access Key <input type="text" name="accessKey" onChange={handleAwsSignature} value={awsSignature.accessKey}/></div>
              <div>Secret Key <input type="text" name="secretKey" onChange={handleAwsSignature} value={awsSignature.secretKey}/></div>
            </div>
        }
      })()
    }
      </div>
    </div>
  );
};

export default AuthKey;