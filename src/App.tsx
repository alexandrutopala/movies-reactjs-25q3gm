import React from 'react';
import MovieListPage from './pages/MovieListPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <MovieListPage/>,
    path: "/",
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App;
