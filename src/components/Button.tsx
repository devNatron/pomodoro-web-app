import {useState} from 'react'

type ButtonProps = {
    initialValue: number,
    color: string,
    children: string
}

export function Button(props: ButtonProps){
    const [counter, setCounter] = useState(props.initialValue)  
    
    function Contador(){
        setCounter(counter + 1)
    }
    
    return(
        <button
            type="button"
            style={{backgroundColor: props.color}}
            onClick={Contador}
        >
            {props.children}: 
            <strong>{counter}</strong>
        </button>
    );
}