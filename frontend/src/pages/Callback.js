import React from 'react'
import { useCallback } from "../hooks/useCallback"
import { Loans } from '../components/Loans'

export const Callback = () => {
    const { data } = useCallback(window.location)

    return (
        <Loans data={data} />
    )
}