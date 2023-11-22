import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './Components/Body';
import OnBoardForm from './Components/OnBoardForm';
import SignInForm from './Components/SignInForm';
import "./index.css";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <SignInForm />
      },
      {
        path: "/onboarduser",
        element: <OnBoardForm />
      }
    ]
  }
])

function App() {
  return (
    <div className="">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;