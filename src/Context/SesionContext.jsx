import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { app } from "../services/firebase/firebaseConfig";

export const SesionContext = createContext()

export const SesionProvider = ({children}) => { 
  
  const [logueado, setLogueado] = useState(false)
  const [registrado, setRegistrado] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const auth = getAuth(app);

  const autenticacion = async (e) => {
    e.preventDefault()
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if(usuarioFirebase) {
      setUsuario(usuarioFirebase)
    } else {
      setUsuario(null)
    }
  })

  return (
    <SesionContext.Provider value={{logueado, setLogueado, registrado, setRegistrado,usuario, setUsuario, autenticacion}}>
      {children}
    </SesionContext.Provider>
  )
}