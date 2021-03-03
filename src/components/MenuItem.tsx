import { useRouter } from "next/router"

type MenuItemProps = {
    label: string,
    url: string,
    clickFunc?: () => void
}

export function MenuItem({label, url, clickFunc}: MenuItemProps){
    const router = useRouter()
    
    function handleClick(e){
        e.preventDefault();

        if(clickFunc){
            clickFunc(url)
        }
        else{
            router.push(url)
        }
    }

    return(
        <li>
            <a onClick={handleClick}>{label}</a>
        </li>
    )
}