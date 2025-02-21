import { MongoClient } from "mongodb";
import { books, categories, languages, sellers } from "./data.js";
import { text } from "./randomText.js";

const client = new MongoClient(process.env.DB_URI);

const wordList = text.replaceAll("\n", " ").toLowerCase().split(" ");
const wordListCount = wordList.length;

async function insertBook(book) {
  const lang = languages[getRandomInt(0, languages.length)];

  const numOfCats = getRandomInt(1, 4);
  let cats = [];
  for (let i = 0; i < numOfCats; i++) {
    const cat = categories[getRandomInt(0, categories.length)];
    cats.push(cat);
    cats = [...new Set(cats)];
  }

  const seller = sellers[getRandomInt(0, sellers.length)];

  const yearOfPublish = getRandomInt(1950, 2025);
  const createdDate = getRandomDate(new Date(Math.max(yearOfPublish, 2020), 1, 1), new Date());
  const updatedDate = getRandomInt(0, 2) === 0 ? createdDate : getRandomDate(createdDate, new Date());

  book = {
    title: book.title,
    author: book.author,
    description: generateDescription(),
    yearOfPublish: yearOfPublish,
    bookLanguage: lang,
    categories: cats,
    tags: book.tags,
    price: getRandomPrice(3.99, 50),
    soldCount: getRandomInt(0, 100000),
    rating: getRandomInt(0, 10) === 0 ? -1 : getRandomRating(0, 10),
    content: generateContent(),
    createdBy: seller,
    createdAt: createdDate,
    updatedAt: updatedDate,
  };

  await client.db().collection("book").insertOne(book);
}

function generateDescription() {
  const wordCount = getRandomInt(10, 21);
  const words = [];

  for (let i = 0; i < wordCount; i++) {
    const index = getRandomInt(0, wordListCount);
    let word = wordList[index];
    if (i === 0) {
      word = toTitleCase(word);
    }
    words.push(word);
  }

  return words.join(" ");
}

function generateContent() {
  const wordCount = getRandomInt(100, 201);
  const words = [];
  let isFirstWord = true;

  for (let i = 0; i < wordCount; i++) {
    const index = getRandomInt(0, wordListCount);
    let word = wordList[index];

    if (isFirstWord) {
      word = toTitleCase(word);
      isFirstWord = false;
    }

    const isLastWord = getRandomInt(0, 10) === 0;
    if (isLastWord) {
      word += ".";
      isFirstWord = true;
    }

    words.push(word);
  }

  return words.join(" ");
}

function toTitleCase(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function getRandomRating(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(1));
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  try {
    await client.connect();

    for (const lang of languages) {
      const result = await client.db().collection("language").findOne({ name: lang });
      if (result == null) {
        await client.db().collection("language").insertOne({ name: lang });
      }
    }

    for (const cat of categories) {
      const result = await client.db().collection("category").findOne({ name: cat });
      if (result == null) {
        await client.db().collection("category").insertOne({ name: cat });
      }
    }

    for (const book of books) {
      await insertBook(book);
      console.log(`Inserted ${book.title}`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();
