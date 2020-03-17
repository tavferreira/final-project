import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loans } from '../reducers/loans'
import { Link } from 'react-router-dom'
import { AmmortizationSlices } from '../components/AmmortizationSlices'
import { Payments } from '../components/Payments'

export const Main = () => {
    const dispatch = useDispatch()
    const [loanValue, setLoanValue] = useState(0)
    const [slice, setSlices] = useState(1)

    const setLoan = (event) => {
        event.preventDefault()

        dispatch(loans.actions.reset())
        dispatch(loans.actions.setLoanValue(loanValue))
        dispatch(loans.actions.setSlices(slice))
    }

    return (
        <div>
            <form onSubmit={setLoan}>
                <div>
                    <label>
                        Value (SEK)
                        <input type='text' value={loanValue} onChange={event => setLoanValue(event.target.value)} />
                    </label>
                    <Link to='/connect'>
                        Connect your bank
                    </Link>
                </div>
                <label>
                    How parts do you want to split the loan in?
                    <select value={slice} onChange={event => setSlices(event.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </label>
                <button type="submit" onClick={setLoan}>
                    Start calculating
                </button>
            </form>
            <AmmortizationSlices />
        </div>
    )
}