import React from "react";
import {} from 'reactstrap';



export default function Form(){

    //Sets the default values for the form. 
    const [formData, setFormData] = React.useState({
        name :"First Last", email: "you@email.com", phone:"(123)456-7891", address:"1234 Auction st", city:"Manhattan", usState:"",zipcode:"66502",
        equipmentType:"", description:"Tell us about your equipment!", estimatedValue: ""
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
    
    //renders form.
    return(
        <>
            <h1>About You:</h1>
            <form >
                <div className = "form-group">
                    <label for ="name" />
                        Your Name:
                        <input name ="name" type= "text"className = "mb-2 mr-sm-2" onChange = {handleChange} value= {formData.name} />
                </div>
                

                <div className= "form-group">
                    <label>
                        Contact Details (At least one):
                        <input name = "email" type ="email" className = "mb-2 mr-sm-2" onChange = {handleChange} value = {formData.email}/>
                        
                        <input name = "phone" type="text" className = "mb-2 mr-sm-2" onChange = {handleChange} value = {formData.phone} />
                    </label>
                </div>
                

                <div className= "form-group">
                    <label>
                        Address:
                        <input name = "address" type = "text" className = "mb-2 mr-sm-2" onChange = {handleChange} value = {formData.address} />
                    </label>

                    <label>
                        City:
                        <input name = "city" type ="text" className = "mb-2 mr-sm-2" onChange = {handleChange} value = {formData.city} />
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
                        <input name = "zipcode" type = "text"className = "mb-2 mr-sm-2" onChange = {handleChange} value= {formData.zipcode} />
                    </label>
                </div>




                <h1>About Your Equipment:</h1>
                
                <div className = "form-group" >
                    <label for= "equipmentType">Equipment Type:</label>
                    <select id = "equipmentType" name = "equipmentType" className = "mb-2 mr-sm-2" onChange = {handleChange}>
                        <option value = "">--Please Choose--</option>
                        <EquipmentOptions data = {equipmentList} />
                    </select>
                </div>

                <label for = "description"> Description: </label>
                <textarea name = "description" rows = "8" cols="60" className = "mb-2 mr-sm-2" value = {formData.description}  /> 

                <div className = "form-group">
                    <label for = "estimatedValue"> Estimated Value:</label>
                    <input name = "estimatedValue" type= "number" className = "mb-2 mr-sm-2" value = {formData.estimatedValue} />
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
