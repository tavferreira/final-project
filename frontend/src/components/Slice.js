import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loans } from '../reducers/loans'
import { Input, FormControl, FormHelperText, InputAdornment, TextField } from '@material-ui/core'
import Styled from 'styled-components/macro'

const SliceContainer = Styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 8px;
`

const Separator = Styled.span`
    margin-right: 8px;
`

export const Slice = ({ slice }) => {
    const [value, setValue] = useState(slice.value)
    const [interest, setInterest] = useState(slice.interest)
    const [ammortization, setAmmortization] = useState(slice.ammortization)
    const [fixed, setFixed] = useState(slice.fixed)

    const dispatch = useDispatch()

    const changeValue = (value) => {
        setValue(Number(value))
        dispatch(loans.actions.setSliceValue({ id: slice.id, value: Number(value) }))
        dispatch(loans.actions.calculatePayments({ id: slice.id }))
    }

    const changeInterest = (interest) => {
        setInterest(Number(interest))
        dispatch(loans.actions.setSliceInterest({ id: slice.id, interest: Number(interest) }))
        dispatch(loans.actions.calculatePayments({ id: slice.id }))
    }

    const changeAmmortization = (ammortization) => {
        setAmmortization(Number(ammortization))
        dispatch(loans.actions.setSliceAmmortization({ id: slice.id, ammortization: Number(ammortization) }))
        dispatch(loans.actions.calculatePayments({ id: slice.id }))
    }

    const changeFixed = (fixed) => {
        setFixed(Number(fixed))
        dispatch(loans.actions.setSliceFixed({ id: slice.id, fixed: Number(fixed) }))
        dispatch(loans.actions.calculatePayments({ id: slice.id }))
    }

    return (
        <div>
            <SliceContainer>
                <Separator>
                    <TextField
                        id="standard-helperText"
                        label={`Loan part ${slice.id + 1}`}
                        helperText="Value"
                        value={value}
                        onChange={e => changeValue(e.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kr</InputAdornment>,
                        }}
                        style={{ width: '12ch' }}
                    />
                </Separator>
                <Separator>
                    <FormControl>
                        <Input
                            value={interest}
                            onChange={e => changeInterest(e.target.value)}
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            style={{ width: '8ch' }}
                        />
                        <FormHelperText id="loan-slice-value-helper-text">Interest</FormHelperText>
                    </FormControl>
                </Separator>
                <Separator>
                    <FormControl>
                        <Input
                            value={ammortization}
                            onChange={e => changeAmmortization(e.target.value)}
                            endAdornment={<InputAdornment position="end">kr</InputAdornment>}
                            style={{ width: '16ch' }}
                        />
                        <FormHelperText id="loan-slice-value-helper-text">Monthly ammortization</FormHelperText>
                    </FormControl>
                </Separator>
                <FormControl>
                    <Input
                        value={fixed}
                        onChange={e => changeFixed(e.target.value)}
                        endAdornment={<InputAdornment position="end">months</InputAdornment>}
                        style={{ width: '10ch' }}
                    />
                    <FormHelperText id="loan-slice-value-helper-text">Binding period</FormHelperText>
                </FormControl>
            </SliceContainer>
        </div>
    )
}