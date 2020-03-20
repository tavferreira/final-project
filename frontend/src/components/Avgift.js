import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loans } from '../reducers/loans'
import { Button, Input, FormControl, FormHelperText, InputAdornment } from '@material-ui/core'
import Styled from 'styled-components/macro'

const Main = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export const Avgift = () => {
    const dispatch = useDispatch()
    const [avgift, setAvgift] = useState(0)

    const setAvgiftValue = (event) => {
        event.preventDefault()

        dispatch(loans.actions.setAvgift(avgift))
        dispatch(loans.actions.setStage('payments'))
    }

    return (
        <Main>
            <p>And finally, how much is the monthly avgift?</p>
            <FormControl>
                <Input
                    value={avgift}
                    onChange={event => setAvgift(event.target.value)}
                    endAdornment={<InputAdornment position="end">kr</InputAdornment>}
                />
                <FormHelperText id="loan-value-helper-text">Monthly avgift value</FormHelperText>
            </FormControl>
            <Button onClick={setAvgiftValue} variant="contained" color="primary" size="large">
                Tell me!
            </Button>
        </Main>
    )
}