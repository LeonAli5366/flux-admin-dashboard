import { useContext, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Invoices from "./scenes/invoices";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Toaster } from "react-hot-toast";

import CreateProduct from "./page/Product/CreateProduct";
import AllProduct from "./page/Product/AllProduct";
import UpdateProduct from "./page/Product/UpdateProduct";

import CreateStory from "./page/OurStory/CreateStory";
import UpdateStory from "./page/OurStory/UpdateStory";
import AllStory from "./page/OurStory/AllStory";
import { AuthContext } from "./page/ContextApi/UserContex";
import { ClockLoader } from "react-spinners";
import ChangePass from "./page/AdminProfile/ChangePass";
import ChangeEmail from "./page/AdminProfile/ChangeEmail";
import Form from "./page/AdminProfile/Form";
import ChangeUserName from "./page/AdminProfile/ChangeUserName";

function App() {
  const { user, adminLogin, loading } = useContext(AuthContext);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    adminLogin(email, password)
      .then((result) => {
        const user = result.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          {loading ? (
            <div className="flex justify-center py-[20vh]">
              <ClockLoader color="#36d7b7" size={500} />
            </div>
          ) : (
            <div>
              <div>
                {user?.uid ? (
                  <div className="app">
                    <Toaster position="top-center" reverseOrder={false} />
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <Topbar setIsSidebar={setIsSidebar} />
                      <Routes>
                        {/* Admin Profile */}
                        <Route path="/invoices" element={<Invoices />} />
                        <Route path="/changepass" element={<ChangePass />} />
                        <Route path="/changeemail" element={<ChangeEmail />} />
                        <Route path="/profile" element={<Form />} />
                        <Route path="/userName" element={<ChangeUserName />} />

                        {/* Product Route*/}
                        <Route path="/" element={<AllProduct />} />
                        <Route
                          path="/createproduct"
                          element={<CreateProduct />}
                        />
                        <Route
                          path="/updateproduct/:slug"
                          element={<UpdateProduct />}
                        />

                        {/* Our Story */}
                        <Route path="/allstory" element={<AllStory />} />
                        <Route path="/createstory" element={<CreateStory />} />
                        <Route
                          path="/updatestory/:slug"
                          element={<UpdateStory />}
                        />
                      </Routes>
                    </main>
                  </div>
                ) : (
                  <div className="mx-auto">
                    <div className="hero min-h-screen ">
                      <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-[500px]">
                          <form
                            onSubmit={handleAdminLogin}
                            className="card-body text-[#141b2d]">
                            <div className="form-control ">
                              <h1 className="text-[#141b2d] text-5xl font-bold text-center mb-5">
                                ADMIN LOGIN
                              </h1>
                              <label className="label">
                                <span className="label-text">Email</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                              />
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Password</span>
                              </label>
                              <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                              />
                              <label className="label">
                                <Link
                                  href="#"
                                  className="label-text-alt link link-hover mt-1">
                                  Forgot password?
                                </Link>
                              </label>
                            </div>
                            <div>
                              <h1 className="text-red-600">{error}</h1>
                            </div>
                            <div className="form-control mt-6">
                              <button type="submit" className="btn btn-primary">
                                Login
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
