import { CompletedChallenges } from '../components/CompletedChallenges'
import { CountDown } from '../components/CountDown'
import {ExperienceBar} from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/ChallengeBox'
import { Menu } from '../components/Menu'

import { CountDownProvider } from '../contexts/CountDownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

import styles from '../styles/pages/Home.module.css'

import Head from 'next/head'
import {GetServerSideProps} from 'next'
import {useSession, signIn, } from 'next-auth/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export type UserProps = {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  githubLogin: string,
  githubAvatar: string,
}

export default function Home(props: UserProps) {
  const [session, loading] = useSession()
  const router = useRouter()
  
  if(loading) return null

  useEffect(() => {
    if(!session){
      router.push('/login')
    }
  }, [session, loading])

  return (<>
    {session &&  
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar/>
        <CountDownProvider>
          <section>
            <div>
              <Profile
                name={session.user.name}
                avatarUrl={session.user.image}
              />
              <CompletedChallenges/>
              <CountDown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  }
  </>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}