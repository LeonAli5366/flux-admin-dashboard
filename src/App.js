import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Toaster } from "react-hot-toast";
import HomeTopSec from "./page/Home/HomeTopSec";

import CreateProduct from "./page/Product/CreateProduct";
import AllProduct from "./page/Product/AllProduct";
import UpdateProduct from "./page/Product/UpdateProduct";

import CreateStory from "./page/OurStory/CreateStory";
import UpdateStory from "./page/OurStory/UpdateStory";
import AllStory from "./page/OurStory/AllStory";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Toaster position="top-center" reverseOrder={false} />
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />

              {/* Product Route*/}
              <Route path="/allproduct" element={<AllProduct />} />
              <Route path="/createproduct" element={<CreateProduct />} />
              <Route path="/updateproduct/:slug" element={<UpdateProduct />} />

              {/* Our Story */}
              <Route path="/allstory" element={<AllStory/>} />
              <Route path="/createstory" element={<CreateStory />} />
              <Route path="/updatestory/:slug" element={<UpdateStory />} />

              {/* Home Page All Route */}
              <Route path="/hometopsec" element={<HomeTopSec />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
