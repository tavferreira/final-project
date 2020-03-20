import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PaymentSlice } from '../components/PaymentSlice'
import { Button, ButtonGroup } from '@material-ui/core'
import Styled from 'styled-components/macro'

const Main = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const Container = Styled.div`
    margin-bottom: 16px;
`

export const Payments = () => {
    const payments = useSelector(store => store.loans.monthlyPayments)
    const avgift = useSelector(store => store.loans.avgift)
    const [month, setMonth] = useState(0)

    const moveForward = () => {
        setMonth(month + 1)
    }

    const moveBackwards = () => {
        setMonth(month - 1)
    }

    return (
        <Main>
            <Container>
                <h2>Payment for month {month + 1}</h2>
                <PaymentSlice paymentIndex={month} />
                <p>Sub-total: {payments[month]}</p>
                {avgift > 0 && <p>Avgift: {avgift}</p>}
                <p>Total: {Number(payments[month]) + Number(avgift)}</p>
            </Container>
            <ButtonGroup>
                {month > 0 && <Button variant="contained" color="primary" size="large" onClick={moveBackwards}>
                    Previous month
                </Button>}
                {month < payments.length - 1 && <Button variant="contained" color="primary" size="large" onClick={moveForward}>
                    Next month
                </Button>}
            </ButtonGroup>
        </Main >
    )
}