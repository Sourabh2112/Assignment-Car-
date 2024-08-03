import React, { useState, useEffect } from 'react';
import './UserHomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserHomePage() {
    const [cars, setCars] = useState([]);
    const baseUrl = 'https://assignment-car.vercel.app';
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}/api/cars`, {
            method: 'GET',
            credentials: 'include'  // Use 'include' instead of 'true' for withCredentials
        })
            .then(response => response.json())
            .then(data => {
                setCars(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const handleLogout = (e) => {
        e.preventDefault();
      //  axios.post('http://localhost:3001/logout', {}, { withCredentials: true })
           // .then(response => {
               // if (response.data.message === 'Logout successful') {
                    navigate("/");
              //  } else {
              //      alert(response.data.message);
             //   }
           // })
          //  .catch(error => {
               // console.error('Error logging in:', error);
          //  });
    }

    return (
        <>
            <h1>Assignment for Quadiro Technologies</h1>
            <h2>User Homepage</h2>
            <div>
                <main>
                    <h1>Cars</h1>
                    <button onClick={handleLogout} className='button'>Logout</button>
                    <table id="car-list">
                        <thead>
                            <tr>
                                <th>Serial No</th>
                                <th>Car Name</th>
                                <th>Manufacturing Year</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car, index) => (
                                <tr key={car._id}>
                                    <td>{index + 1}</td>
                                    <td>{car.name}</td>
                                    <td>{car.year}</td>
                                    <td>{car.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </>
    );
}

export default UserHomePage;
