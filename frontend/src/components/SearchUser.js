import { useEffect, useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiMagnifyingGlassLight } from "react-icons/pi";

import { useDebounce } from "../hooks";
import { Popper } from "./Popper";
import { fetchUserInfo, findUser } from "../app/api";
import { createAxiosRequest } from "../utils/createInstance";
import { $auth } from "../app/selectors";
import { loginSuccess } from "../app/slices/authSlice";
import { UserInfo } from "./UserInfo";
import { UserInfoModal } from "./UserInfoModal";

import "../styles/search_user.scss";

export const SearchUser = () => {
    const { currentUser } = useSelector($auth);

    const [searchUserValue, setSearchUserValue] = useState("");
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);

    const searchUserValueDebounced = useDebounce(searchUserValue, 500);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosJWT = createAxiosRequest(currentUser, dispatch, navigate, loginSuccess);

    const searchId = useId();

    const getUserInfo = async (id) => {
        try {
            const res = await fetchUserInfo(id, axiosJWT);
            setUserInfo(res);
            setShowUserInfoModal(true);
        } catch (error) {}
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (searchUserValueDebounced) {
                    const users = await findUser(searchUserValueDebounced.trim());
                    setUsers(users.filter((user) => user.username !== currentUser.username));
                } else {
                    setUsers([]);
                }
            } catch (error) {}
        };
        fetchUsers();
    }, [currentUser?.username, searchUserValueDebounced]);

    return (
        <div className="search-user px-3 py-2 d-flex">
            <label htmlFor={searchId}>
                <PiMagnifyingGlassLight className="search-icon me-2 fs-4" />
            </label>
            <input
                id={searchId}
                className="search-user-input px-2 w-100"
                type="text"
                value={searchUserValue}
                onChange={(e) => setSearchUserValue(e.target.value)}
                placeholder="Find someone..."
            />
            {users.length > 0 && (
                <Popper className="popper">
                    <div className="user-list">
                        {users.map((user) => (
                            <div key={user._id} className="user-item p-2 d-flex" onClick={() => getUserInfo(user._id)}>
                                <UserInfo
                                    size="medium"
                                    fontWeight="medium"
                                    username={user.username}
                                    avatar={user.avatar}
                                />
                            </div>
                        ))}
                    </div>
                </Popper>
            )}
            <UserInfoModal
                show={showUserInfoModal}
                onHide={() => setShowUserInfoModal(false)}
                {...userInfo}
                axiosJWT={axiosJWT}
            />
        </div>
    );
};
