import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loans } from '../reducers/loans'
import { Slice } from '../components/Slice'
import { Button, ButtonGroup } from '@material-ui/core'
import Styled from 'styled-components/macro'

const Main = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
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
            {loanValue > 0 && <p>Your minimum monthly ammortization is {minimumAmmortization / 12} kr</p>}
            {loanSlices.map(slice => (
                <Slice slice={slice} key={slice.id} />
            ))}
            <ButtonGroup>
                <Button variant="contained" color="primary" size="large" onClick={goBack}>
                    Go back
                </Button>
                <Button variant="contained" color="primary" size="large" onClick={setAmmortization}>
                    Next
                </Button>
            </ButtonGroup>
        </Main>
    )
}