import React, { useState } from "react";
import LWDWindow from "./LWDWindow";
import { Car } from "../types/CarTypes";

const AddCarButton = ({fetchCars}: {fetchCars: () => void}) => {
    const dbLink = "http://192.168.0.23:8080/api/cars";

    const [windowOpen, setWindowOpen] = useState<boolean>(false);
    const toggleWindowHandler = (isOpen: boolean) => setWindowOpen(isOpen);  //LWDWindow callback handler (to update state)
    const openWindowHandler = () => setWindowOpen(true);  //Button event handler

    const [car, setCar] = useState<Car>({brand: "", model: "", color: "", year: 2000, price: 0});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCar({...car, [e.currentTarget.name]: e.currentTarget.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetch(dbLink, {method: 'POST', mode: 'cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(car)})
        .then(res => fetchCars())
        .catch(err => console.log(err)
      )
      setWindowOpen(false);
    }
  
    return (
        <>
        <button onClick={openWindowHandler}>Neues Auto</button>
        <LWDWindow header={{text: "Neues Auto"}} isOpen={windowOpen} isOpenCallback={toggleWindowHandler} width="300px" height="400px">
          <form  onSubmit={handleSubmit}>
          <input type="text" placeholder="Brand" name="brand" required={true} onChange={handleChange}/><br/> 
            <input type="text" placeholder="Model" name="model" required={true} onChange={handleChange}/><br/>
            <input type="text" placeholder="Color" name="color" required={true} onChange={handleChange}/><br/>
            <input type="text" placeholder="Year" name="year" required={true} onChange={handleChange}/><br/>
            <input type="text" placeholder="Price" name="price" required={true} onChange={handleChange}/><br/>
            <input type="submit"/>
          </form>
        </LWDWindow>
        </>
    );
}

export default AddCarButton;