import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loans } from '../reducers/loans'
import { Button, ButtonGroup, Input, FormControl, FormHelperText, InputAdornment } from '@material-ui/core'
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


export const Avgift = () => {
    const dispatch = useDispatch()
    const [avgift, setAvgift] = useState(0)

    const setAvgiftValue = (event) => {
        event.preventDefault()

        dispatch(loans.actions.setAvgift(avgift))
        dispatch(loans.actions.setStage('payments'))
    }

    const goBack = (event) => {
        event.preventDefault()

        dispatch(loans.actions.setStage('ammortization'))
    }

    return (
        <Main>
            <Paper>
                <Header>And finally, how much is the monthly avgift?</Header>
                <Container>
                    <Separator>
                        <FormControl>
                            <Input
                                value={avgift}
                                onChange={event => setAvgift(event.target.value)}
                                endAdornment={<InputAdornment position="end">kr</InputAdornment>}
                            />
                            <FormHelperText id="loan-value-helper-text">Monthly avgift value</FormHelperText>
                        </FormControl>
                    </Separator>
                    <ButtonGroup>
                        <Button variant="contained" color="secondary" size="large" onClick={goBack}>
                            Back
                        </Button>
                        <Button onClick={setAvgiftValue} variant="contained" color="primary" size="large">
                            Show me the money!
                        </Button>
                    </ButtonGroup>
                </Container>
            </Paper>
        </Main>
    )
}