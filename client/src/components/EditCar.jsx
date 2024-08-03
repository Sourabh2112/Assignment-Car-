import React, { useState, useEffect } from "react";

const Edit = ({ recordId, onEdit, data, hook }) => {
    const [newData, setNewData] = useState({ name: "", year: "", price: "" });
    useEffect(() => {
        setNewData(data);
        Open();
    }, []);

    const handleEdit = (e) => {
        e.preventDefault();

        onEdit(recordId, newData);
        setNewData({ name: "", year: "", price: "" });
        document.getElementById("editForm").style.display = "none";
        hook();
    };

    const Open = () => {
        document.getElementById("editForm").style.display = "block";
        // hook();
    };

    const Close = () => {
        document.getElementById("editForm").style.display = "none";
        hook();
    };

    return (
        <>
            <div id="editForm">
                <div id="container2">
                    <span id="close" onClick={Close}>
                        &times;
                    </span>
                    <h1>EDIT FORM</h1>
                    <label htmlFor="name">Car Name:</label>
                    <input
                        type="text"
                        placeholder="New name"
                        value={newData.name}
                        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                    />
                    <label htmlFor="year">Manufaturing Year:</label>
                    <input
                        type="text"
                        placeholder="New year"
                        value={newData.year}
                        onChange={(e) => setNewData({ ...newData, year: e.target.value })}
                    />
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        placeholder="New price"
                        value={newData.price}
                        onChange={(e) => setNewData({ ...newData, price: e.target.value })}
                    />
                    <button
                        onClick={handleEdit}
                        type="submit"
                        className="edit-button"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default Edit;
