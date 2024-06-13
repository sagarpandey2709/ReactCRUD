import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function UserCreate(params) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inputErrorList, setInputErrorList] = useState({});
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        dob:''
    })

    const handleInput = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const saveUser = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: user.name,
            email: user.email,
            password: user.password,
            dob: user.dob,
        }

        axios.post(`http://127.0.0.1:8000/api/users`, data).then(res => {
            alert(res.data.message);
            navigate('/users');
            setLoading(false);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    setInputErrorList(error.response.data.errors)
                    setLoading(false);
                }
                
                // if (error.response.status === 500) {
                //     alert(error.response.data)
                //     setLoading(false);
                // }
          }  
        });
    }

    if (loading) {
        return (
            <Loading/>
        )
    }
    return (
        <div>
            <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Users 
                                <Link to="/users" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                                <form onSubmit={saveUser}>
                                    <div className="mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" value={user.name} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.name}</span>
                                    </div> 
                                    <div className="mb-3">
                                        <label>Email</label>
                                        <input type="email" name="email" value={user.email} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.email}</span>                                   
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" value={user.password} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.password}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>DOB</label>
                                        <input type="date" name="dob" value={user.dob} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.dob}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Save User</button>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default UserCreate;