const Pagination = (props)=>{
    console.log(props);
    const {pageNumber , getCurrentPage , pageNumbers }= props;
    return(
        <ul className="pagination">
            {pageNumbers.map(page=>{
                 <li  onClick={()=>getCurrentPage(page)}>
                 <a href="#">{page}</a>
             </li>
            })}
        </ul>
    )
}

export default Pagination;