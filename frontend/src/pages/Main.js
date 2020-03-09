import React, { useState } from 'react'

export const Main = (props) => {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

    const [ssn, setSsn] = useState('')
    const [test, setTest] = useState(false)


    const ssnData = ssn !== '' ? "&input_username=" + ssn : ""
    const testData = test ? '&test=true' : ''
    const link =
        "https://link.tink.com/1.0/authorize/?" +
        "client_id=" +
        CLIENT_ID +
        "&redirect_uri=http://localhost:3000/callback" +
        "&scope=accounts:read" +
        ssnData +
        "&market=SE&locale=en_US" +
        testData

    return (
        <div>
            <label>
                SSN
                <input type='text' name="ssn" value={ssn} onChange={e => setSsn(e.target.value)} />
            </label>
            <label>
                Test providers
                <input type='checkbox' name='test' value={test} onChange={e => setTest(!test)} checked={test} />
            </label>
            <a href={link}><button type="button">
                Go to bank</button></a>
        </div >
    )
}