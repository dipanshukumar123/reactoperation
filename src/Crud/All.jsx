import React, {useContext, useEffect, useMemo, useState} from "react";
import 'bootstrap-4-react';
import 'react-bootstrap-icons';
// import  ./node_modules/sass-loader/dist/cjs.js;
import {FaRegPlusSquare, FaEdit, FaRegTrashAlt} from "react-icons/fa";
import {Button} from "bootstrap-4-react/lib/components";
import {NavLink, useParams} from "react-router-dom";
import {context} from "../App";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Page from "./Page_Pagination";
// import Pagination from "../pagination";
// import data from './data/mock-data.json';



const All = () => {
    const cont = useContext(context);

    const [query, setQuery] = useState("")


    // const paginate =  usePagination();

    useEffect(()=>{
        cont.GetPro();  
    },[])

    const token = localStorage.getItem('api_token');

    function Delete(id){
       var myHeaders = new Headers();
       myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };
        fetch(`http://localhost/apitest/public/api/deleteproduct/${id}`,requestOptions,{
            method:"DELETE",
        }).then((resp)=>{
            resp.json().then((result)=>{
                cont.GetPro();
                toast(result.msg);
            })
        })
    }
    function Edit(id){
        const arr = cont.ApiList.find((item)=>{
            return item.id === id
        })
        cont.seteditApiList(arr);
    }

    const Status = async(id)=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = "// {\r\n//     \"status\" : \"Active\"\r\n// }";

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        const fet =  await fetch(`http://localhost/apitest/public/api/statusproduct/${id}`, requestOptions)
        const response = await fet.json();
        const result = response;
        toast(result.msg);
    }

    const [showperpage,setshowperpage] = useState(3)
    const [PerPage,setperPage] = useState({
        start : 0,
        end : showperpage
    });

    const onpaginationchange = (start,end) => {
        setperPage({start:start,end:end})
        console.log(start,end);
    }

    // const [currentPage, setCurrentPage] = useState(1);
    // let PageSize = 3;
    // const ApiList = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return data.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);
    
  return(
      <>
          <div><ToastContainer /></div>
          <div className="table-container">
              <NavLink to="/add"><Button type="button" className="btn btn-primary btn-sm"><FaRegPlusSquare size={30}/></Button></NavLink>
              <div className="search-wrapper float-right">
                  <label htmlFor="search-form">
                      <input type="search" name="search-form" id="search-form" className="search-input" placeholder="Search for..."
                          value={query} onChange={(e)=>setQuery(e.target.value)}/>
                  </label>
              </div>
              <table className="table" style={{marginTop:10}}>
                  <thead className="thead-dark">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Desc</th>
                      <th scope="col">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    cont.ApiList.slice(PerPage.start,PerPage.end).filter(item => {
                        if (query === '') {
                          return item;
                        } else if (item.product_name.toLowerCase().includes(query.toLowerCase())) {
                          return item;
                        }
                      })
                        .map((item,index)=>{
                          return(
                              <>
                                  <tr key = {index}>
                                      <th scope="row">{item.id}</th>
                                      <td>{item.product_name}</td>
                                      <td><img src={item.product_image}  height={80} width={80}/></td>
                                      <td>{item.product_title}</td>
                                      <td>{item.product_desc}</td>
                                      <td>
                                        <div>
                                          <NavLink to={`/edit/${item.id}`} onClick={()=>Edit(item.id)} className="btn btn-primary mr-2"><FaEdit size={20}/></NavLink>
                                          <Button className="btn btn-danger" onClick={()=>Delete(item.id)}><FaRegTrashAlt size={20}/></Button>
                                        </div>
                                          <BootstrapSwitchButton checked={item.status == "Active" ? true : false} onlabel='Active' onstyle='success' offlabel='Inactive'
                                           offstyle='danger' style='w-50 mx-1'  onChange={() => {Status(item.id)}} />
                                      </td>
                                  </tr>
                              </>
                          )
                        })
                    }
                  </tbody>
              </table>
          </div>

          <Page showperpage={showperpage} onpaginationchange={onpaginationchange} total={cont.ApiList.length} />
          {/* <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)} */}
      {/* /> */}

      </>
  )
}
export default All;