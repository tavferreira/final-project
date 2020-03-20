import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loans } from '../reducers/loans'
import { Button, ButtonGroup, FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core'
import Styled from 'styled-components/macro'

const Main = Styled.div`
    display: flex;
    flex-direction: column;
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
    justify-content: flex-start;
`

export const Slices = () => {
    const dispatch = useDispatch()
    const numSlices = useSelector(store => store.loans.slices)
    const [slice, setSlices] = useState(numSlices)

    const setSliceValue = (event) => {
        event.preventDefault()

        dispatch(loans.actions.setSlices(slice))
        dispatch(loans.actions.calculateMonthly())
        dispatch(loans.actions.setStage('ammortization'))
    }

    return (
        <Main>
            <Paper>
                <Header>In how many parts do you want to split your loan in?</Header>
                <Container>
                    <Separator>
                        <FormControl>
                            <Select
                                labelId="bank-native-select-label"
                                id="bank-native-select"
                                value={slice}
                                onChange={event => setSlices(Number(event.target.value))}
                                autoWidth
                            >
                                <MenuItem value="None">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="1">One</MenuItem>
                                <MenuItem value="2">Two</MenuItem>
                                <MenuItem value="3">Three</MenuItem>
                                <MenuItem value="4">Four</MenuItem>
                                <MenuItem value="5">Five</MenuItem>
                            </Select>
                            <FormHelperText>Choose an option</FormHelperText>
                        </FormControl>
                    </Separator>
                    <ButtonGroup>
                        <Button variant="contained" color="secondary" size="large" href="/">
                            Back
                    </Button>
                        <Button variant="contained" color="primary" size="large" onClick={setSliceValue}>
                            Next
                    </Button>
                    </ButtonGroup>
                </Container>
            </Paper>
        </Main>
    )
}