import { Provider } from "react-redux";
import Body from "./components/Body";
import AppStore from "./utils/AppStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";

function App() {
  return (
    <Provider store={AppStore}>
      <Body/>
      </Provider> 
  );
}

export default App;
