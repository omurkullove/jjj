import "./App.css";
import MainRoutes from "./MainRoutes";
import AuthContextProvider from "../src/Account/AuthContextProvider";

function App() {
  return (
    <>
      <AuthContextProvider>
        <MainRoutes />
      </AuthContextProvider>
    </>
  );
}

export default App;
