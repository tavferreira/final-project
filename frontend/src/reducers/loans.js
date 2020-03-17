import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loanValue: 0,
    minimumAmmortization: 0,
    ammortization: 0,
    slices: 1,
    years: 0,
    avgift: 0,
    loanSlices: []
}

export const loans = createSlice({
    name: "loans",
    initialState,
    reducers: {
        setSlices: (state, action) => {
            state.slices = action.payload

            for (let i = 0; i < state.slices; i++) {
                let temp = {}

                temp.id = i
                if (i !== state.slices - 1) {
                    temp.value = Math.round(state.loanValue / state.slices)
                    temp.ammortization = Math.round((state.minimumAmmortization / state.slices) / 12)
                }
                else if (i === state.slices - 1) {
                    temp.value = state.loanValue - (Math.round(state.loanValue / state.slices) * i)
                    temp.ammortization = Math.round(state.minimumAmmortization / 12) - (Math.round((state.minimumAmmortization / state.slices) / 12) * i)
                }
                temp.interest = 0.0169
                temp.fixed = 1
                temp.payments = []

                state.loanSlices.push(temp)
            }
        },
        calculatePayments: (state, action) => {
            const { id } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id) {
                    slice.payments = []

                    for (let i = 0; i < slice.fixed * 12; i++) {
                        let month = i + 1
                        let leftToPay = slice.value - (slice.ammortization * i)
                        let interest = Math.round(leftToPay * slice.interest / (slice.fixed * 12))
                        let temp = { slice: slice.id, month, leftToPay, interest, ammortization: slice.ammortization }

                        slice.payments.push(interest)
                    }
                }
            })
        },
        setSliceValue: (state, action) => {
            const { id, value } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id)
                    slice.value = value
            })
        },
        setSliceInterest: (state, action) => {
            const { id, interest } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id)
                    slice.interest = interest
            })
        },
        setSliceAmmortization: (state, action) => {
            const { id, ammortization } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id)
                    slice.ammortization = ammortization
            })
        },
        setSliceFixed: (state, action) => {
            const { id, fixed } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id)
                    slice.fixed = fixed
            })
        },
        setPayments: (state, action) => {
            state.loanSlices.map(loan => {

                for (let i = 0; i < loan.fixed * 12; i++) {
                    let month = i + 1
                    let leftToPay = loan.value - (loan.ammortization * i)
                    let interest = Math.round(leftToPay * loan.interest / (loan.fixed * 12))
                    let temp = { slice: loan.id, month, leftToPay, interest, ammortization: loan.ammortization }

                    state.payments.push(temp)
                }
            }
            )
        },
        setLoanValue: (state, action) => {
            state.loanValue = action.payload
            state.minimumAmmortization = state.loanValue * 0.02
        },
        setAvgift: (state, action) => {
            state.avgift = action.payload
        },
        reset: () => {
            return initialState
        }
    }
})