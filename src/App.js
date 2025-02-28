import { isEmpty } from "lodash";
import { React,useState,useEffect } from "react"
import { getCollection,deleteDocument,addDocument,updateDocument } from "./actions";
import { Modal,ModalHeader,ModalBody,ModalFooter } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'



function App() {

/*I call the database when loading the page*/
useEffect(() => {
  (async ()=> {
    /*I get the documents from the collection called pets*/ 
    const result = await getCollection("pets")

    /*I fill the pet array with the documents obtained */
    setPets(result.data)
  })()
  
}, [])

/*States to control opening and closing of modals */
const [modalState, setModalState] = useState(false)
const [modalStateDelete, setModalStateDelete] = useState(false)

/*Array of pets*/
const [pets, setPets] = useState([]) 



/*Pet attributes*/
const [petId, setPetId] = useState("")
const [petName, setPetName] = useState("")
const [petType, setPetType] = useState("")
const [petBreed, setPetBreed] = useState("")
const [petBirthDate, setPetBirthDate] = useState("")
const [petOwner, setPetOwner] = useState("")
const [petOwnerPhone, setPetOwnerPhone] = useState("")
const [petOwnerAddress, setPetOwnerAddress] = useState("")
const [petOwnerEmail, setPetOwnerEmail] = useState("")

/*Status to be able to control and determine in case of any error */
const [error, setError] = useState(null)
const [editMode, setEditMode] = useState(false)

/*Functions to close and open the modalities of Edit, Create, Delete */
const openModal = () =>{
  setError(null)
  setModalState(true)
}

const closeModal =() =>{
  setModalState(false)
}

const openModalDelete = () =>{
  setModalStateDelete(true)
}

const closeModalDelete =() =>{
  setModalStateDelete(false)
}


/*Function to validate that the data entered is correct*/
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

/*Functions to set the fields in the modal to add, edit or delete pet*/

/*It is executed when the Add Pet button is clicked.
It will put the fields of the modal empty and it will put the edit mode in false */
const modalAddPet = ()=>{
  setPetAttributes("")
  setEditMode(false)
  openModal()
}

/*It is executed when the Edit Pet button is clicked.
It will put the modal fields full and it will put the edit mode to true */
const modalEditPet =(petEdit) =>{
  setPetAttributes(petEdit)
  setEditMode(true)
  openModal(true)
}

/*It is executed when the Delete Pet button is clicked. */
const modalDeletePet =(pet) =>{
  setPetAttributes(pet)
  openModalDelete(true)

}

/*Function that is executed in the confirm of the Add Pet modal */
const addPet = async(e) =>{
   e.preventDefault()

   /*It is validated if the fields are full */
  if(!validForm()){
    return
  }

  /*Object with information that the user entered*/
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

  /*I make a request to Firebase to insert a new document through the addDocument and I get the response */
  const result = await addDocument("pets",newPet)

  /*If the request fails, I get the error message and paint it through the error variable */
  if(!result.statusResponse){
    setError(result.error)
    return
  }

  /*Object that allows to bind the new pet with the id returned by firebasee*/
  const newPetAdded = {id: result.data.id, ...newPet}

  /*add the new pet to the array where the other pets are */
  setPets([...pets, newPetAdded])

  /*I blank the fields and close the modal */
  setPetAttributes("")
  closeModal()
}

/*It is executed when I confirm the edition of a pet from the edit modal */
const savePet = async(e) =>{
   e.preventDefault()

   if(!validForm()){
    return
  }

  /*I create an object with the fields entered by the user */
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

  /*I make a request to FireBase to update the document with the data that must be modified */
  const result = await updateDocument("pets",petId, editPet)

  if(!result.statusResponse){
    setError(result.error)
    return
  }

  /*I declare an object with the already existing pets and the newly modified pet, I update it in the existing array*/
  const newPetsEdited = pets.map(pet => pet.id === petId ? {id: petId,...editPet} : pet )

  /*Set the pets array with the information already updated */
  setPets(newPetsEdited)
  setEditMode(false)
  setPetAttributes("")
  closeModal()




}

/*It is executed when confirming the deletion of the Delete modal */
const deletePet = async(e) =>{
  e.preventDefault()

  /*I make the request to FireBae sending him the Id of the pet (document) to be deleted */
  const result = await deleteDocument("pets",petId)

   if(!result.statusResponse){
    setError(result.error)
    return
  }

  /*Filter all existing pets except the one just deleted to clean it from the array */
   const filteredPets =  pets.filter(pet => pet.id !== petId) //Todas menos la que el usuario elimino
   setPets(filteredPets)

  closeModalDelete()

}

const setPetAttributes = (Attributes) =>{
  //Set state from pet attributes

  //If the Attributes parameter is empty it is because I am going to add a pet, otherwise I am going to edit it
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

  <div>

{ /*------------------------------------------- Header Component  -------------------------------------------*/}
    <header>
        <div className="text-header">
          <h1>Veterinaria</h1>
          <h2>Registro Mascotas</h2>
          <button type="button" className="btn btn-success btn-sm" onClick={modalAddPet}><i className="fas fa-plus"></i> Agregar Mascota</button>
        </div>

        {/* SVG from page https://dev.to/theliquidcharcoal/pure-html-animation-animate-svg-with-animate-2a5m */}
        <div>
          <svg id="waveSVG" preserveAspectRatio="none">
              <path id="wavePath"

                  d="
                      M 0 67 
                      C 273,183
                        822,-40
                        1920,106 
                      V 359 
                      H 0 
                      V 67 
                      Z"> 
              </path>
          </svg>
        </div>
    </header>

      { /*------------------------------------------- Main/Body Component -------------------------------------------*/}
    <main>      
      <section className="text-center">
        <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
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
                               /* process the array of registered pets to paint them in a table*/
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

                                    { /*Instance edit and delete buttons in each row of the table*/}
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
      </section>

      { /*------------------------------------------- Modals Window -------------------------------------------*/}
      {/*This modal will only be displayed when the state of modalState changes */}                      
      <Modal isOpen={modalState}>
         <ModalHeader>
           {/*Depending on whether or not I'm in edit mode, I show Modify Pet or Add Pet */}
         <i className="fas fa-paw"></i> {editMode ?  "Modificar Mascota." : "Agregar Mascota." }
         </ModalHeader>
         <ModalBody>
        
             <div className="form-group">
                <div className="input-group mb3">
                     <div className="input-group-prepend">
                         <span className="input-group-text" id="basic-addon3">Nombre</span>
                     </div>
                     {/*When I modify the field I set the variable */}
                     <input 
                      type="text" 
                      className="form-control" 
                      aria-describedby="basic-addon3" 
                      placeholder="Nombre de la mascota." 
                      onChange={(text) => setPetName(text.target.value)}
                      defaultValue={petName}
                      >                  
                    </input>
               </div>
            </div>

            <div className="form-group">
               <div className="input-group mb3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Tipo</span>
                    </div>
                    {/*When I modify the field I set the variable */}
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
                    {/*When I modify the field I set the variable */}
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
                    {/*When I modify the field I set the variable */}
                    <input 
                      type="date" 
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
                    {/*When I modify the field I set the variable */}
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
                    {/*When I modify the field I set the variable */}
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
                    {/*When I modify the field I set the variable */}
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
                     {/*When I modify the field I set the variable */}
                    <input 
                      type="email" 
                      className="form-control" 
                      aria-describedby="basic-addon3" 
                      placeholder="Email del propietario." 
                      onChange={(text) => setPetOwnerEmail(text.target.value)}
                      defaultValue={petOwnerEmail}>                  
                    </input>
               </div>
            </div>  
            {/*In case of an error, I show it in a text-danger */}
            { error && <span className="text-danger">{error}</span> }           
          
       

        </ModalBody>
        <ModalFooter>
          {/*Form that at the time of sending the request will add or edit a pet */}
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
    </main>
                      
  </div>

    

    
    
  
     
  );

 
}

export default App
