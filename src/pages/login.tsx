import { GitHubLogin } from '../components/GitHubLogin'
import styles from '../styles/pages/Login.module.css'
import {useSession} from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Login(){
    const [session, loading] = useSession()
    const router = useRouter()    

    useEffect(() => {
        if(!loading && session){
            router.push('/home')
        }
    }, [session, loading])
    
    return(
        <div className={styles.loginPageContainer}>
            <div className={styles.loginContainer}>
                <header>
                    <img src='/logo-full.svg'/>
                    <p>Bem-vindo</p>
                </header>
                <GitHubLogin/>
            </div>
        </div> 
    )
}