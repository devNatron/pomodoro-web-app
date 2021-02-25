import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

let timeOutID: NodeJS.Timeout;

type CountDownContextData = {
    time: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountDown: () => void,
    resetCountDown: () => void,
}

type CountDownProviderProps = {
    children: ReactNode
}

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider({children}: CountDownProviderProps){
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setActive] = useState(false);
    const [hasFinished, setFinished] = useState(false)

    function startCountDown(){
        setActive(true)
    }

    function resetCountDown(){
        clearTimeout(timeOutID)
        setActive(false)
        setFinished(false)
        setTime(0.1 * 60)
    }

    useEffect(() => {
        if(isActive && time > 0){
            timeOutID = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        } else if(isActive){
            setActive(false);
            setFinished(true);
            startNewChallenge();
        }
    }, [isActive, time])

    return(
        <CountDownContext.Provider value={{
            time,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown,
        }}>
            {children}
        </CountDownContext.Provider>
    );
}