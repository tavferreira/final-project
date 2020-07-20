import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loans as reducer } from '../reducers/loans'
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
        width: 50vw;
        height: 50vh;
    }
`

const Header = Styled.h2`
    font-weight: 400;
`

const Container = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

const Separator = Styled.span`
    margin: 16px 0px;
`

export const Loans = ({ data }) => {
    const dispatch = useDispatch()

    const hasLoans = () =>
        data &&
        data.response &&
        data.response.loanData &&
        data.response.loanData.loans

    if (!hasLoans()) {
        return (
            <Main>
                <Paper>
                    <Header>Oh no! This is embarassing... <span role="img" aria-label="Error">😓</span></Header>
                    <Container>
                        <Separator>Let's start over?</Separator>
                        <Button variant="contained" color="secondary" size="large" href='/'>
                            Yes, take me back!
                        </Button>
                    </Container>
                </Paper>
            </Main>
        )
    }

    const {
        response: {
            loanData: { loans }
        }
    } = data

    const normalizeInterest = (interest) => {
        while (interest < 1) {
            interest = interest * 10
        }
        return interest
    }

    const normalizeValue = (nextDayOfTermsChange, monthlyAmortization, balance) => {
        if (nextDayOfTermsChange !== null) {
            if (balance < 0)
                balance *= -1

            if (monthlyAmortization !== null)
                balance = balance - (monthlyAmortization * Math.floor((nextDayOfTermsChange / 1000 - Date.now() / 1000) / 60 / 60 / 24 / 30))
        } else {
            if (balance < 0)
                balance *= -1
        }

        return balance
    }

    let totalLoan = 0
    let loanSlices = []

    loans.filter(loan => loan.type === "MORTGAGE").map((loan, index) => {
        let temp = {}

        temp.id = index
        temp.value = loan.balance !== null ? normalizeValue(loan.nextDayOfTermsChange, loan.monthlyAmortization, loan.balance) : 0
        temp.interest = loan.interest !== null ? normalizeInterest(loan.interest) : 0
        temp.fixed = loan.numMonthsBound !== null ? loan.numMonthsBound : 12

        loanSlices.push(temp)

        return 1
    })

    loanSlices.map(slice => {
        totalLoan += slice.value

        return 1
    })

    const confirmData = () => {
        dispatch(reducer.actions.reset())
        dispatch(reducer.actions.setLoanValue(totalLoan))
        dispatch(reducer.actions.setNumSlices(loanSlices.length))
        dispatch(reducer.actions.setLoanSlices(loanSlices))
    }

    return (
        <Main>
            <Paper>
                <Header>We've got this information from the bank:</Header>
                <p>Loan total: {totalLoan}</p>
                {loanSlices.length > 1 ? <p>Loan divided in: {loanSlices.length}</p> : <p>Loan not splitted</p>}

                {loanSlices.map(loan => (
                    <div key={loan.id}>
                        <p>Interest: {loan.interest}</p>
                        <p>Balance: {loan.value}</p>
                        <p>Fixed period: {loan.fixed}</p>
                    </div>
                ))}
                <Separator>Do you want to proceed with this information?</Separator>
                <ButtonGroup>
                    <Button variant="contained" color="secondary" size="large" href='/'>
                        No
                    </Button>
                    <Link to='/'>
                        <Button variant="contained" color="primary" size="large" onClick={confirmData}>
                            Yes
                        </Button>
                    </Link>
                </ButtonGroup>
            </Paper>
        </Main>
    )
}