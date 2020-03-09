import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loanValue: 0,
    minimumAmmortization: 0,
    ammortization: 0,
    slices: 1,
    years: 0,
    loanSlices: [],
    payments: []
}

export const loans = createSlice({
    name: "loans",
    initialState,
    reducers: {
        setSlices: (state, action) => {
            state.slices = action.payload

            for (let i = 0; i < state.slices; i++) {
                let temp = {}

                temp.id = i + 1
                if (i !== state.slices - 1) {
                    temp.value = Math.round(state.loanValue / state.slices)
                    temp.ammortization = Math.round((state.minimumAmmortization / state.slices) / 12)
                }
                else if (i === state.slices - 1) {
                    temp.value = state.loanValue - (Math.round(state.loanValue / state.slices) * i)
                    temp.ammortization = Math.round(state.minimumAmmortization / 12) - (Math.round((state.minimumAmmortization / state.slices) / 12) * i)
                }
                temp.interest = 0.19
                temp.fixed = 1

                state.loanSlices.push(temp)
            }
        },
        setLoanValue: (state, action) => {
            state.loanValue = action.payload
            state.minimumAmmortization = state.loanValue * 0.02
        }
    }
})