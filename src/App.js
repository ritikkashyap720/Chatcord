import { Details } from "./pages/Details";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration.ts";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="details" element={<Details/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

serviceWorkerRegistration.register();
export default App;
