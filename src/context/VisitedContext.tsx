import { createContext, useMemo, useState } from "react";

interface VisitedContextInterface {
    visitedBefore: boolean | null;
    setVisited: () => void;
}

interface Props {
    children: React.ReactNode;
}

export const VisitedContext = createContext<VisitedContextInterface>({
    visitedBefore: null,
    setVisited: () => {},
});

export const VisitedProvider: React.FC<Props> = ({ children }) => {
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
