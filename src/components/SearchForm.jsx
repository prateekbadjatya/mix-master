import { Form, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/SearchForm';
import { axiosInstance } from '../utils/customInstance';








// const url = new URL(request.url);
// This line of code creates a new URL object using the URL constructor. The URL object represents a URL and provides methods and properties for working with URLs. In this case, the request.url is passed as an argument to the URL constructor to create a new URL object called url.

// The request.url is an input parameter representing the URL of an incoming HTTP request. By creating a URL object from the provided URL, you can easily extract specific components and perform operations on it.

// const searchTerm = url.searchParams.get('search') || '';
// This line of code retrieves the value of the search parameter from the query string of the URL. The searchParams property of the URL object provides a URLSearchParams object, which allows you to access and manipulate the query parameters of the URL.

// The get() method of the URLSearchParams object retrieves the value of a specific parameter by passing its name as an argument. In this case, 'search' is passed as the parameter name. If the search parameter exists in the URL's query string, its value will be assigned to the searchTerm variable. If the search parameter is not present or its value is empty, the expression '' (an empty string) is assigned to searchTerm using the logical OR operator (||).



export const loader = async ({ request }) => {
  const url = new URL(request.url);
// automatically add query params done by form in get method
  const searchTerm = url.searchParams.get('search') || '';
  const response =  await axiosInstance(`/search.php?s=${searchTerm}`);
  return { drinks: response.data.drinks, searchTerm };
};

const SearchForm = ({searchTerm}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form className='form'>
        <input
          type='search'
          name='search'
          className='form-input'
          defaultValue={searchTerm}
        />
        <button type='submit' className='btn' disabled={isSubmitting}>
          {isSubmitting ? 'searching...' : 'search'}
        </button>
      </Form>
    </Wrapper>
  );
};

export default SearchForm;