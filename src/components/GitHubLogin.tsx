import styles from '../styles/components/GitHubLogin.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import {useSession, signIn, } from 'next-auth/client'
import { useRouter } from 'next/router';

export function GitHubLogin(){
    const [session, loading] = useSession()
    const router = useRouter()

    
    async function handleClick(e){
        e.preventDefault();
        
        if(session){
            router.push('/home')
        }
        else{
            await signIn('github')
            router.push('/home')
        }
    }

    return(
        <div className={styles.gitHubLoginContainer}>
            <header className={styles.headerContainer}>
                <img src="icons/github.svg" alt="github logo"/>
                <p>Faça login com o Github para começar.</p>
            </header>
            <button 
                type="button" 
                onClick={handleClick}
                className={styles.loginButton}
            >
                entrar
                <FontAwesomeIcon icon={faChevronRight} size="2x" className={styles.loginIcon}></FontAwesomeIcon>
            </button>
        </div>
    )
}