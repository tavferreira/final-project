import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loans } from '../reducers/loans'
import { Slice } from '../components/Slice'
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
        width: ${props => props.slices >= 4 ? '80vw' : props.slices >= 2 ? '60vw' : '50vw'};
        height: ${props => props.slices >= 4 ? '80vh' : props.slices >= 2 ? '60vh' : '50vh'};
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

export const AmmortizationSlices = () => {
    const dispatch = useDispatch()

    const minimumAmmortization = useSelector(store => store.loans.minimumAmmortization)
    const loanSlices = useSelector(store => store.loans.loanSlices)
    const loanValue = useSelector(store => store.loans.loanValue)

    const setAmmortization = (event) => {
        event.preventDefault()

        dispatch(loans.actions.setStage('avgift'))
    }

    const goBack = (event) => {
        event.preventDefault()

        dispatch(loans.actions.resetSlices())
        dispatch(loans.actions.setStage('slices'))
    }

    return (
        <Main>
            <Paper slices={loanSlices.length}>
                <Header>Ammortization plan</Header>
                <Container>
                    {loanValue > 0 && <p>Your minimum monthly ammortization is {Math.round(minimumAmmortization / 12)} kr</p>}
                    <Separator>
                        {loanSlices.map(slice => (
                            <Slice slice={slice} key={slice.id} />
                        ))}
                    </Separator>
                    <ButtonGroup>
                        <Button variant="contained" color="secondary" size="large" onClick={goBack}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" size="large" onClick={setAmmortization}>
                            Next
                        </Button>
                    </ButtonGroup>
                </Container>
            </Paper>
        </Main>
    )
}