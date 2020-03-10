import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loans } from '../reducers/loans'

export const Payments = () => {
    const payments = useSelector(store => store.loans.payments)
    const dispatch = useDispatch()
    const [avgift, setAvgift] = useState(0)

    const submitAvgift = (event) => {
        event.preventDefault()

        dispatch(loans.actions.setAvgift(avgift))
    }

    return (
        <div>
            Payments
            <form onSubmit={submitAvgift}>
                <label>
                    Avgift
                        <input type='text' value={avgift} onChange={event => setAvgift(event.target.value)} />
                </label>
            </form>
            {payments.map(payment => {
                return (
                    <p>Payment {payment.slice} {payment.month} {payment.leftToPay} {Math.round(payment.interest)} {Math.round(payment.interest) + payment.ammortization}</p>
                )
            })}
        </div>
    )
}