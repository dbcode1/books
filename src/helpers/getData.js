import axios from "axios";

// TODO: error handling with toastify or custom module
export async function getData(url) {
  try {
    const response = await axios.get(url);
    console.log(response)
    const formatted = response.data.results.books;
    return formatted;
  } catch (error) {
    alert(error);
  }
}

export async function getText(url) {
  try {
    const response = await axios.get(url);
    console.log(response)
    return response;
  } catch (error) {
    alert(error);
  }
}

export async function getLibraryData(title) {
  // get title
  const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.REACT_APP_GOOGLE_KEY}`;
}
