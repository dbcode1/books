import axios from "axios";

// TODO: error handling with toastify or custom module
export async function getData(url) {
  console.log("getData");
  try {
    const response = await axios.get(url);
    console.log(response);
    const formatted = response.data.results.books;
    return formatted;
  } catch (error) {
    alert(error);
  }
}

export async function getText(url) {
  console.log("getText");
  try {
    const response = await axios.get(url);
    console.log(response)
    return response;

    
  } catch (error) {
    alert(error);
  }
}

export async function getSummary(title, showData, setShowData) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.REACT_APP_GOOGLE_KEY}`;
  const response = await getText(url);
  const description = response.data.items[0].volumeInfo.description;
  //setShowData({ ...showData, description: description });
  // move to each page after calling function
}

export async function getLibraryData(title) {
  // get title
  const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.REACT_APP_GOOGLE_KEY}`;
}
