import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import GoalsList from "../pages/application/GoalsList";
import GoalForm from "../pages/application/GoalForm";
import GoalDetails from "../pages/application/GoalDetails/GoalDetails";
import Registration from "../pages/auth/registration/Registration";
import Login from "../pages/auth/login/Login";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/goalslist" element={<GoalsList/>}/>
            <Route path="/goalslist/:goalId" element={<GoalDetails/>}/>
           
            <Route path="/goal" element={<GoalForm/>}/>
            <Route path="/goal/:goalId" element={<GoalForm/>}/>

            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/' element={ <Navigate to="/goalslist" /> }/>
        </Routes>
    );
}

export default AppRoutes;