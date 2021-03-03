import { NextApiRequest, NextApiResponse } from "next";
const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`

export default async function github2(req: NextApiRequest,res: NextApiResponse){
    const authResponse = await fetch(url, {
        method: 'GET'
    })

    res.send(authResponse)
}