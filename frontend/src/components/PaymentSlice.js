import React from 'react'
import { useSelector } from 'react-redux'
import Styled from 'styled-components/macro'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
`
const Subheader = Styled.h4`
    font-weight: 500;
    font-size: 14px;
    border-bottom: 2px solid black;
    margin: 10px 0px;
`

const Totals = Styled.p`
    margin: 6px 0px;
    font-weight: 300;
`

export const PaymentSlice = ({ paymentIndex }) => {
    const loanSlices = useSelector(store => store.loans.loanSlices)

    return (
        <Container>
            {loanSlices.map((slice, index) => (
                <div key={`payment${paymentIndex}slice${index}`}>
                    <Subheader>Loan part {index + 1}</Subheader>
                    <Totals>Ammortization: {slice.ammortization}</Totals>
                    <Totals>Interest: {slice.payments[paymentIndex]}</Totals>
                </div>
            ))}
        </Container>
    )
}