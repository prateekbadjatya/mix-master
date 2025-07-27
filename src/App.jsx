import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  About,
  Landing,
  Error,
  Newsletter,
  Cocktail,
} from "./pages";
import SinglePageError from "./components/SinglePageError";

//loaders
import { loader as landingLoader } from "./pages/Landing.jsx";
import { loader as singleCocktailLoader } from "./pages/Cocktail.jsx";

//actions
import { action as newsletterAction } from "./pages/Newsletter";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    //all page error render this one if chidren don't do error handling
    errorElement: <Error />,
    children: [
      {
        // path: 'landing',
        index: true, //page to render homelayout whne navigate to http://localhost:5173/
        // pass query client instance tto check data in cached or not if not fetched
        loader: landingLoader(queryClient),
        // single page error
        errorElement: <SinglePageError />,
        element: <Landing />,
      },
      {
        path: "cocktail/:id",
        element: <Cocktail />,
        loader: singleCocktailLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        action: newsletterAction,
        errorElement: <SinglePageError />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <SinglePageError />,
        // children: [
        //   {
        //     index: true,
        //     element: <h2>Our Company</h2>,
        //   },
        //   {
        //     path: "person",
        //     element: <h2>Prateek</h2>,
        //   },
        // ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};
export default App;
