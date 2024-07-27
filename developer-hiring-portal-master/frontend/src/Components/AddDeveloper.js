import { useState } from "react";
import "./addDeveloper.css";
import FormInput from "./FormInput";
import RegisterImage from "../assets/register.png";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import TagInputAdd from "./TagInputAdd";

const AddDeveloperDetails = () => {
  const [values, setValues] = useState({
    name: "",
    bio: "",
    experience: "",
    techStack: []
  });
  const navigate=useNavigate();
  const auth=JSON.parse(localStorage.getItem("data"));
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage: "Name is required...",
      label: "Name",
      pattern: "^[A-Za-z]{1,20}$",
      required: true,
    },
    {
      id: 2,
      name: "bio",
      type: "text",
      placeholder: "Bio",
      errorMessage: "Bio is required...",
      label: "Bio",
      required: true,
    },
    {
      id: 3,
      name: "experience",
      type: "number",
      errorMessage: "Experience is required, Enter 0 if no experience.",
      placeholder: "Experience / Years",
      label: "Working Experience",
      required: true,
    },
    
  ];

  const updateTechStack = (techs) => {
    setValues((previous) => ({...previous, techStack: techs}));
  }
  const senduser=async()=>{
    const res=await axios.post(`http://localhost:5000/api/user/userin/${auth._id}`,{
      name:values.name,
      email:auth.email,
      bio:values.bio,
      skill:values.techStack,
      experience:values.experience,
      userid:auth._id,
      social:[],
      projects:[]
    }).catch(error=>console.log(error))
    const data=await res.data
    return data

  }

  const handleSubmit = (e) => {
    e.preventDefault();
   const auth=JSON.parse(localStorage.getItem("data"));
    console.log(auth.email);
    senduser().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>navigate("/addproject")).catch(error=>console.log(error));
    // * Data Available Here
    console.log(values);
    // TODO : need to type value of the experience to int
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <div className="flex flex-row">
        <form onSubmit={handleSubmit} >
          <h1 className="text-3xl">Register</h1><br />
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <label>Skills</label>
          <TagInputAdd handleAddTechStack={updateTechStack}></TagInputAdd>
          <button>Submit</button>
        </form>
        <div className="flex h-scree"><img className="h-4/6 m-auto" src={RegisterImage} alt="" /></div>
      </div>
    </div>
  );
};

export { AddDeveloperDetails };
