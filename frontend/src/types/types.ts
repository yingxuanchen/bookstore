export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  yearOfPublish: number;
  bookLanguage: string;
  categories: string[];
  tags: string[];
  price: number;
  soldCount: number;
  rating: Rating;
  createdBy: string;
}

export interface Rating {
  average: number;
  reviews: number;
}

export interface BookForm {
  title: string;
  author: string;
  description: string;
  yearOfPublish: number;
  bookLanguage: string;
  categories: string[];
  tags: string[];
  price: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface SignupForm {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  isSeller: boolean;
}

// export interface Category {
//   name: string;
// }

// export interface Language {
//   name: string;
// }

export interface CreditCardForm {
  cardNumber: string;
  cardExpiry: string;
  cvv: number;
}
