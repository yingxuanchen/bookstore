package com.demo.bookstore.service;

import com.demo.bookstore.dto.BookDTO;
import com.demo.bookstore.dto.PurchaseRequest;
import com.demo.bookstore.entity.Book;
import com.demo.bookstore.entity.Purchase;
import com.demo.bookstore.entity.Rating;
import com.demo.bookstore.entity.User;
import com.demo.bookstore.repository.BookRepository;
import com.demo.bookstore.repository.PurchaseRepository;
import com.demo.bookstore.repository.UserRepository;
import com.demo.bookstore.util.RandomUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepo;
    //    private final BookElasticRepository bookElasticRepo;
    private final UserRepository userRepo;
    private final PurchaseRepository purchaseRepo;

    public Page<Book> findBooks(String searchInput, Pageable pageable) {
//        return bookRepo.findByTitleLikeIgnoreCase(searchInput, pageable);

        if (searchInput.isBlank()) {
            return bookRepo.findAll(pageable);
        } else {
            TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchInput);
            Pageable pageAndSort = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("score"));
            return bookRepo.findAllBy(criteria, pageAndSort);
        }
    }

//    public Page<BookElastic> findBooksElastic(String searchInput, Pageable pageable) {
//        return bookElasticRepo.findByTitleContaining(searchInput, pageable);
//    }

    public void addBook(BookDTO bookDTO) {
        Book book = new Book();
        book.setTitle(bookDTO.title());
        book.setAuthor(bookDTO.author());
        book.setDescription(bookDTO.description());
        book.setYearOfPublish(bookDTO.yearOfPublish());
        book.setBookLanguage(bookDTO.bookLanguage());
        book.setCategories(bookDTO.categories());
        book.setTags(bookDTO.tags());
        book.setPrice(bookDTO.price());
        book.setSoldCount(0);
        book.setRating(new Rating(0, 0));
        book.setContent("Once upon a time, there was a wizard who didn't know he is a wizard.");
        book.setCreatedBy("someone");
        bookRepo.save(book);
    }

    public Purchase buyBook(PurchaseRequest req, String username) {
        Book book = bookRepo.findById(req.bookId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid book"));

        if (!book.getPrice().equals(req.price())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid book price");
        }

        if (purchaseRepo.findByUsernameAndBookId(username, book.getId()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have bought this book already");
        }

        // verify card number, expiry, cvv are valid

        if (req.toSaveCard()) {
            User.PaymentMethod existing = userRepo.findPaymentMethod(username, req.cardNumber(), req.cardExpiry());

            if (existing == null) {
                User.PaymentMethod paymentMethod = new User.PaymentMethod();
                paymentMethod.setMethod("creditCard");
                paymentMethod.setCardNumber(req.cardNumber());
                paymentMethod.setCardExpiry(req.cardExpiry());

                userRepo.updatePaymentMethodByUsername(username, paymentMethod);
            }
        }

        Purchase.Payment payment = new Purchase.Payment();
        payment.setTransactionId(RandomUtil.randomString(7));
        payment.setMethod("creditCard");
        payment.setCardNumber(req.cardNumber());

        Purchase purchase = new Purchase();
        purchase.setPayment(payment);
        purchase.setAmount(req.price());
        purchase.setBook(new Purchase.Book(book.getId(), book.getTitle()));
        purchase.setUsername(username);

        purchaseRepo.save(purchase);

        return purchase;
    }
}
