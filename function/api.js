import { apiBasePath } from "../utils/constant";

export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


const isSpace = (char) => /\s/.test(char);



export function countWords(content = '  ', limit) {
  // console.log('in side api function --->><><><><><><<<<>>>><<<<>>> ---- content', content)
  let currentWord = 0;
  let inTag = false;
  let substring = "";

  for (const char of content) {
    if (isSpace(char) && !inTag) {
      currentWord++;
    } else if (char === '<') {
      inTag = true;
    } else if (char === '>') {
      inTag = false;
    }

    if (currentWord <= limit) {
      substring += char;

    }

    if (currentWord === limit) {
      // Handle substring or other logic
      break;
    }
  }


  // Use the loop variable 'wordCount' directly

  return substring; // Consider character length for non-BMP characters
}




export function replaceUnderscoresWithSpaces(str) {
  if(!str) return;
  str = str?.replace(/_/g, ' ');

  const dotIndex = str?.indexOf('.');
  if (dotIndex !== -1) {
    str = str?.substring(0, dotIndex);
  }

  return str;
}



export function generateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


