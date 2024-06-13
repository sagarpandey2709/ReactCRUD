
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate,useParams} from "react-router-dom";
import Loading from "../components/Loading";

function UserEdit() {
    let { id } = useParams();  
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [inputErrorList, setInputErrorList] = useState({});
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`).then(res => {
            console.log(res)
            setUser(res.data.user);
            setLoading(false);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert(error.response.data.message)
                    setLoading(false);
                }
                if (error.response.status === 500) {
                    alert(error.response.data)
                    setLoading(false);
                }
          }  
        });
    }, [id]);

    const handleInput = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const updateUser = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: user.name,
            email: user.email,
            password: user.password,
            dob: user.dob,
        }

        axios.put(`http://127.0.0.1:8000/api/users/${id}`, data).then(res => {
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

                if (error.response.status === 404) {
                    alert(error.response.data.message)
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

    if (Object.keys(user).length === 0) {
        return (
            <div className="container">
                <h4>No Such User Id Found</h4>
            </div>
        )
    }
    return (
        <div>
            <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Edit Users 
                                <Link to="/users" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                                <form onSubmit={updateUser}>
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
                                        <button type="submit" className="btn btn-primary">Update User</button>
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

export default UserEdit;