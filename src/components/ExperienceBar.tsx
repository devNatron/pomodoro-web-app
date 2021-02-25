import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){
    const {currentExprience, experienceToNextLevel} = useContext(ChallengesContext)
    let percentToNextLevel =  Math.round( (currentExprience / experienceToNextLevel) * 100)

    return(
        <header className={styles.experienceBar}>
            <span>0px</span>
            <div>
                <div style={{width: `${percentToNextLevel}%`}}></div>
                <span 
                    className={styles.currentExperience} 
                    style={{left: `${percentToNextLevel}%`}}
                >
                        {currentExprience}xp
                </span>
            </div>
            <span>{experienceToNextLevel}px</span>
        </header>
    );
}