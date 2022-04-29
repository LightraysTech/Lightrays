import React from "react";

const MyList = () => {
    interface Car {brand: string, model: string}

    const data: Array<Car> = [{brand: 'Ford', model: 'Mustang'}, {brand: 'Tesla', model: 'Model S'}];

    const tableRows = data.map((item, index) => {
        return (<tr key={index}><td>{item.brand}</td><td>{item.model}</td></tr>);
    });

    return (
        <table><tbody>{tableRows}</tbody></table>
    );
}

export default MyList