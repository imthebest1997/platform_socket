import { Navigate, Route, Routes } from "react-router-dom";

import { Courses } from "../components/Courses/Courses";
import { InfoTask } from "../pages/Tasks/InfoTask";
import { NotificationProvider } from "../context/NotificationContext";
import { Profile } from "../components/Profile/Profile";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import {SocketProvider} from "../context/SocketContext"
import { Tasks } from "../pages/Tasks/Tasks";
import { getToken } from "../helpers/helpers";

export const AppRoutes = () => {
  return (
    <SocketProvider>
      <NotificationProvider>
        <Routes>
            <Route
              path="/"
              element={getToken() ? <Tasks /> : <Navigate to="/signin" />}
            />
            <Route path="/tasks" element={<Courses />} />
            <Route path="/info-task" element ={<InfoTask/>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/profile"
              element={getToken() ? <Profile /> : <Navigate to="/signin" />}
            />
        </Routes>
      </NotificationProvider>      
    </SocketProvider>
  );
};
