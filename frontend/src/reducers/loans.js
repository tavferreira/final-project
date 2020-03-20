import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    quizStage: 'loanValue',
    loanValue: 0,
    minimumAmmortization: 0,
    ammortization: 0,
    slices: 1,
    years: 0,
    avgift: 0,
    loanSlices: [],
    monthlyPayments: []
}

const setPayments = (slice) => {
    slice.payments = []

    for (let i = 0; i < slice.fixed; i++) {
        let leftToPay = slice.value - (slice.ammortization * i)
        let interest = Math.round(((leftToPay * (slice.interest / 100)) / 360) * 30)

        slice.payments.push(interest)
    }
}

const calculateMonthlyValue = (state) => {
    state.monthlyPayments = []
    let minLength = 12
    state.loanSlices.forEach(slice => {
        if (slice.payments.length < minLength)
            minLength = slice.payments.length
    })

    for (let i = 0; i < minLength; i++) {
        let monthlyValue = 0
        state.loanSlices.map(slice => (
            monthlyValue += slice.payments[i] + slice.ammortization
        ))
        state.monthlyPayments.push(monthlyValue)
    }
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
                temp.interest = 1.69
                temp.fixed = 12
                temp.payments = []
                setPayments(temp)
                state.loanSlices.push(temp)
            }
        },
        calculatePayments: (state, action) => {
            const { id } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id)
                    setPayments(slice)

                return 0
            })
            calculateMonthlyValue(state)
        },
        calculateMonthly: (state, action) => {
            calculateMonthlyValue(state)
        },
        setSliceValue: (state, action) => {
            const { id, value } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id)
                    slice.value = value

                return 0
            })
        },
        resetSlices: (state, action) => {
            state.loanSlices = []
        },
        setSliceInterest: (state, action) => {
            const { id, interest } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id)
                    slice.interest = interest

                return 0
            })
        },
        setSliceAmmortization: (state, action) => {
            const { id, ammortization } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id)
                    slice.ammortization = ammortization

                return 0
            })
        },
        setSliceFixed: (state, action) => {
            const { id, fixed } = action.payload

            state.loanSlices.map(slice => {
                if (slice.id === id)
                    slice.fixed = fixed

                return 0
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

                return 0
            }
            )
        },
        setLoanValue: (state, action) => {
            state.loanValue = action.payload
            state.minimumAmmortization = state.loanValue * 0.02
        },
        setLoanSlices: (state, action) => {
            state.loanSlices = action.payload
        },
        setAvgift: (state, action) => {
            state.avgift = action.payload
        },
        setNumSlices: (state, action) => {
            state.slices = action.payload
        },
        setStage: (state, action) => {
            state.quizStage = action.payload
        },
        reset: () => {
            return initialState
        }
    }
})