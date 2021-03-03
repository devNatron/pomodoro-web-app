import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

import {useSession} from 'next-auth/client'

type ProfileProps = {
    name: string,
    avatarUrl: string,
}

export function Profile({name, avatarUrl}: ProfileProps){
    const {level} = useContext(ChallengesContext)

    return(
        <div className={styles.profileContainer}>
            <img src={avatarUrl} alt=""/>
            <div>
                <strong>{name}</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}