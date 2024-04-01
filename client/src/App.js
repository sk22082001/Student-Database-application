/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import User from "./components/getStudent/Student";
import Add from "./components/addStudent/Add";
import Edit from "./components/updateStudent/Edit";

function App() {
  const route = createBrowserRouter([
    {
      path: "/add",
      element: <User />,
    },
    {
      path: "/",
      element: <Add />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
