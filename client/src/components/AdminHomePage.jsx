import React, { useState, useEffect } from 'react';
import Edit from './EditCar';
import './AdminHomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminHomePage() {
    const [cars, setCars] = useState([]);
    const [newCar, setNewCar] = useState({ name: '', year: '', price: '' });
    const [editRecordId, setEditRecordId] = useState(null);

    const apiUrl = 'http://localhost:3001/api/cars';
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(apiUrl, {
            withCredentials: 'true'
        })
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const getdata = async () => {
        axios.get(apiUrl, {
            withCredentials: 'true'
        })
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleEdit = (recordId) => {
        console.log(recordId);
        setEditRecordId(recordId);
    };

    const handleHook = () => {
        setEditRecordId(null);
    };

    const handleCreateCar = () => {
        fetch('http://localhost:3001/api/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCar),
            credentials: 'include' // Ensure cookies are included in the request
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create car');
                }
                return response.json();
            })
            .then(data => {
                setCars([...cars, data]);
                setNewCar({ name: '', year: '', price: '' });
            })
            .catch(error => {
                alert(`Error: ${error.message}`);
            });
    };


    const handleDeleteCar = (id) => {
        fetch(`http://localhost:3001/api/cars/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to delete car');
                }
            })
            .then((data) => {
                alert(data.message || 'Car deleted successfully');
                getdata(); // Refresh the car list after deletion
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    };


    const editRecord = (id, updatedData) => {
        fetch(`http://localhost:3001/api/cars/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData),
            credentials: 'include' // This ensures that cookies (including session cookies) are sent with the request
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCars((prevRecords) =>
                    prevRecords.map((car) =>
                        car._id === id ? { ...car, ...updatedData } : car
                    )
                );
            })
            .catch(error => {
                console.error('Error updating car:', error);
                alert('Failed to update car');
            });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/logout', {}, { withCredentials: true })
            .then(response => {
                if (response.data.message === 'Logout successful') {
                    navigate("/");
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
            });
    }


    return (
        <>
            <h1>Assignment for Quadiro Technologies</h1>
            <h2>Admin Homepage</h2>
            <div className="admin-homepage">
                <h3>Create New Car</h3>
                <form onSubmit={handleCreateCar}>
                    <label>
                        Car Name:
                        <input
                            type="text"
                            value={newCar.name}
                            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Manufacturing Year:
                        <input
                            type="number"
                            value={newCar.year}
                            onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Price:
                        <input
                            type="number"
                            value={newCar.price}
                            onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                        />
                    </label>
                    <br />
                    <button>Create Car</button>
                    <button onClick={handleLogout}>Logout</button>
                </form>
                {/* 
            <h3>Car Records</h3>
            <table>
                <thead>
                    <tr>
                        <th>Car Name</th>
                        <th>Manufacturing Year</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            {editingCar && editingCar.id === car.id ? (
                                <td>
                                    <input
                                        type="text"
                                        value={editingCar.name}
                                        onChange={(e) =>
                                            setEditingCar({ ...editingCar, name: e.target.value })
                                        }
                                    />
                                </td>
                            ) : (
                                <td>{car.name}</td>
                            )}
                            {editingCar && editingCar.id === car.id ? (
                                <td>
                                    <input
                                        type="number"
                                        value={editingCar.year}
                                        onChange={(e) =>
                                            setEditingCar({ ...editingCar, year: e.target.value })
                                        }
                                    />
                                </td>
                            ) : (
                                <td>{car.year}</td>
                            )}
                            {editingCar && editingCar.id === car.id ? (
                                <td>
                                    <input
                                        type="number"
                                        value={editingCar.price}
                                        onChange={(e) =>
                                            setEditingCar({ ...editingCar, price: e.target.value })
                                        }
                                    />
                                </td>
                            ) : (
                                <td>{car.price}</td>
                            )}
                            <td>
                                {editingCar && editingCar.id === car.id ? (
                                    <button onClick={() => handleUpdateCar(editingCar)}>Update</button>
                                ) : (
                                    <button onClick={() => handleEditCar(car)}>Edit</button>
                                )}
                                <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingCar && (
                <button onClick={handleCancelEdit}>Cancel Edit</button>
            )} */}
            </div>

            {/* display the data of cars on AdminPage*/}
            <div id="container1">
                {cars.map((elem, index) => {
                    return (
                        <div id="display" key={index}>
                            {/* <h1>Student ID: {elem.CarId}</h1> */}
                            <div id="buttons">
                                {/* <Delete recordId={elem.StudentId} onDelete={onDelete}></Delete> */}
                                <button
                                    type="delete"
                                    onClick={() => handleDeleteCar(elem._id)}
                                    className="inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-3 bg-red-700 text-white hover:bg-red-800"
                                >
                                    Delete
                                </button>
                                <button
                                    type="edit"
                                    onClick={() => handleEdit(elem._id)}
                                    className="inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-3 bg-blue-700 text-white hover:bg-blue-800"
                                >
                                    Edit
                                </button>
                            </div>
                            <p><strong>Car Name:</strong> {elem.name}</p>
                            <p><strong>Manufacturing Year:</strong> {elem.year}</p>
                            <p><strong>Price:</strong> {elem.price}</p>
                            {editRecordId === elem._id && (
                                <Edit recordId={elem._id} onEdit={editRecord} data={elem} hook={handleHook} />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default AdminHomePage;
