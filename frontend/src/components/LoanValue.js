import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loans } from '../reducers/loans'
import { Link } from 'react-router-dom'
import { Button, Input, FormControl, FormHelperText, InputAdornment } from '@material-ui/core'
import Styled from 'styled-components/macro'

const Main = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export const LoanValue = () => {
    const dispatch = useDispatch()
    const totalLoan = useSelector(store => store.loans.loanValue)
    const [loanValue, setLoanValue] = useState(totalLoan)

    const setLoan = (event) => {
        event.preventDefault()

        dispatch(loans.actions.reset())
        dispatch(loans.actions.setLoanValue(loanValue))
        dispatch(loans.actions.setStage('slices'))
    }

    return (
        <Main>
            <FormControl>
                <Input
                    value={loanValue}
                    onChange={event => setLoanValue(event.target.value)}
                    endAdornment={<InputAdornment position="end">kr</InputAdornment>}
                />
                <FormHelperText id="loan-value-helper-text">Total loan value</FormHelperText>
            </FormControl>
            <Link to='/connect'>
                <Button color="secondary">
                    Connect your bank
            </Button>
            </Link>
            <Button onClick={setLoan} variant="contained" color="primary" size="large">
                Next
            </Button>
        </Main>
    )
}