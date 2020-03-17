import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loans } from '../reducers/loans'
import { Slice } from '../components/Slice'

export const AmmortizationSlices = () => {
    const minimumAmmortization = useSelector(store => store.loans.minimumAmmortization)
    const loanSlices = useSelector(store => store.loans.loanSlices)
    const loanValue = useSelector(store => store.loans.loanValue)
    const dispatch = useDispatch()

    return (
        <div>
            Ammortization Slices
            {loanValue > 0 && <p>Your minimum monthly ammortization is {minimumAmmortization / 12} SEK</p>}
            {loanSlices.map(slice => (
                <Slice slice={slice} key={slice.id} />
            ))}
        </div>
    )
}