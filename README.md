# Deployed URL

[Story Book](https://story-book-drscripts.netlify.app/)

# Logic Admin Order And Borrows

## Admin Order

First the user will request to borrow the book and this request will make a new order with status pending. Admin can see the detail of user order at `EditOrderPage.jsx`. Theres 2 options for admin, admin can just **approve** the order which mean it doesnt make the book status `BORROWED` yet and just create a borrow data become null status. Option 2 admin can **Start Borrow** the order, this event will create a borrow data with `BORROWED` status and make the book status becom `BORROWED` to.

## Admin Borrow

In `DetailBorrowPage.jsx` admin will have some event **Start Borrow** event / button will appear when the borrow data status was `null` this event will update the borrow status become `BORROWED` and the **book status** to. Second event / button **Start Return** will appear when the borrow status was `BORROWED` and will calculate the `dueDate` data with `new Date()` or date today to get the differrence of days which mean will canculate the `penaltyDays` and update the status corresponding to penaltyDays if there any penaltyDays status was `OVER_DUE` or not the status will `ON_TIME`.
