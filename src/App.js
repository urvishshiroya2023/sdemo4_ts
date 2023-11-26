import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Body from "./Components/Body";
import Contacts from "./Components/Contacts";
import Deal from "./Components/Deal";
import HomePage from "./Components/HomePage";
import Leads from "./Components/Leads";
import OnBoardComponent from "./Components/OnBoardComponent";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import SignInComponent from "./Components/SignInComponent";
import TaskDetail from "./Components/TaskDetail";
import TaskForm from "./Components/TaskForm";
import TaskInfo from "./Components/TaskInfo";
import "./index.css";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/signin",
        element: <SignInComponent />,
      },
      {
        path: "/onboarduser",
        element: <OnBoardComponent />,
      },
      {
        path: "/homepage",
        element: <HomePage />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/leads",
        element: <Leads />,
      },
      {
        path: "/deal",
        element: <Deal />,
      },
      {
        path: "/taskdetail",
        element: <TaskDetail />,
      },
      {
        path: "/addtask",
        element: <TaskForm />,
      },
      {
        path: "/taskdetails/:id",
        element: <TaskInfo />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/taskdetail" element={<TaskDetail />} />
            <Route path="/deal" element={<Deal />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/contacts" element={<Contacts />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </div>
  );
}

export default App;
