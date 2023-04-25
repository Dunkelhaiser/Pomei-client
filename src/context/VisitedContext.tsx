import { createContext, useMemo, useState } from "react";

interface VisitedContextInterface {
    visitedBefore: boolean | null;
    setVisited: () => void;
}

interface Props {
    children: React.ReactNode;
}

const iVisitedProviderState = {
    visitedBefore: null,
    setVisited: () => {},
};

export const VisitedContext = createContext<VisitedContextInterface>(iVisitedProviderState);

const VisitedContextProvider: React.FC<Props> = ({ children }) => {
    const [visitedBefore, setVisitedBefore] = useState<boolean | null>(Boolean(localStorage.getItem("visitedBefore")));

    const setVisited = () => {
        localStorage.setItem("visitedBefore", "true");
        setVisitedBefore(true);
    };

    const values = useMemo(
        () => ({
            visitedBefore,
            setVisited,
        }),
        [visitedBefore]
    );

    return <VisitedContext.Provider value={values}>{children}</VisitedContext.Provider>;
};

export default VisitedContextProvider;
