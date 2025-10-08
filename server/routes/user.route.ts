import express from "express";
import {
    activateUser,
    deleteUser,
    GettingAllUsers,
    getUserInfo,
    LoginUser,
    logoutUser,
    registrationUser,
    socialAuth,
    updateAccessToken,
    updateAccessTokenController,
    updatePassword,
    updateProfile,
    updateUserInfo,
    updateUserRole,
} from "../controller/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const UserRouter = express.Router();

UserRouter.post("/registration", registrationUser);
UserRouter.post("/activate-user", activateUser);

UserRouter.post("/login", LoginUser);
UserRouter.get("/logout", isAuthenticated, logoutUser);
UserRouter.get("/refresh", updateAccessTokenController);

UserRouter.get("/me",updateAccessToken, isAuthenticated, getUserInfo);

UserRouter.post("/social-auth", socialAuth);

UserRouter.put("/update-user-info",updateAccessToken, isAuthenticated, updateUserInfo);

UserRouter.put("/update-user-password",updateAccessToken,isAuthenticated,updatePassword);

UserRouter.put("/update-user-avatar",updateAccessToken,isAuthenticated,updateProfile);

UserRouter.get('/get-users',updateAccessToken,isAuthenticated,authorizeRoles('admin'),GettingAllUsers)

UserRouter.put('/update-users-role',updateAccessToken,isAuthenticated,authorizeRoles('admin'),updateUserRole)

UserRouter.delete("/delete-user/:id",isAuthenticated,authorizeRoles("admin"),deleteUser)


export default UserRouter;
