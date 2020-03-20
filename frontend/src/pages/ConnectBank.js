import React, { useState } from 'react'
import Styled from 'styled-components/macro'
import { Button, ButtonGroup, Switch, Select, FormControl, MenuItem, InputLabel, FormHelperText, FormControlLabel, TextField } from '@material-ui/core'

const Main = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
`

const Paper = Styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);

    @media (min-width: 768px) {
        width: 50vw;
        height: 50vh;
    }
`

const Header = Styled.h2`
    font-weight: 400;
`

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

const Separator = Styled.span`
    margin: 16px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ConnectBank = () => {
    const [ssn, setSsn] = useState('')
    const [bank, setBank] = useState('')
    const [test, setTest] = useState(false)

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const REDIRECT_URL = process.env.REDIRECT_URL || "http://localhost:3000"

    const ssnData = ssn !== '' ? "&input_username=" + ssn : ""
    const providerData = bank !== '' ? "&input_provider=" + bank : ""
    const testData = test !== false ? "&test=" + test : ""

    const link =
        "https://link.tink.com/1.0/authorize/?" +
        "client_id=" +
        CLIENT_ID +
        "&redirect_uri=" +
        REDIRECT_URL +
        "/callback&scope=accounts:read" +
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
            <Paper>
                <Header>Please fill out your bank informationn.</Header>
                <Container>
                    <Separator>
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
                    </Separator>
                    <Separator>
                        <FormControlLabel
                            control={
                                <Switch checked={test} color="secondary" onChange={runTest} />
                            }
                            label="Test"
                        />
                    </Separator>
                    <ButtonGroup>
                        <Button variant="contained" color="secondary" size="large" href="/">
                            Back
                        </Button>
                        <Button variant="contained" color="primary" size="large" href={link}>
                            Go to bank
                        </Button>
                    </ButtonGroup>
                </Container>
            </Paper>
        </Main >
    )
}