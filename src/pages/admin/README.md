# Logic Admin Order And Borrows

## Admin Order

### First the user will request to borrow the book and this request will make a new order with status pending. Admin can see the detail of user order at `EditOrderPage.jsx`. Theres 2 options for admin, admin can just **approve** the order which mean it doesnt make the book status `BORROWED` yet and just create a borrow data become null status. Option 2 admin can **Start Borrow** the order, this event will create a borrow data with `BORROWED` status and make the book status becom `BORROWED` to.
