import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Header(props) {
  let navigate = useNavigate();
  let getLoginDetails = () => {
    // read local storage
    let logToken = localStorage.getItem("logToken");

    if (logToken == null) {
      return false;
    } else {
      try {
        let decodeLogToken = jwtDecode(logToken);

        return decodeLogToken;
      } catch (error) {
        //remove from local storage
        localStorage.removeItem("logToken");
        return false;
      }
    }
  };
  let logOut = () => {
    let doLogOut = window.confirm("Do you want to logout?");
    if (doLogOut == true) {
      localStorage.removeItem("logToken");
      window.location.assign("/");
    }
  };
  let [user, setUser] = useState(getLoginDetails());
  let onSuccess = (response) => {
    let token = response.credential;
    // local storage 5mb to 10mb
    localStorage.setItem("logToken", token);
    // on login redirect
    window.location.assign("/");
  };

  let onError = () => {
    console.log("Login Failed");
  };
  return (
    <>
      <GoogleOAuthProvider clientId="757702982869-ll6f9qh814ovj37ce8ubqplgn2inmaod.apps.googleusercontent.com">
        <section className="row m-0">
          <header
            className={`  d-flex justify-content-between align-items-center col-12 ${props.bg} p-1 `}
          >
            {/* <!-- Brand icon or logo --> */}
            <div>
              {props.bg ? (
                <p
                  onClick={() => {
                    navigate("/");
                  }}
                  className="fs-3 fw-bold d-flex justify-content-center align-items-center my-1 ms-lg-5 py-2 py-lg-1 text-danger px-3  bg-light rounded rounded-circle ms-3"
                >
                  e!
                </p>
              ) : null}
            </div>
            <div>
              {/* <!-- Account area --> */}
              {user === false ? (
                <button
                  className="btn btn-outline-light my-auto me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#google-login"
                >
                  Login
                </button>
              ) : (
                <>
                  <span className="my-auto mx-2 text-white fw-bold">
                    Welcome, {user.name}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-light ms-2"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </header>
        </section>
        {/* login model */}
        <div
          className="modal fade"
          id="google-login"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-1">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />;
              </div>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
export default Header;
