import React from 'react'

export default function Logs({logs, isLoading}){

    if(!isLoading){
        return(<h2>Cargando....</h2>)
    }

    return (
        <ul className='log-list'>
            {logs.map(log => (
                <li key='test'>
                    {log.rutCliente}
                </li>
            ))}
        </ul>
    )
}