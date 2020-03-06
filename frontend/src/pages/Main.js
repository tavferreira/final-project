import React, { useState } from 'react'

export const Main = () => {
    const [ssn, setSsn] = useState('')
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const ssnData = ssn !== '' ? "&input_username=" + ssn : ""
    const link =
        "https://link.tink.com/1.0/authorize/?" +
        "client_id=" +
        CLIENT_ID +
        "&redirect_uri=http://localhost:3000/callback" +
        "&scope=accounts:read" +
        ssnData +
        "&market=SE&locale=en_US"

    return (
        <div>
            <label>
                SSN
                <input type='text' name="ssn" value={ssn} onChange={e => setSsn(e.target.value)} />
            </label>
            <a href={link}><button type="button">
                Go to bank</button></a>
        </div>
    )
}