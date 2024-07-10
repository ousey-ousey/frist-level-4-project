import Home from "./pages/home/Home.jsx";
import Create from "./pages/create/Creat.jsx";
import { RouterProvider } from "react-router-dom";
import Root from "./pages/Root.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Profile from "./pages/profile/profile.jsx";
import Settingso from "./settings/settings.jsx";
import Erori from "./pages/Erori.jsx";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="Home" element={<Home />} />
      <Route path="Create" element={<Create />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="*" element={<Erori />} />
      <Route path="Settings" element={<Settingso />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={Router} />;
}

export default App;
