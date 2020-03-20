import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loans } from '../reducers/loans'
import { Button, FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core'
import Styled from 'styled-components/macro'

const Main = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
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
            <p>In how many parts do you want to split your loan into?</p>
            <FormControl>
                <Select
                    labelId="bank-native-select-label"
                    id="bank-native-select"
                    value={slice}
                    onChange={event => setSlices(Number(event.target.value))}
                    autoWidth
                >
                    <MenuItem value="">
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
            <Button variant="contained" color="primary" size="large" onClick={setSliceValue}>
                Next
            </Button>
        </Main>
    )
}