import React, { useEffect, useState } from "react";
import { Car } from "../types/CarTypes";
import AddCarButton from "./AddCar";

const CarList = () => {
    const dbLink = "http://192.168.0.23:8080/api/cars";

    //type links = {car: string, owner}
    const [cars, setCars] = useState<Car[]>([]);

    const fetchCars = () => {
        fetch(dbLink)
            .then(resp => resp.json())
            .then(respData => setCars(respData._embedded.cars))
            .catch(err => console.log(err));
    }

    useEffect(fetchCars, []);

    const deleteCar = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (window.confirm("Wirklich löschen?")) {
            fetch(e.currentTarget.name, {method: 'DELETE'})
                .then(fetchCars)
                .catch(err => console.log(err));
        }
    }


    //Front end -------------------------
    const listItemStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }

    const listItems = cars.map((car: Car, index: number) => {
        return (
            <div key={index} style={listItemStyle}>
                <span>{car.brand}</span>
                <span>{car.model}</span>
                <span>{car.color}</span>
                <span>{car.year}</span>
                <span>{car.price}</span>
                <button onClick={deleteCar} name={car._links.car.href} className="flat" style={{margin: 0}}>Delete</button>
            </div>
        );
    });

    return (
        <>
            <AddCarButton fetchCars={fetchCars} />
            <div className="lwd-list">{listItems}</div>
        </> 
        );
}

export default CarList;