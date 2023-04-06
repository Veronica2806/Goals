import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import GoalsList from "../pages/application/GoalsList";
import Home from "../pages/application/Home";
import GoalForm from "../pages/application/GoalForm";
import GoalDetails from "../pages/application/GoalDetails";
import Registration from "../pages/auth/registration/Registration";
import Login from "../pages/auth/login/Login";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/goalslist" element={<GoalsList/>}/>
            <Route path="/goalslist/:goalId" element={<GoalDetails/>}/>
           
            <Route path="/home" element={<Home/>}/>
            <Route path="/goal" element={<GoalForm/>}/>
            <Route path="/goal/:goalId" element={<GoalForm/>}/>

            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/' element={ <Navigate to="/home" /> }/>
        </Routes>
    );
}

export default AppRoutes;