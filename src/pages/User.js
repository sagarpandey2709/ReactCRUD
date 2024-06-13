import axios from "axios";
import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function User() {
    const [loading, setLoading] = useState(true);
    const [users, setUser] = useState([]);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users`).then(res => {
            setUser(res.data.users);
            setLoading(false);
        });
    }, [])

    const deleteUser = (e, id) => {
        e.preventDefault();
    
        // Display a confirmation box
        const userConfirmed = window.confirm("Are you sure you want to delete this user?");
    
        // If the user cancels, exit the function
        if (!userConfirmed) {
            return;
        }
    
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";
    
        axios.delete(`http://127.0.0.1:8000/api/users/${id}`).then(res => {
            alert(res.data.message);
            thisClicked.closest("tr").remove();
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert(error.response.data.message);
                    thisClicked.innerText = "Delete";
                }
                
                // if (error.response.status === 500) {
                //     alert(error.response.data);
                // }
            }  
        });
    };
    

    if (loading) {
        return (
            <Loading/>
        )
    }
    var usersDetails = "";
    usersDetails = users.map((item,index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.dob}</td>
                <td>
                    <Link to={`/users/${item.id}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteUser(e,item.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    })
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Users List
                                <Link to="/users/create" className="btn btn-primary float-end">Add User</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>DOB</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;