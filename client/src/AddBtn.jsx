import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddContact = ({ handelModel, ShowModel, url, reload, setReload, contacts, setId, id }) => {

  const [name, setName] = useState("")
  const [gmail, setGmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    if (id) {
      for (let i = 0; i < contacts.length; i++) {
        if (id === contacts[i]._id) {
          setName(contacts[i].name)
          setGmail(contacts[i].gmail)
          setPhone(contacts[i].phone)
          break
        }
      }
    }
  }, [id])


  const submitHandler = async (e) => {
    e.preventDefault();
    handelModel();

    if (id) {
      const api = await axios.put(`${url}/${id}`, { name, gmail, phone }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      toast.success('Data updated successfully', {
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
    } else {
      const api = await axios.post(`${url}/`, { name, gmail, phone }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      toast.success('Data saved successfully', {
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
    }

    setReload(!reload)
    setName("")
    setGmail("")
    setPhone("")
    setId("")
  }


  return (
    <>
      <div className="container text-center mt-5">
        <button className='btn btn-warning' onClick={handelModel}>Add Contact</button>
        {/* modal code */}

        {ShowModel && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content bg-dark" style={{ border: '2px solid yellow' }}>
                <div className="modal-header">
                  <h1 className="modal-title fs-5" >{id ? "Edit Contact" : "Add Contact"}</h1>
                </div>
                <div className="modal-body">

                  {/* form body */}
                  <form onSubmit={submitHandler}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Gmail</label>
                      <input type="email" className="form-control" id="exampleInputPassword1"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                        required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Phon</label>
                      <input type="text" className="form-control" id="exampleInputPassword1"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required />
                    </div>
                    {id ? (
                      <button type="submit" className="btn btn-primary mx-3">Edit Contact</button>
                    ) : (
                      <button type="submit" className="btn btn-primary mx-3">Add Contact</button>
                    )}
                    <button type="submit" className="btn btn-danger " onClick={handelModel}>Cancle</button>
                  </form>

                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default AddContact
