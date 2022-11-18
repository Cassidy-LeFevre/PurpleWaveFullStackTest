import React from "react";
import {} from 'reactstrap';
import axios from 'axios';


export default function Form(){

    //Sets the default values for the form. 
    const [formData, setFormData] = React.useState({
        name :"", email: "", phone:"", address:"", city:"", usState:"",zipcode:"",
        equipmentType:"", description:"", estimatedValue: 0
    })
    
    /*Upon the components mounting, the equipment types are fetched from the API and
     set to state. */
    const [equipmentList, setEquipmentList] = React.useState([]);
    React.useEffect(() => {
        fetch("/api/equipment_types")
        .then((res) => res.json())
        .then((data) => setEquipmentList(data))
    }, [])

    /*When any value of the form is changed, the form data's state is updated. */
    function handleChange(event){
        setFormData((prevForm)=>{
            return {
                ...prevForm,
                [event.target.name] : event.target.value
            }
        })
    }

    function handleSubmit(event){
        handleCreate();
        event.preventDefault();
        if( (formData.name.length > 8) && ( (formData.email.length > 8) || (formData.phone.length >= 10))
             && (formData.usState != "") && (formData.equipmentType != "") && (formData.description.length >= 10) ){

             }

    }

    const handleCreate = () => {
        axios.post('http://localhost:3001/api/new', {
            name : formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipcode: formData.zipcode,
            equipmentType: formData.equipmentType,
            description: formData.description,
            estimatedValue: formData.estimatedValue

        })

        .then(res => {
            alert(res.data);
            return;
        })
    }
    
    //renders form.
    return(
        <>
            <h1>About You:</h1>
            <form onSubmit={handleSubmit} >
                <div className = "form-group">
                    <label>
                        Your Name:
                        <input name ="name" type= "text"className = "mb-2 mr-sm-2" onChange = {handleChange} defaultValue= {formData.name} />
                    </label>
                </div>
                

                <div className= "form-group">
                    <label>
                        Contact Details (At least one):
                        <input name = "email" type ="email" className = "mb-2 mr-sm-2" onChange = {handleChange} defaultValue = {formData.email}/>
                        
                        <input name = "phone" type="text" className = "mb-2 mr-sm-2" onChange = {handleChange} defaultValue = {formData.phone} />
                    </label>
                </div>
                

                <div className= "form-group">
                    <label>
                        Address:
                        <input name = "address" type = "text" className = "mb-2 mr-sm-2" onChange = {handleChange} defaultValue = {formData.address} />
                    </label>

                    <label>
                        City:
                        <input name = "city" type ="text" className = "mb-2 mr-sm-2" onChange = {handleChange} defaultValue = {formData.city} />
                    </label>

                    <label>
                    State: 
                    <select id = "usState" name= "usState" className = "mb-2 mr-sm-2" onChange = {handleChange}>
                            <option value = "" >--Please Choose--</option>
                            <StateOptions />
                        </select>
                    </label>

                    <label>
                        Zip Code:
                        <input name = "zipcode" type = "text"className = "mb-2 mr-sm-2" onChange = {handleChange} defaultValue= {formData.zipcode} />
                    </label>
                </div>




                <h1>About Your Equipment:</h1>
                
                <div className = "form-group" >
                    <label>
                        Equipment Type:
                        <select id = "equipmentType" name = "equipmentType" className = "mb-2 mr-sm-2" onChange = {handleChange}>
                            <option value = "">--Please Choose--</option>
                            <EquipmentOptions data = {equipmentList} />
                        </select>
                    </label>
                </div>

                <div className = "form-group">
                    <label> Description:
                        <textarea name = "description" rows = "8" cols="60" className = "mb-2 mr-sm-2" defaultValue = {formData.description} onChange = {handleChange}  /> 
                    </label>
                </div>

                <div className = "form-group">
                    <label> Estimated Value:
                            <input name = "estimatedValue" type= "number" className = "mb-2 mr-sm-2" defaultValue = {formData.estimatedValue} />
                    </label>
                </div>


                <input type = "submit" />

                
            </form>
        </>
    )
}



//Renders options for state select. 
function StateOptions(){
    const usStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    
    const statesOptions = usStates.map((val)=>{
        return(
            <option key = {val}>{val}</option>
        )
    })
    
    return statesOptions;
    
}

//Takes in list of equipment types and renders options for equipment type select. 
function EquipmentOptions(props){

    const equipmentOptions = props.data.map((val) =>{
        return(
            <option key= {val}>{val}</option>
        )
    })

    return equipmentOptions;

}
