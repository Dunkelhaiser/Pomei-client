import { useState, useCallback } from "react";

const useToggle = (initialState = false): [boolean, (newState?: boolean) => void] => {
    const [state, setState] = useState(initialState);

    const toggle = useCallback((newState?: boolean) => {
        setState((prev) => (newState !== undefined ? newState : !prev));
    }, []);

    return [state, toggle];
};

export default useToggle;
