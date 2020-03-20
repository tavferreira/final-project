import React from 'react'
import { useSelector } from 'react-redux'
import Styled from 'styled-components/macro'

const Container = Styled.div`
    display: flex;
    flex-direction: column;
`

export const PaymentSlice = ({ paymentIndex }) => {
    const loanSlices = useSelector(store => store.loans.loanSlices)

    return (
        <Container>
            {loanSlices.map((slice, index) => (
                <div key={`payment${paymentIndex}slice${index}`}>
                    <h3>Loan part {index + 1}</h3>
                    <p>Ammortization: {slice.ammortization}</p>
                    <p>Interest: {slice.payments[paymentIndex]}</p>
                </div>
            ))}
        </Container>
    )
}