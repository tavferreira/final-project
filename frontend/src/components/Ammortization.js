import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Ammortization = () => {
    const minimumAmmortization = useSelector(store => store.loans.minimumAmmortization)
    const loanSlices = useSelector(store => store.loans.loanSlices)

    return (
        <div>
            Ammortization
            <p>{Math.round(minimumAmmortization / 12)}</p>
            {loanSlices.map(loan => {
                return (
                    <p>{loan.id} {loan.value} {loan.ammortization}</p>
                )
            })}
        </div>
    )
}