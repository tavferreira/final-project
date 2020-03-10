import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loans } from '../reducers/loans'

export const Ammortization = () => {
    const minimumAmmortization = useSelector(store => store.loans.minimumAmmortization)
    const loanSlices = useSelector(store => store.loans.loanSlices)
    const dispatch = useDispatch()

    return (
        <div>
            Ammortization
            <p>{Math.round(minimumAmmortization / 12)}</p>
            {loanSlices.map(loan => {
                for (let i = 0; i < loan.fixed * 12; i++) {
                    let month = i + 1
                    let leftToPay = loan.value - (loan.ammortization * i)
                    let interest = (leftToPay * loan.interest) / (loan.fixed * 12)
                    let temp = { slice: loan.id, month, leftToPay, interest }

                    dispatch(loans.actions.setPayments(temp))
                }

                return (
                    <p>{loan.id} {loan.value} {loan.ammortization} {loan.interest}</p>
                )
            })}
        </div>
    )
}