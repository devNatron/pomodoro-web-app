import { GitHubLogin } from '../components/GitHubLogin'
import styles from '../styles/pages/Login.module.css'

export default function Login(){
    return(
        <div className={styles.loginPageContainer}>
            <div className={styles.loginContainer}>
                <header>Moveit</header>
                <p>Bem-vindo</p>
                <GitHubLogin/>
            </div>
        </div> 
    )
}