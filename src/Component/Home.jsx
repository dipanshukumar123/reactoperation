import React, {useReducer} from "react";
import {type} from "@testing-library/user-event/dist/type";

const Home = (props) => {
    const intial = 0;
    const reducer = (state,action) =>{
        if (action.type === "inc")
        {
            return state + 1;
        }else if (action.type === "des"){
            if(state == 0)
            {
                return alert('no count');
            }
            return state - 1;
        }else {
            return state;
        }
    }

    const [state,dispatch] = useReducer(reducer,intial);
    
    const text={
        textTransform:"uppercase",textDecoration:"underline",color:"pink",name:"Welcome,to the"
    }
  return(<>
      
      <h1 style={text}>{text.name} {props.name} Page</h1>
      <button onClick={()=>dispatch({type:"inc"})} style={{marginLeft:650}} type="button" className="btn btn-success" >Incre..</button>
      <h2 style={{textAlign:"center",marginTop:5,marginButtom:5}}>{state}</h2>
      <button onClick={()=>dispatch({type:"des"})} style={{marginLeft:650}} type="button" className="btn btn-warning">Decre..</button>
  </>)
}
export default Home;