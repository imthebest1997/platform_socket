import { Navigate, Route, Routes } from "react-router-dom";

import { Profile } from "../components/Profile/Profile";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";
import { Tasks } from "../components/Tasks/Tasks";
import { getToken } from "../helpers/helpers";

// import {SocialCards} from "../components/SocialCards/SocialCards";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={getToken() ? <Tasks /> : <Navigate to="/signin" />}
      />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/profile"
        element={getToken() ? <Profile /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};
