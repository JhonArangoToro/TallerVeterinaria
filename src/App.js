import { isEmpty } from "lodash";
import { React,useState,useEffect } from "react"
import { getCollection,deleteDocument,addDocument,updateDocument } from "./actions";
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
  setError(null)
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
    return
  }

  if(isEmpty(petType)){
    setError("Ingrese el tipo de la mascota")
    isValid=false
    return
  }

  if(isEmpty(petBreed)){
    setError("Ingrese la raza de la mascota")
    isValid=false
    return
  }

  if(isEmpty(petBirthDate)){
    setError("Ingrese fecha de nacimiento de la de la mascota")
    isValid=false
    return
  }

  if(isEmpty(petOwner)){
    setError("Ingrese dueño de la de la mascota")
    isValid=false
    return
  }

  if(isEmpty(petOwnerPhone)){
    setError("Ingrese telefono del dueño")
    isValid=false
    return
  }

  if(isEmpty(petOwnerAddress)){
    setError("Ingrese direccion del dueño")
    isValid=false
    return
  }

  if(isEmpty(petOwnerEmail)){
    setError("Ingrese email del dueño")
    isValid=false
    return
  }

  return isValid

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

const addPet = async(e) =>{
   e.preventDefault()

  if(!validForm()){
    return
  }
  const newPet ={
    name: petName,
    type: petType,
    breed: petBreed,
    birth_date: petBirthDate,
    owner_name : petOwner,
    owner_phone :petOwnerPhone,
    owner_address : petOwnerAddress,
    owner_email: petOwnerEmail
  }

  const result = await addDocument("pets",newPet)

  if(!result.statusResponse){
    setError(result.error)
    return
  }

  const newPetAdded = {id: result.data.id, ...newPet}

  setPets([...pets, newPetAdded])
  setPetAttributes("")
  closeModal()
}

const savePet = async(e) =>{
   e.preventDefault()

   if(!validForm()){
    return
  }

  const editPet ={
    name: petName,
    type: petType,
    breed: petBreed,
    birth_date: petBirthDate,
    owner_name : petOwner,
    owner_phone :petOwnerPhone,
    owner_address : petOwnerAddress,
    owner_email: petOwnerEmail
  }

  const result = await updateDocument("pets",petId, editPet)

  if(!result.statusResponse){
    setError(result.error)
    return
  }

  const newPetsEdited = pets.map(pet => pet.id === petId ? {id: petId,...editPet} : pet )

  setPets(newPetsEdited)
  setEditMode(false)
  setPetAttributes("")
  closeModal()




}

const deletePet = async(e) =>{
  e.preventDefault()

  const result = await deleteDocument("pets",petId)

   if(!result.statusResponse){
    setError(result.error)
    return
  }

   const filteredPets =  pets.filter(pet => pet.id !== petId) //Todas menos la que el usuario elimino
   setPets(filteredPets)

  closeModalDelete()

  
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
                 <div className="card-header" >
                    <h5 className="card-title">Veterinaria / <strong style={{color:"blue"}}>Registro Mascotas</strong></h5>
                    <p className="card-text">Trabajo Practico </p>
                    

                      <div className="col-md-12 ">
                        <div className="card-tools d-flex justify-content-between align-items-center">
                            Listado Mascotas Registradas
                            <button type="button" className="btn btn-success btn-sm" onClick={modalAddPet}><i className="fas fa-plus"></i> Agregar Mascota</button>
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
                                       <i className="fas fa-edit"></i>
                                      Editar
                                    </button>
                                    <button 
                                      className="btn btn-danger btn-sm"
                                      onClick={() => modalDeletePet(pet)}
                                    >
                                      <i className="far fa-trash-alt"></i> Eliminar
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
         <i className="fas fa-paw"></i> {editMode ?  "Modificar Mascota." : "Agregar Mascota." }
         </ModalHeader>
         <ModalBody>
           
             <div className="form-group">
                <div className="input-group mb3">
                     <div className="input-group-prepend">
                         <span className="input-group-text" id="basic-addon3">Nombre</span>
                     </div>
                     <input 
                       type="text" 
                       className="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Nombre de la mascota." 
                       onChange={(text) => setPetName(text.target.value)}
                       defaultValue={petName}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div className="input-group-prepend">
                         <span className="input-group-text" id="basic-addon3">Tipo</span>
                     </div>
                     <input 
                       type="text" 
                       className="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Tipo de la mascota." 
                       onChange={(text) => setPetType(text.target.value)}
                       defaultValue={petType}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div className="input-group-prepend">
                         <span className="input-group-text" id="basic-addon3">Raza</span>
                     </div>
                     <input 
                       type="text" 
                       className="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Raza de la mascota." 
                       onChange={(text) => setPetBreed(text.target.value)}
                       defaultValue={petBreed}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div className="input-group-prepend">
                         <span className="input-group-text" id="basic-addon3">Fecha Nacimiento</span>
                     </div>
                     <input 
                       type="text" 
                       className="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Fecha de nacimiento de la mascota." 
                       onChange={(text) => setPetBirthDate(text.target.value)}
                       defaultValue={petBirthDate}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div className="input-group-prepend">
                         <span className="input-group-text" id="basic-addon3">Propietario</span>
                     </div>
                     <input 
                       type="text" 
                       className="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Propietario de la mascota." 
                       onChange={(text) => setPetOwner(text.target.value)}
                       defaultValue={petOwner}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div className="input-group-prepend">
                         <span className="input-group-text" id="basic-addon3">Telefono</span>
                     </div>
                     <input 
                       type="text" 
                       className="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Telefono del propietario."
                       onChange={(text) => setPetOwnerPhone(text.target.value)} 
                       defaultValue={petOwnerPhone}>                  
                     </input>
                </div>
             </div>
             <div className="form-group">
                <div className="input-group mb3">
                     <div className="input-group-prepend">
                         <span className="input-group-text" id="basic-addon3">Direccion</span>
                     </div>
                     <input 
                       type="text" 
                       className="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Direccion del propietario." 
                       onChange={(text) => setPetOwnerAddress(text.target.value)}
                       defaultValue={petOwnerAddress}>                  
                     </input>
                </div>
             </div>

             <div className="form-group">
                <div className="input-group mb3">
                     <div className="input-group-prepend">
                         <span className="input-group-text" id="basic-addon3">Email</span>
                     </div>
                     <input 
                       type="text" 
                       className="form-control" 
                       aria-describedby="basic-addon3" 
                       placeholder="Email del propietario." 
                       onChange={(text) => setPetOwnerEmail(text.target.value)}
                       defaultValue={petOwnerEmail}>                  
                     </input>
                </div>
             </div>  
             { error && <span className="text-danger">{error}</span> }           
           
        

         </ModalBody>
         <ModalFooter>
         <form onSubmit={ editMode ? savePet : addPet}>
           <button className="btn btn-success mx-2" type="submit">Guardar</button>
           <button className="btn btn-danger" type ="button" onClick={closeModal}>Cerrar</button>
          </form>
         </ModalFooter>
       </Modal>



       <Modal isOpen={modalStateDelete}>
         <ModalHeader>
         <p> <i className="fas fa-cat"></i> Confirmar Eliminación!   </p>  
         </ModalHeader>
         <ModalBody>
           <p>¿Esta seguro de eliminar la mascota llamada <strong>{petName} </strong>?</p>
           <div className="form-group">

           </div>
         </ModalBody>
         
         <ModalFooter>
           <div className="form-group">
             <form onSubmit={deletePet}>
                <button className="btn btn-success mx-2" type="submit">  Confirmar</button>
                <button className="btn btn-danger" type="button" onClick={closeModalDelete}>Cerrar</button>
             </form>
             
           

           </div>
         
         </ModalFooter>
       </Modal>



     </div>

  );
}

export default App
