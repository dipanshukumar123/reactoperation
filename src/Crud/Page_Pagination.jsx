import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import'./Page.css'

const Page = ({showperpage,onpaginationchange,total}) => 
{
    const[countnumbers,setcountnumbers] = useState(Math.ceil(total / showperpage));
    const[counter,setcounter] = useState(1);
    
    console.log(countnumbers);
    useEffect(()=>{
       const value = showperpage * counter;
       onpaginationchange(value - showperpage , value)
    },[counter]);

    const onButtonClick=(type)=>{
       if(type==="prev")
       {
            if(counter===1)
            {
                setcounter(1);
            }else{
                setcounter(counter-1);
            }
       }else if(type==="next"){
           if(Math.ceil(total / showperpage) === counter)
           {
              setcounter(counter);
           }else{
            setcounter(counter+1);
           }
       }
    }

    return(
        <>
            <div className="Page_style">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={()=>onButtonClick("prev")}><span aria-hidden="true">&laquo;</span></a></li>
                    {
                        new Array(countnumbers).fill("").map((element,index)=>(
                            <li class="page-item"><a class="page-link" href="#">{index + 1}</a></li>
                        ))
                    }
                    <li class="page-item"><a class="page-link"  onClick={()=>onButtonClick("next")}><span aria-hidden="true">&raquo;</span></a></li>
                </ul>
            </nav>
                {/* <button className="Prev" onClick={()=>onButtonClick("prev")}>Previous</button>
                <button className="Next" onClick={()=>onButtonClick("next")}>Next</button> */}
            </div>
        </>
    )
}

export default Page;