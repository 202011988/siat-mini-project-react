import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import Root from "./screens/root";
import Todo from "./screens/task";
import Step from "./screens/step";

const router = createBrowserRouter([
  // AUTH
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // APP
  // {
  //   path: "/",
  //   element: <Root />,
  //   children: [
  //     {
  //       path: "projects/:projectId",
  //       element: <Main />,
  //       // children: [
  //       //   {
  //       //     path: "tasks/:taskId",
  //       //     element: <Tasks />,
  //       //   },
  //       // ],
  //     },
  //   ],
  // },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "projects/:projectId",
        element: <Todo />,
        children: [
          {
            path: "tasks/:taskId",
            element: <Step />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
  // const AuthRouter = () => (
  //   <Routes>
  //     <Route path="/signin" element={<Signin />} />
  //     <Route path="/signup" element={<Signup />} />
  //   </Routes>
  // );
  //
  // const MainRouter = () => (
  //   <Routes>
  //     <Route path="/" element={<RootScreen2 />} />
  //
  //     <Route path="/" element={<Root />}>
  //       <Route path="projects/:projectId" element={<Main />} />
  //       {/*<Route path='tasks/:taskId' element={<Tasks/>}/>*/}
  //     </Route>
  //   </Routes>
  // );
  //
  // const ErrorRouter = () => (
  //   <Routes>
  //     <Route path="*" element={<NotFoundPage />} />
  //   </Routes>
  // );

  // return (
  //   <div className="App">
  //     {/*<MainRouter />*/}
  //     {/*<AuthRouter />*/}
  //     {/*<ErrorRouter />*/}
  //   </div>
  // );
}

export default App;
