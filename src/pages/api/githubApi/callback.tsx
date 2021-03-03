import { NextApiRequest, NextApiResponse } from "next";
import {serialize} from 'cookie';

type CookieProps = {
    token: string,
    value: string,
    option?: {
        path: string,
    }
}

export default async function Callback(req: NextApiRequest, res: NextApiResponse){
    const { query } = req
    const { code } = query

    if(!code){
        res.send({
            success: false,
            message: 'Error: no code'
        })
    }

    const userData = await getAccessToken(code)
    .then(async (data) =>{
        if (data.error || !data.access_token){
            res.send({
                success: false,
                message: data.error
            })
        }

        return await getUserData(data.access_token)
    })

    if(userData){
        const githubLogin: CookieProps = {token: 'githubLogin', value: userData.login}
        /* const githubId: CookieProps = {token: 'githubId', value: userData.id} */
        const githubAvatar: CookieProps = {token: 'githubAvatar', value: userData.avatar_url}
        
        res.setHeader('Set-Cookie', toCookie([
            githubLogin,
            githubAvatar,
        ]));
        
        res.redirect('/home')
    }
}

function toCookie(cookies: CookieProps[]){
    return cookies.map(({token, value, option={path:'/'}})=>{
        return serialize(token, value, option)
    })
}

async function getAccessToken(code: string | string[]){
    return await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        })
    })
    .then((res)=>{
        return res.json()
    })
}

async function getUserData(accessToken){
    return await fetch('https://api.github.com/user', {
        headers:{
            'Authorization': `token ${accessToken}`
        }
    })
    .then((res)=>{
        return res.json()
    })
}