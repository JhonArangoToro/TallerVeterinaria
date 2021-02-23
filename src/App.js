import { isEmpty } from "lodash";
import { React,useState,useEffect } from "react"
import { getCollection } from "./actions";


function App() {


useEffect(() => {
  (async ()=> {
    const result = await getCollection("pets")
    setPets(result.data)
  })()
  
}, [])

const [pets, setPets] = useState([]) //array of pets



//Pet attributes
const [petName, setPetName] = useState("")
const [petType, setPetType] = useState("")
const [petBreed, setPetBreed] = useState("")
const [petBirthDate, setPetBirthDate] = useState("")
const [petOwner, setPetOwner] = useState("")
const [petOwnerPhone, setPetOwnerPhone] = useState("")
const [petOwnerAddress, setPetOwnerAddress] = useState("")
const [petOwnerEmail, setPetOwnerEmail] = useState("")


const [error, setError] = useState(null)


const validForm =() =>{
  let isValid = true
  setError(null)

  if(isEmpty(petName)){
    setError("Ingresa nombre de la mascota")
    isValid=false
  }

  if(isEmpty(petType)){
    setError("Ingrese el tipo de la mascota")
    isValid=false
  }

  if(isEmpty(petBreed)){
    setError("Ingrese la raza de la mascota")
    isValid=false
  }

  if(isEmpty(petBirthDate)){
    setError("Ingrese fecha de nacimiento de la de la mascota")
    isValid=false
  }

  if(isEmpty(petOwner)){
    setError("Ingrese dueño de la de la mascota")
    isValid=false
  }

  if(isEmpty(petOwnerPhone)){
    setError("Ingrese telefono del dueño")
    isValid=false
  }

  if(isEmpty(petOwnerAddress)){
    setError("Ingrese direccion del dueño")
    isValid=false
  }

  if(isEmpty(petOwnerEmail)){
    setError("Ingrese email del dueño")
    isValid=false
  }

  return  isValid

}

const addPet = (e)=>{
  e.preventDefault()

  if(!validForm()){
    return
  }

  // const newPet ={
  //   id: 1,
  //   petName: petName,
  //   petType: petType,
  //   petBreed: petBreed,
  //   petBirthDate : petBirthDate,
  //   petOwner: petOwner,
  //   petOwnerPhone : petOwnerPhone,
  //   petOwnerAddress :petOwnerAddress,
  //   petOwnerEmail : petOwnerEmail
  // }

  // setPets( [...pets, newPet])

  setPetAttributes()

}

const setPetAttributes = () =>{
  //Set state from pet attributes
  setPetName("")
  setPetType("")
  setPetBreed("")
  setPetBirthDate("")
  setPetOwner("")
  setPetOwnerPhone("")
  setPetOwnerAddress("")
  setPetOwnerEmail("")
}


  return (
     <div className="conten-wrapper text-center mt-4">
     
       <section className="content">
         <div className="container-fluid">
           <div className="row">
             <div className="col-12">
               <div className="card card-primary card-outline">
                 <div className="card-header">
                    <h5 className="card-title">Veterinaria / <strong style={{color:"blue"}}>Registro Mascotas</strong></h5>
                    <p className="card-text">Trabajo Practico</p>

                      <div className="col-md-12 ">
                        <div className="card-tools d-flex justify-content-between align-items-center">
                            Listado Mascotas Registradas
                            <button type="button" className="btn btn-success btn-sm">Agregar Mascota</button>
                        </div>
                      </div>
                  </div>
                  <div className="col-md-12">
                      <div className="card-body table-responsive">
                         <table className="table table-bordered table-hover">
                           <thead>
                             <tr>
                             <th scope="col">Nombre</th>
                             <th scope="col">Tipo</th>
                             <th scope="col">Raza</th>
                             <th scope="col">F.Nacimiento</th>
                             <th scope="col">Propietario</th>
                             <th scope="col">Telefono</th>
                             <th scope="col">Direccion</th>
                             <th scope="col">Email</th>
                             <th scope="col">Acciones</th>

                             </tr>
                             
                           </thead>
                           <tbody>
                             {
                               pets.map((pet) => (

                                <tr key={pet.id}>
                                  <td>{pet.name}</td>
                                  <td>{pet.type}</td>
                                  <td>{pet.breed}</td>
                                  <td>{pet.birth_date}</td>
                                  <td>{pet.owner_name}</td>
                                  <td>{pet.owner_phone}</td>
                                  <td>{pet.owner_address}</td>
                                  <td>{pet.owner_email}</td>
                                  <td>
                                    <button className="btn btn-warning btn-sm mx-2">Editar</button>
                                    <button className="btn btn-danger btn-sm">Eliminar</button>
                                  </td>

                                </tr>
                            
                              ))
                             }
                             {/* <tr>
                               
                               <td>Benedict</td>
                               <td>Perro</td>
                               <td>Buldog</td>
                               <td>2020-12-01</td>
                               <td>Zulu</td>
                               <td>123</td>
                               <td>Calle Esta</td>
                               <td>zulu@zulu.com</td>
                               <td>
                                 <button className="btn btn-warning btn-sm mx-2">Editar</button>
                                 <button className="btn btn-danger btn-sm">Eliminar</button>
                               </td>
                             </tr> */}
                           </tbody>

                         </table>
                      </div>

                  </div>
                </div>
              </div>
           </div>
         </div>
       </section>



     </div>

  );
}

export default App
