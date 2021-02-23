import { isEmpty } from "lodash";
import { React,useState,useEffect } from "react"
import { getCollection,deleteDocument } from "./actions";
import { Modal,ModalHeader,ModalBody,ModalFooter } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css'


function App() {


useEffect(() => {
  (async ()=> {
    const result = await getCollection("pets")
    setPets(result.data)
  })()
  
}, [])

const [modalState, setModalState] = useState(false)

const [modalStateDelete, setModalStateDelete] = useState(false)

const [pets, setPets] = useState([]) //array of pets



//Pet attributes
const [petId, setPetId] = useState("")
const [petName, setPetName] = useState("")
const [petType, setPetType] = useState("")
const [petBreed, setPetBreed] = useState("")
const [petBirthDate, setPetBirthDate] = useState("")
const [petOwner, setPetOwner] = useState("")
const [petOwnerPhone, setPetOwnerPhone] = useState("")
const [petOwnerAddress, setPetOwnerAddress] = useState("")
const [petOwnerEmail, setPetOwnerEmail] = useState("")


const [error, setError] = useState(null)

const [editMode, setEditMode] = useState(false)

const closeModal =() =>{
  setModalState(false)
}

const openModal = () =>{
  setModalState(true)
}

const closeModalDelete =() =>{
  setModalStateDelete(false)
}

const openModalDelete = () =>{
  setModalStateDelete(true)
}

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

const modalAddPet = ()=>{
  setPetAttributes("")
  setEditMode(false)
  openModal()
  
}


const modalEditPet =(petEdit) =>{
  setPetAttributes(petEdit)
  setEditMode(true)
  openModal(true)
}

const modalDeletePet =(pet) =>{
  setPetAttributes(pet)
  openModalDelete(true)

}

const addPet =(e) =>{
  // e.preventDefault()
}

const savePet =(e) =>{
  // e.preventDefault()
}

const deletePet = async(idPet) =>{

  // //  const result = await deleteDocument("pets",idPet)

  //  if(!result.statusResponse){
  //   setError(result.error)
  //   return
  // }

  // const filteredPets =  pets.filter(pet => pet.id !== idPet) //Todas menos la que el usuario elimino
    // setPets(filteredPets)
}




const setPetAttributes = (Attributes) =>{
  //Set state from pet attributes

  if(isEmpty(Attributes)){
    setPetId("")
    setPetName("")
    setPetType("")
    setPetBreed("")
    setPetBirthDate("")
    setPetOwner("")
    setPetOwnerPhone("")
    setPetOwnerAddress("")
    setPetOwnerEmail("")
  }else{
    setPetId(Attributes.id)
    setPetName(Attributes.name)
    setPetType(Attributes.type)
    setPetBreed(Attributes.breed)
    setPetBirthDate(Attributes.birth_date)
    setPetOwner(Attributes.owner_name)
    setPetOwnerPhone(Attributes.owner_phone)
    setPetOwnerAddress(Attributes.owner_address)
    setPetOwnerEmail(Attributes.owner_email)
  }

  
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
                            <button type="button" className="btn btn-success btn-sm" onClick={modalAddPet}>Agregar Mascota</button>
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
                                    <button 
                                      className="btn btn-warning btn-sm mx-2" 
                                     onClick={() => modalEditPet(pet)}>
                                      Editar
                                    </button>
                                    <button 
                                      className="btn btn-danger btn-sm"
                                      onClick={() => modalDeletePet(pet)}
                                    >
                                      Eliminar
                                    </button>
                                  </td>

                                </tr>
                            
                              ))
                             }
                             
                           </tbody>

                         </table>
                      </div>

                  </div>
                </div>
              </div>
           </div>
         </div>
       </section>

       <Modal isOpen={modalState}>
         <ModalHeader>
           {editMode ? "Modificar Mascota." : "Agregar Mascota." }
         </ModalHeader>
         <ModalBody>
           <form onSubmit={ editMode ? savePet() : addPet}>
             <div className="form-group">
                <div className="input-group mb3">
                     <div class="input-group-prepend">
                         <span class="input-group-text" id="basic-addon3">Nombre</span>
                     </div>
                     <input 
                       type="text" 
                       class="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Nombre de la mascota." 
                       value={petName}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div class="input-group-prepend">
                         <span class="input-group-text" id="basic-addon3">Tipo</span>
                     </div>
                     <input 
                       type="text" 
                       class="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Tipo de la mascota." 
                       value={petType}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div class="input-group-prepend">
                         <span class="input-group-text" id="basic-addon3">Raza</span>
                     </div>
                     <input 
                       type="text" 
                       class="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Raza de la mascota." 
                       value={petBreed}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div class="input-group-prepend">
                         <span class="input-group-text" id="basic-addon3">Fecha Nacimiento</span>
                     </div>
                     <input 
                       type="text" 
                       class="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Fecha de nacimiento de la mascota." 
                       value={petBirthDate}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div class="input-group-prepend">
                         <span class="input-group-text" id="basic-addon3">Propietario</span>
                     </div>
                     <input 
                       type="text" 
                       class="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Propietario de la mascota." 
                       value={petOwner}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div class="input-group-prepend">
                         <span class="input-group-text" id="basic-addon3">Telefono</span>
                     </div>
                     <input 
                       type="text" 
                       class="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Telefono del propietario." 
                       value={petOwnerPhone}>                  
                     </input>
                </div>
             </div>
             <div className="form-group">
                <div className="input-group mb3">
                     <div class="input-group-prepend">
                         <span class="input-group-text" id="basic-addon3">Direccion</span>
                     </div>
                     <input 
                       type="text" 
                       class="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Direccion del propietario." 
                       value={petOwnerAddress}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div class="input-group-prepend">
                         <span class="input-group-text" id="basic-addon3">Email</span>
                     </div>
                     <input 
                       type="text" 
                       class="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Email del propietario." 
                       value={petOwnerEmail}>                  
                     </input>
                </div>
             </div>             
           </form>
        

         </ModalBody>
         <ModalFooter>
           <button className="btn btn-success">Guardar</button>
           <button className="btn btn-danger" onClick={closeModal}>Cerrar</button>
         </ModalFooter>
       </Modal>


       <Modal isOpen={modalStateDelete}>
         <ModalHeader>
                <p>Confirmar eliminación.   </p>  
         </ModalHeader>
         <ModalBody>
           <p>¿Esta seguro de eliminar la mascota llamada <strong>{petName} </strong>?</p>
         </ModalBody>
         
         <ModalFooter>
         <button className="btn btn-success" onClick={deletePet(petId)}>Confirmar</button>
         <button className="btn btn-danger" onClick={closeModalDelete}>Cerrar</button>
         </ModalFooter>
       </Modal>



     </div>

  );
}

export default App
