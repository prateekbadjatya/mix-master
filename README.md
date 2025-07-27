

Cocktail.jsx

```js
import { useQuery } from '@tanstack/react-query';
import Wrapper from '../assets/wrappers/CocktailPage';
import { useLoaderData, Link } from 'react-router-dom';
import axios from 'axios';

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleCocktailQuery(id));
  // rest of the code
};
```

#### Redirects

- in public folder create "\_redirects"

```
/* /index.html 200
```
