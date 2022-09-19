import React, { useContext, useState } from "react";
import { Button } from "bootstrap-4-react/lib/components";
import { FaBackward } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../App";
import { toast } from "react-toastify";

const Add = () => {
  const cont = useContext(context);

  const [name, setname] = useState("");
  const [image, setimage] = useState("");
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");

  let navigate = useNavigate();

  const AddUser = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("product_name", name);
    formdata.append("product_title", title);
    formdata.append("product_desc", desc);
    formdata.append("product_image", image);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    if (name == "") {
      document.getElementById("error").innerHTML = "Name field required";
      document.getElementById("error").style.color = "red";
      document.getElementById("error").style.textTransform = "uppercase";
    } else if (image == "") {
      document.getElementById("error").innerHTML = "Image field required";
      document.getElementById("error").style.color = "red";
    } else if (title == "") {
      document.getElementById("error").innerHTML = "Title field required";
      document.getElementById("error").style.color = "red";
    } else if (desc == "") {
      document.getElementById("error").innerHTML = "Description field required";
      document.getElementById("error").style.color = "red";
    }

    fetch(
      "http://localhost/apitest/public/api/saveproduct",
      requestOptions
    ).then((response) => {
      response.json().then((result) => {
        if (result.status == "success") {
          toast(result.msg);
          navigate("/all");
          setname("");
          setimage("");
          settitle("");
          setdesc("");
        } else {
          const errors = result.error;
          console.log(Array.isArray(errors));
        }
      });
    });
    cont.GetPro();
  };

  return (
    <>
      <div id="error" style={{ marginLeft: 600 }}></div>
      <div className="table-container">
        <NavLink to="/all">
          <Button type="button" className="btn btn-primary btn-sm">
            <FaBackward size={20} />
          </Button>
        </NavLink>
        <form style={{ marginTop: 10 }} onSubmit={AddUser}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setname(e.target.value);
              }}
              name="product_name"
              value={name}
              placeholder="Enter Name"
              style={{ maxWidth: 500 }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
              name="product_image"
              style={{ maxWidth: 500 }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Title</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                settitle(e.target.value);
              }}
              name="product_title"
              value={title}
              placeholder="Title"
              style={{ maxWidth: 500 }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Description</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setdesc(e.target.value);
              }}
              name="product_desc"
              value={desc}
              placeholder="Description"
              style={{ maxWidth: 500 }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default Add;
