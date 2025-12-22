import { createBrowserRouter } from "react-router-dom"

import App from "@/App"
import { MainContainer } from "@/components"
import { ExamYearPage, MemorizeModePage, TestModePage } from "@/routes"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainContainer />,
      },
      {
        path: "exam/:subjectId/year",
        element: <ExamYearPage />,
      },
      {
        path: "exam/:subjectId/:year/memorize-mode",
        element: <MemorizeModePage />,
      },
      {
        path: "exam/:subjectId/:year/test-mode",
        element: <TestModePage />,
      },
    ],
  },
])

