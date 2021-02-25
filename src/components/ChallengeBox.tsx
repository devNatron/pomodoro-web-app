import { useContext } from 'react';
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const {resetCountDown} = useContext(CountDownContext)

    function handleChallengeSucceeded(){
        completeChallenge()
        resetCountDown()
    }

    function handleChallengeFailed(){
        resetChallenge()
        resetCountDown()
    }

    return(
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" 
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}>
                            Falhei
                        </button>
                        <button type="button" 
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSucceeded}>
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <p>Finalize um ciclo para receber desafios !</p>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Complete-os e ganhe experiência e avance de level.
                    </p>
                </div>
            )}
        </div>
    );
}