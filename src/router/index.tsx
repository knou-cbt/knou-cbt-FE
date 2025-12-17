import { createBrowserRouter } from "react-router-dom"

import App from "@/App"
import { MainContainer } from "@/components"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainContainer />,
      },
      // {
      //   path: "exam",
      //   element: <ExamPage />,
      // },
    ],
  },
])

