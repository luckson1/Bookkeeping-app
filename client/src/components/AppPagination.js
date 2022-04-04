import React from 'react';
export const AppPagination = ({pageNumber, setPage}) => {
    console.log(pageNumber)
    const array=Array.from(Array(pageNumber).keys());
    
    return (<nav aria-label="Page navigation example">
        <ul className="pagination">
         {array?.map(pg => {
              return <li key={pg} className="page-item"><button className="page-link" onClick={(e) => setPage(e.target.textContent)}>{++pg}</button></li>
         })}
        </ul>
    </nav>);
};
