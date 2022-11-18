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

    //When any value of the form is changed, the form data's state is updated.
    function handleChange(event){
        setFormData((prevForm)=>{
            return {
                ...prevForm,
                [event.target.name] : event.target.value
            }
        })
    }
    
    //Checks data to ensure it is valid. 
    function handleSubmit(event){

        //initializes fail reason, so all cases of failure are caught. 
        let failReason = "unknown reason";
        let failed = true;

        event.preventDefault();
        
        //uses method to call api if data is valid. 
        if( (formData.name.length >= 5) && ( (formData.email.length >= 5) || (formData.phone.length >= 10))
             && (formData.usState !== "") && (formData.equipmentType !== "") && (formData.description.length >= 10) ){
                handleCreate();
                failed = false;
                //if the submission is successful, the page reloads. 
                window.location.reload(false);

        //generates reason for failure if data is invalid. 
        } else if(formData.name.length < 5){
            failReason = "name field is invalid."
        } else if( (formData.email.length < 5) && (formData.phone.length <10) ){
            failReason = "contact details are invalid."
        } else if (formData.usState === ""){
            failReason ="state field is invalid."
        } else if(formData.equipmentType === ""){
            failReason = "equipment type field is invalid."
        } else if(formData.description.length < 10){
            failReason = "equipment description field is invalid."
        }

        //alerts user to failure reason if input fails. 
        if(failed){
            alert("Form submission failed because " + failReason);
        }

    }


    //calls the api to save a user request. 
    const handleCreate = () => {
        axios.post('http://localhost:3001/api/new', {
            name : formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.usState,
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
    
    //className for all inputs for reactstrap styling
    let inputClassRStrap = "form-control mb-2 mr-sm-2";

    //renders form.
    return(
        <>  <h1>Request to Auction Equipment</h1>
            <p className = "text-danger">* indicates a required field</p>
            <br/>

            <form onSubmit={handleSubmit} >

                <div class="container border bg-light">

                    <p className = "text-primary"><strong>About You:</strong></p>

                    <div className = "form-group">
                        <label>
                            Your Name:*
                            <input name ="name" type= "text"className = {inputClassRStrap} onChange = {handleChange} defaultValue= {formData.name} />
                        </label>
                    </div>
                    
                    <label>
                            Contact Details (At least one):*
                        <div className= "form-group">
                                <label>
                                    Email:
                                    <input name = "email" type ="email" className = {inputClassRStrap} onChange = {handleChange} defaultValue = {formData.email}/>
                                </label>

                                <label>
                                    Phone:
                                    <input name = "phone" type="text" className = {inputClassRStrap} onChange = {handleChange} defaultValue = {formData.phone} />
                                </label>
                        </div>
                    </label>
                    

                    <div className= "form-group">

                        <label>
                            Address:
                            <input name = "address" type = "text" className = {inputClassRStrap} onChange = {handleChange} defaultValue = {formData.address} />
                        </label>

                        <label>
                            City:
                            <input name = "city" type ="text" className = {inputClassRStrap} onChange = {handleChange} defaultValue = {formData.city} />
                        </label>

                        <label>
                        State:* 
                        <select id = "usState" name= "usState" className = {inputClassRStrap} onChange = {handleChange}>
                                <option value = "" >--Please Choose--</option>
                                <StateOptions />
                        </select>
                        </label>

                        <label>
                            Zip Code:
                            <input name = "zipcode" type = "text"className = {inputClassRStrap} onChange = {handleChange} defaultValue= {formData.zipcode} />
                        </label>
                    </div>
                </div>

                <br/> <br/>
                <div class="container border bg-light">
                    
                    <p className = "text-primary"><strong>About Your Equipment:</strong></p>
                    
                    <div className = "form-group" >
                        <label>
                            Equipment Type:*
                            <select id = "equipmentType" name = "equipmentType" className = {inputClassRStrap} onChange = {handleChange}>
                                <option value = "">--Please Choose--</option>
                                <EquipmentOptions data = {equipmentList} />
                            </select>
                        </label>
                    </div>

                    <div className = "form-group">
                        <label> Description:*
                            <textarea name = "description" rows = "8" cols="60" className = {inputClassRStrap} defaultValue = {formData.description} onChange = {handleChange}  /> 
                        </label>
                    </div>

                    <div className = "form-group">
                        <label> Estimated Value:
                                <input name = "estimatedValue" type= "number" className = {inputClassRStrap} defaultValue = {formData.estimatedValue} />
                        </label>
                    </div>
                </div>

                <br/>
                <button type = "submit" className="btn border bg-primary text-light"> Submit </button>

                
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
