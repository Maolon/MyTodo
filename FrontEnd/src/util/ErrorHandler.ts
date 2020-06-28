import React, { useState, useEffect } from 'react';

export const UseErrorHandler = (initialState: string | null) => {
    const [error, setError] = useState(initialState);
    const showError = (errorMessage: string | null)=>{
        setError(errorMessage);
    };
    return { error, showError }
}