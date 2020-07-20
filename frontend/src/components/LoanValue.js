import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loans } from '../reducers/loans'
import { Button, Input, FormControl, FormHelperText, InputAdornment } from '@material-ui/core'
import Styled from 'styled-components/macro'

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
`

export const LoanValue = () => {
    const dispatch = useDispatch()
    const totalLoan = useSelector(store => store.loans.loanValue)
    let loan = totalLoan === 0 ? '' : totalLoan
    const [loanValue, setLoanValue] = useState(loan)

    const setLoan = (event) => {
        event.preventDefault()

        dispatch(loans.actions.reset())
        dispatch(loans.actions.setLoanValue(loanValue))
        dispatch(loans.actions.setStage('slices'))
    }

    return (
        <Main>
            <Paper>
                <Header>What is the total debt value for your loan?</Header>
                <Container>
                    <FormControl>
                        <Input
                            value={loanValue}
                            onChange={event => setLoanValue(event.target.value)}
                            endAdornment={<InputAdornment position="end">kr</InputAdornment>}
                            placeholder="3120000"
                        />
                        <FormHelperText id="loan-value-helper-text">Total loan value</FormHelperText>
                    </FormControl>
                    <Separator>
                        <Button variant="outlined" color="secondary" href="/connect" disabled={loanValue !== '' ? true : false}>
                            Connect to your bank
                        </Button>
                    </Separator>
                    <Button onClick={setLoan} variant="contained" color="primary" size="large" disabled={loanValue === '' ? true : false}>
                        Next
                    </Button>
                </Container>
            </Paper>
        </Main>
    )
}