import React from 'react'

export default function Pagination({logsPerPage, totalLogs, paginate}){
 
    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(totalLogs/logsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className="paginate">
                {pageNumbers.map((num) =>(
                    <li key={num}>
                        <a oncClick={() => paginate(num)} href='!#'>
                            {num}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}