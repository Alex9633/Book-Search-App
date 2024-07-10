import { IBook } from "../interfaces/IBook";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}

// Fuction to read and parse a .csv file into an array of book objects
const readCSV = async (csvFilePath: string): Promise<Book[]> => {
  const response = await fetch(csvFilePath);
  const data = await response.text();
  const lines = data.split('\n');
  const books: Book[] = lines.slice(1).map(line => {
    const values = line.split(',');
    const book: Book = {
      id: Number(values[0]),
      title: values[1],
      author: values[2],
      genre: values[3]
    };
    return book;
  });
  return books;
};

// Fuction to read and parse a .json file into an array of book objects
const readJSON = async (jsonFilePath: string): Promise<Book[]> => {
  const response = await fetch(jsonFilePath);
  const data = await response.json();
  return data;
};

// Fuction to remove duplicate books with identical IDs
const removeDuplicates = (array: IBook[]) => {
  return array.reduce((accumulator, currentValue) => {
      if (!accumulator.some(book => book.id === currentValue.id)) {
          accumulator.push(currentValue);
      }
      return accumulator;
  }, [] as IBook[]);
}

// Fuction to merge the data from the .csv and .json files
const mergeData = async (csvFilePath: string, jsonFilePath: string): Promise<Book[]> => {
  try {
    const csvData = await readCSV(csvFilePath);
    const jsonData = await readJSON(jsonFilePath);

    const mergedData: Book[] = [...csvData, ...jsonData];
    return removeDuplicates(mergedData);
  } catch (error) {
    console.error('Error merging data:', error);
    return [];
  }
};

export { mergeData, Book };