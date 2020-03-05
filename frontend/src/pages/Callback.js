import React from 'react'
import { useCallback } from "../hooks/useCallback"

export const Callback = () => {
    const { loading, error, data } = useCallback(window.location)
    const message = new URLSearchParams(window.location.search).get("message")
    console.log(data)
    return (
        <div>
            CALLBACK
            {message}
        </div>
    )
}