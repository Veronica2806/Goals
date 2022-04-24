import {
    Routes,
    Route,
} from "react-router-dom";
import GoalsList from "./pages/GoalsList";
import Home from "./pages/Home";
import GoalForm from "./pages/GoalForm";
import GoalDetails from "./pages/GoalDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/goalslist" element={<GoalsList/>}/>
            <Route path="/goalslist/:goalId" element={<GoalDetails/>}/>
           
            <Route path="/" element={<Home/>}/>
            <Route path="/goal" element={<GoalForm/>}/>
            <Route path="/goal/:goalId" element={<GoalForm/>}/>
        </Routes>
    );
}

export default AppRoutes;