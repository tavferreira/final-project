import React, { useState, useEffect } from 'react';
import '../App.css';

export const Iframe = () => {
  const [showIframe, setShowIframe] = useState(false);

  const toggleIframe = () => {
    setShowIframe(!showIframe)
  }

  const receiveMessage = event => {
    console.log("SHAKA!")
    console.log(event.data)
    if (event.origin !== 'https://link.tink.com') {
        return;
    }
    // Read more about the message format here: https://docs.tink.com/api/#tink-link-response-iframe-mode
    const { type, data, error } = JSON.parse(event.data);
    console.log(type)
    console.log(data)
    console.log(error)
    if (type === 'code') {
        // This is the authorization code that should be exchanged for an access token
        const code = data;
        console.log(`Tink Link returned with authorization code: ${code}`);
    } else if (type === 'error') {
        // Handle error response from Tink Link
        console.log(`Tink Link returned with error status: ${error.status} and error message: ${error.message}.`);
    } else if (type === 'credentials') {
        // Handle credentials error response from Tink Link
        const credentialsId = data;
        console.log(`Authentication failed with credentials identifier: ${credentialsId} with error status: ${error.status} and error message: ${error.message}.`);
    } else if (type === 'status') {
        // Observe Tink Link loading state (optional)
        const { loading } = data;
        console.log(`Tink Link has ${loading ? 'shown' : 'hidden'} the loading overlay.`);
    } else {
        // More message types may be added in the future
    }
  }
    
  //  useEvent('message', receiveMessage, false);  
  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
  })
  
  return (
    <div className="App">
      {!showIframe && <button onClick={toggleIframe}>Toggle</button>}
      {showIframe && (
        <div className="iframe-container">
          <iframe src="https://link.tink.com/1.0/authorize/?client_id=6b57960d810f4c37bb91bb9f78fa5f08&redirect_uri=http://localhost:3000/callback&scope=accounts:read,transactions:read,user:read,credentials:read,identity:read,investments:read,statistics:read&market=SE&locale=en_US&iframe=true" title="Tink Link"/>
          <button onClick={toggleIframe}>Close</button>
        </div>
      )}
    </div>
  )
}