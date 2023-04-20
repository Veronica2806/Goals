import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import GoalsList from "../pages/application/GoalsList";
import GoalCreate from "../pages/application/GoalCreate/GoalCreate";
import GoalDetails from "../pages/application/GoalDetails/GoalDetails";
import Registration from "../pages/auth/registration/Registration";
import Login from "../pages/auth/login/Login";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/goalslist/:folderId" element={<GoalsList/>}/>
            <Route path="/goalslist" element={<GoalsList/>}/>
            <Route path="/goal/:goalId" element={<GoalDetails/>}/>
            <Route path="/goal" element={<GoalCreate/>}/>

            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/' element={ <Navigate to="/goalslist" /> }/>
        </Routes>
    );
}

export default AppRoutes;