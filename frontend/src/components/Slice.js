import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loans } from '../reducers/loans'

export const Slice = ({ slice }) => {
    const [value, setValue] = useState(slice.value)
    const [interest, setInterest] = useState(slice.interest)
    const [ammortization, setAmmortization] = useState(slice.ammortization)
    const [fixed, setFixed] = useState(slice.fixed)
    const dispatch = useDispatch()

    const changeValue = (value) => {
        setValue(value)
        dispatch(loans.actions.setSliceValue({ id: slice.id, value: value }))
        dispatch(loans.actions.calculatePayments({ id: slice.id }))
    }

    const changeInterest = (interest) => {
        setInterest(interest)
        dispatch(loans.actions.setSliceInterest({ id: slice.id, interest: interest }))
        dispatch(loans.actions.calculatePayments({ id: slice.id }))
    }

    const changeAmmortization = (ammortization) => {
        setAmmortization(ammortization)
        dispatch(loans.actions.setSliceAmmortization({ id: slice.id, ammortization: ammortization }))
        dispatch(loans.actions.calculatePayments({ id: slice.id }))
    }

    const changeFixed = (fixed) => {
        setFixed(fixed)
        dispatch(loans.actions.setSliceFixed({ id: slice.id, fixed: fixed }))
        dispatch(loans.actions.calculatePayments({ id: slice.id }))
    }

    return (
        <div>
            {slice.id}
            <input type="text" value={value} onChange={e => changeValue(e.target.value)}></input>
            <input type="text" value={interest * 100} onChange={e => changeInterest(e.target.value / 100)}></input>
            <input type="text" value={ammortization} onChange={e => changeAmmortization(e.target.value)}></input>
            <input type="text" value={fixed} onChange={e => changeFixed(e.target.value)}></input>
        </div>
    )
}