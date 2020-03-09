import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loans } from '../reducers/loans'
import { Link } from 'react-router-dom'
import { Ammortization } from '../components/Ammortization'

export const Main = () => {
    const dispatch = useDispatch()
    const [loanValue, setLoanValue] = useState(0)
    const [slice, setSlices] = useState(1)

    const setLoan = (event) => {
        event.preventDefault()

        dispatch(loans.actions.setLoanValue(loanValue))
        dispatch(loans.actions.setSlices(slice))
    }

    return (
        <div>
            <form onSubmit={setLoan}>
                <div>
                    <label>
                        Value
                        <input type='text' value={loanValue} onChange={event => setLoanValue(event.target.value)} />
                    </label>
                    <Link to='/connect'>
                        Connect your bank
                    </Link>
                </div>
                <label>
                    <select value={slice} onChange={event => setSlices(event.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </label>
                <button type="submit" onClick={setLoan}>
                    Set loan values
                </button>
            </form>
            <Ammortization />
        </div>
    )
}