import {createContext, useState, ReactNode} from 'react'

import challenges from '../../challenges.json';

type ChallengesProviderProps = {
    children: ReactNode;
}

type ChallengeProps = {
    type: 'body' | 'eye',
    description: string,
    amount: number;
}

type ChallengesContextData = {
    level: number,
    currentExprience: number, 
    challengesCompleted: number,
    experienceToNextLevel: number,
    activeChallenge: ChallengeProps,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children} : ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExprience, setCurrentExperience] = useState(30)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp(){
        setLevel(level + 1)
    }

    function startNewChallenge(){
        let randomIndex = Math.floor(Math.random() * challenges.length)

        const challenge = challenges[randomIndex]

        setActiveChallenge(challenge)
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;
         
        let totalExperience = currentExprience + amount;

        if(totalExperience >= experienceToNextLevel){
            totalExperience = totalExperience - experienceToNextLevel;
            levelUp()
        }

        setCurrentExperience(totalExperience)
        setChallengesCompleted(challengesCompleted + 1)
        setActiveChallenge(null)
    }

    return(
        <ChallengesContext.Provider value={{
            level, 
            currentExprience,
            experienceToNextLevel,
            challengesCompleted, 
            activeChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}