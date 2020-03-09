import React, { useState } from 'react'

export const Loans = ({ data }) => {
    const [totalIncome, setTotalIncome] = useState(0)
    const [balance, setBalance] = useState(0)

    const hasLoans = () =>
        data &&
        data.response &&
        data.response.loanData &&
        data.response.loanData.loans

    console.log("HASLOANS: " + hasLoans())
    if (!hasLoans()) {
        return <noscript />;
    }

    const {
        response: {
            loanData: { loans }
        }
    } = data

    return (
        <div>
            <div>
                {loans.filter(loan => loan.type === "MORTGAGE").map(loan => {
                    return (
                        <p key={loan.name}>Name: {loan.name} Interest: {loan.interest} Balance: {loan.balance}</p>
                    )
                })}
            </div>
            <label>
                Monthly Income
                <input type='text' name="totalIncome" value={totalIncome} onChange={e => setTotalIncome(e.target.value)} />
            </label>
            {/* <p>{Math.round(((totalIncome * 12) / balance)) * 100}</p> */}
        </div>
    )
}