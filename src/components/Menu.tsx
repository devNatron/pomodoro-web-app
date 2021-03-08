import styles from '../styles/components/Menu.module.css'
import { MenuItem } from './MenuItem'
import {signOut} from 'next-auth/client'

export function Menu(){
    return(
        <div className={styles.MenuContainer}>
            <ul className={styles.Menu}>
                <MenuItem 
                    label="Sair"
                    url="github"
                    clickFunc={signOut}
                />
            </ul>
        </div>
    )
}