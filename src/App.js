import "./App.css";
import MainRoutes from "./MainRoutes";
import AuthContextProvider from "../src/Account/AuthContextProvider";
import Navbar from "../src/Account/Componets/Navbar";
import PoductContextProvider from "./Pages/HomePage/ProductContextProvider";
import SavedContextProvider from "./Pages/SavedPage/SavedContextProvider";

function App() {
  return (
    <>
      <SavedContextProvider>
        <PoductContextProvider>
          <AuthContextProvider>
            <MainRoutes />
          </AuthContextProvider>
        </PoductContextProvider>
      </SavedContextProvider>
    </>
  );
}

export default App;
