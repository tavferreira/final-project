import React from 'react'

export const Loans = ({ data }) => {
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
                        <p key={loan.name}>{loan.name} {loan.interest} {loan.balance}</p>
                    )
                })}
            </div>
        </div>
    )
}