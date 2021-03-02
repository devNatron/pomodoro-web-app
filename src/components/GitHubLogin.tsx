import styles from '../styles/components/GitHubLogin.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { useRouter } from 'next/router'

export function GitHubLogin(){
    const router = useRouter()
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`

    return(
        <div className={styles.gitHubLoginContainer}>
            <header className={styles.headerContainer}>
                <img src="icons/github.svg" alt="github logo"/>
                <p>Faça login com o Github para começar.</p>
            </header>
            <div className={styles.inputContainer}>
                <input type="text" name="" id=""/>
                <a href={url}>
                    <FontAwesomeIcon icon={faChevronRight} size="2x" className={styles.loginIcon}></FontAwesomeIcon>
                </a>
            </div>
        </div>
    )
}