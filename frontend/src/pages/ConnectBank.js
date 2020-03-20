import React, { useState } from 'react'
import Styled from 'styled-components/macro'
import { Button, Switch, Select, FormControl, MenuItem, InputLabel, FormHelperText, FormControlLabel, TextField } from '@material-ui/core'

const Main = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export const ConnectBank = () => {
    const [ssn, setSsn] = useState('')
    const [bank, setBank] = useState('')
    const [test, setTest] = useState(false)

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const REDIRECT_URL = process.env.REDIRECT_URL

    const ssnData = ssn !== '' ? "&input_username=" + ssn : ""
    const providerData = bank !== '' ? "&input_provider=" + bank : ""
    const testData = test !== false ? "&test=" + test : ""

    const link =
        "https://link.tink.com/1.0/authorize/?" +
        "client_id=" +
        CLIENT_ID +
        `&redirect_uri=${REDIRECT_URL}/callback` +
        "&scope=accounts:read" +
        ssnData +
        providerData +
        "&market=SE&locale=en_US" +
        testData

    const runTest = () => {
        if (test) {
            setTest(false)
            setBank('')
            setSsn('')
        }
        else {
            setTest(true)
            setBank('se-test-bankid-successful')
            setSsn(180012121212)
        }
    }

    return (
        <Main>
            <TextField label="Enter your Personnummer" value={ssn} onChange={e => setSsn(e.target.value)} />
            <FormControl>
                <InputLabel id="bank-native-select">Bank</InputLabel>
                <Select
                    labelId="bank-native-select-label"
                    id="bank-native-select"
                    value={bank}
                    onChange={e => setBank(e.target.value)}
                    autoWidth
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="sbab-bankid">SBAB</MenuItem>
                </Select>
                <FormHelperText>Select a bank</FormHelperText>
            </FormControl>
            <FormControlLabel
                control={
                    <Switch checked={test} color="secondary" onChange={runTest} />
                }
                label="Test"
            />
            <Button variant="contained" color="primary" size="large" href={link}>
                Go to bank
            </Button>
        </Main >
    )
}