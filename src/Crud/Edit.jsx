import React, {useContext, useEffect, useState} from "react";
import {Button} from "bootstrap-4-react/lib/components";
import {FaBackward} from "react-icons/fa";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {context} from "../App";
import {toast} from "react-toastify";

const Edit = () => {
    const cont = useContext(context);
    const {id} = useParams();

    let navigate = useNavigate ();

    const UpdateUser = (e) =>{
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("product_name", cont.editApiList.product_name);
        formdata.append("product_title", cont.editApiList.product_title);
        formdata.append("product_desc", cont.editApiList.product_desc);
        formdata.append("product_image",cont.editApiList.product_image);

        var requestOptions = {
            method: 'POST',
            body: formdata,
        };

        fetch(`http://localhost/apitest/public/api/updateproduct/${id}`, requestOptions)
            .then((response)=>{
                response.json().then((result)=>{
                    toast(result.msg);
                })
            })
        navigate('/all')
        cont.GetPro();
    }
  return(
      <>
          <div className="table-container">
              <NavLink to="/all"><Button type="button" className="btn btn-primary btn-sm"><FaBackward size={20}/></Button></NavLink>
              <form style={{marginTop:10}} onSubmit={UpdateUser}>
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Name</label>
                      <input type="text" className="form-control" name="product_name" onChange={(e)=>cont.editApiList.product_name = e.target.value} defaultValue={cont.editApiList.product_name} placeholder="Enter Name" style={{maxWidth:500}}/>
                  </div>
                  <div className="form-group" style={{display:"flex"}}>
                      <div>
                          <label htmlFor="exampleInputPassword1">Image</label>
                          <input type="file" className="form-control" name="product_image" onChange={(e)=>cont.editApiList.product_image = e.target.files[0]} style={{maxWidth:500}}/>
                      </div>
                      <div>
                          <img src={cont.editApiList.product_image} height={100}/>
                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Title</label>
                      <input type="text" className="form-control" name="product_title" onChange={(e)=>cont.editApiList.product_title = e.target.value} defaultValue={cont.editApiList.product_title} placeholder="Title" style={{maxWidth:500}}/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Description</label>
                      <input type="text" className="form-control" name="product_desc" onChange={(e)=>cont.editApiList.product_desc = e.target.value} defaultValue={cont.editApiList.product_desc} placeholder="Description" style={{maxWidth:500}}/>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
              </form>
          </div>
      </>
  )
}
export default Edit;