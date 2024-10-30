import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login";
import { Cadastro } from "./pages/cadastro";
import { Layout } from "./components/layout";
import { Private } from "./components/private/private";
import { NoticiasCadastradas } from "./pages/noticasCadastrada";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/cadastro",
        element: (
          <Private>
            <Cadastro />
          </Private>
        ),
      },
      {
        path: "/noticiasCadastradas",
        element: (
          <Private>
            <NoticiasCadastradas />
          </Private>
        ),
      },
    ],
  },
]);

export { router };
