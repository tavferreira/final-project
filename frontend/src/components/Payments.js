import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loans } from '../reducers/loans'
import { PaymentSlice } from '../components/PaymentSlice'
import { Button, ButtonGroup } from '@material-ui/core'
import Styled from 'styled-components/macro'

const Main = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
`

const Paper = Styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);

    @media (min-width: 768px) {
        width: 60vw;
        height: ${props => props.slices >= 4 ? '100vh' : props.slices >= 2 ? '90vh' : '75vh'};
    }
`

const Header = Styled.h2`
    font-weight: 500;
    border-bottom: 2px solid black;
`

const Container = Styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
`

const Separator = Styled.span`
    margin: 16px 0px;
`
const Subtotals = Styled.p`
    margin: 6px 0px;
    font-size: 14px;
    font-weight: 300;
`

const Total = Styled.p`
    margin: 0px 0px 16px 0px;
    font-size: 16px;
    font-weight: 500;
`

const Value = Styled.span`
    font-weight: 300;
`

export const Payments = () => {
    const dispatch = useDispatch()
    const payments = useSelector(store => store.loans.monthlyPayments)
    const avgift = useSelector(store => store.loans.avgift)
    const [month, setMonth] = useState(0)

    const moveForward = () => {
        setMonth(month + 1)
    }

    const moveBackwards = () => {
        setMonth(month - 1)
    }

    const goBack = (event) => {
        event.preventDefault()

        dispatch(loans.actions.setStage('avgift'))
    }

    return (
        <Main>
            <Paper>
                <Container>
                    <Header>Payment for month {month + 1}</Header>
                    <PaymentSlice paymentIndex={month} />
                    <Separator>
                        <Subtotals>Sub-total: {payments[month]}</Subtotals>
                        {avgift > 0 && <Subtotals>Avgift: {avgift}</Subtotals>}
                    </Separator>
                    <Total>Total: <Value>{Number(payments[month]) + Number(avgift)}</Value></Total>
                </Container>
                <Separator>
                    <ButtonGroup>
                        {month > 0 && <Button variant="contained" color="primary" size="large" onClick={moveBackwards}>
                            Previous month
                </Button>}
                        {month < payments.length - 1 && <Button variant="contained" color="primary" size="large" onClick={moveForward}>
                            Next month
                </Button>}
                    </ButtonGroup>
                </Separator>
                <Button variant="contained" color="secondary" size="large" onClick={goBack}>
                    Back
                </Button>
            </Paper>
        </Main >
    )
}