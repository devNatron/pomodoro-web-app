import {createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { UserProps } from '../pages';
import { LevelUpModal } from '../components/LevelUpModal';

type ChallengesProviderProps = {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number
}

type ChallengeProps = {
    type: 'body' | 'eye',
    description: string,
    amount: number;
}

type ChallengesContextData = {
    level: number,
    currentExperience: number, 
    challengesCompleted: number,
    experienceToNextLevel: number,
    activeChallenge: ChallengeProps,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevalUpModal: () => void,
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...user} : ChallengesProviderProps){
    const [level, setLevel] = useState(user.level || 1);
    const [currentExperience, setCurrentExperience] = useState(user.currentExperience || 0)
    const [challengesCompleted, setChallengesCompleted] = useState(user.challengesCompleted || 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1)
        setLevelUpModalOpen(true)
    }

    function closeLevalUpModal(){
        setLevelUpModalOpen(false)
    }

    function startNewChallenge(){
        let randomIndex = Math.floor(Math.random() * challenges.length)

        const challenge = challenges[randomIndex]

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `Desafio valendo ${challenge.amount}xp!`
            })
        }

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
         
        let totalExperience = currentExperience + amount;

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
            currentExperience,
            experienceToNextLevel,
            challengesCompleted, 
            activeChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevalUpModal,
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}