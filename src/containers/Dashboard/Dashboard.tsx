import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../api/axiosWrapper";
import Cookies from "js-cookie";
import { IUserContext, UserContext } from "../../context/Context";

const Dashboard = () => {
  const [user, setUser] = useState<IUserContext>({
    firstName: "",
    lastName: "",
  });
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove("token");
    history.push("/");
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      history.push("/login");
    }
  }, [history]);

  useEffect(() => {
    const { firstName, lastName } = user;
    if (!firstName || !lastName) {
      getUserData();
    }
  }, [user]);

  function getUserData() {
    axios
      .get("/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <UserContext.Provider value={user}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div
            id="navbarTogglerDemo02"
            className="d-flex justify-content-between w-100 "
          >
            <div>
              <span className="m-1">{user.firstName}</span>
              <span>{user.lastName}</span>
            </div>
            <div>
              <ul className="navbar-nav ml-auto">
                <li
                  className="nav-item cursor-pointer"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </UserContext.Provider>
  );
};

export default Dashboard;
