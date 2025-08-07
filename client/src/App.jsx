import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Contact from './Contact.jsx';
import AddBtn from './AddBtn.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "http://localhost:2000";

  const [contacts, setcontacts] = useState([])
  const [ShowModel, setShowModel] = useState(false)
  const [Opacity, setOpacity] = useState(false)
  const [reload, setReload] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const api = await axios.get(`${url}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(api.data.contact);
      setcontacts(api.data.contact);
    };
    fetchData();
  }, [reload]);

  const handelModel = () => {
    setShowModel(!ShowModel)
    setOpacity(!Opacity)
  }

  return (
    <>
      <ToastContainer />
      <AddBtn
        handelModel={handelModel}
        ShowModel={ShowModel}
        url={url}
        reload={reload}
        setReload={setReload}
        contacts={contacts}
        setId={setId}
        id={id}
      />
      <Contact
        handelModel={handelModel}
        contacts={contacts}
        Opacity={Opacity}
        url={url}
        reload={reload}
        setReload={setReload}
        setId={setId} />

    </>
  )
}

export default App
