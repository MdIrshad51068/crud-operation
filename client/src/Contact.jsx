import React from 'react';
import axios from 'axios';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = ({ contacts ,Opacity,url,reload,setReload,setId,handelModel}) => {

  const blur=Opacity?"0.2":"1"

  const deleteContact= async(id)=>{
    const api = await axios.delete(`${url}/${id}`,{
      headers: {
        "Content-Type": "application/json"
      }
    });

    toast.success('Deleted', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });

    setReload(!reload)
  }

  return (
    <>
      <div className="container " style={{ width: '700px' , opacity:`${blur}` }}>
        {contacts.map((data) => <div key={data._id} className='bg-black p-3 my-3 ' style={{ borderRadius: '10px', border: '2px solid yellow ', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>

          <div>
            <h1 >{data.name}</h1>
            <h2><span className="material-symbols-outlined">
              mail
            </span>{" "}{data.gmail}</h2>
            <h3>{data.phone}</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className='btn btn-primary' onClick={()=>{setId(data._id); handelModel();}}>Edit</button>
            <button className='btn btn-danger' onClick={()=>deleteContact(data._id)}>Delete</button>
          </div>

        </div>)}
      </div>
    </>
  )
}

export default Contact
