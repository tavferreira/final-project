import React from 'react'
import { useSelector } from 'react-redux'
import { LoanValue } from '../components/LoanValue'
import { Slices } from '../components/Slices'
import { AmmortizationSlices } from '../components/AmmortizationSlices'
import { Avgift } from '../components/Avgift'
import { Payments } from '../components/Payments'

export const Main = () => {
    const stage = useSelector(store => store.loans.quizStage)

    return (
        <div>
            {stage === 'loanValue' && <LoanValue />}
            {stage === 'slices' && <Slices />}
            {stage === 'ammortization' && <AmmortizationSlices />}
            {stage === 'avgift' && <Avgift />}
            {stage === 'payments' && <Payments />}
        </div>
    )
}