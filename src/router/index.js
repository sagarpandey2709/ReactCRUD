import { Routes,Route } from "react-router-dom";
import User from "../pages/User";
import UserCreate from "../pages/UserCreate";
import UserEdit from "../pages/UserEdit";

function MyRouter() {
    return (
        <Routes>
            <Route path="/users" element={<User />}></Route>
            <Route path="/users/create" element={<UserCreate/>}></Route>
            <Route path="/users/:id/edit" element={<UserEdit/>}></Route>
        </Routes>
    )
}

export default MyRouter;