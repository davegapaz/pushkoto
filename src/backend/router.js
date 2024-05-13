import { getRegisteredUser, getAllUser,logIn, addUser, deleteUser, editUserCart} from './user-controller.js';
import { getProduct, getProductByid, addProduct, deleteProduct, updateProduct } from './products-controller.js';
import { getTransaction, getTransactionByid, addTransaction, deleteTransaction } from './transaction-controller.js';

export default function router(app) {

	// Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  })

  //USER
  app.get("/get-user", getRegisteredUser);
  app.get("/get-all-user", getAllUser);
  app.post("/login", logIn);
  app.post("/add-user", addUser);
  app.post("/delete-user", deleteUser);
  app.post("/editUserCart", editUserCart);

  //PRODUCTS
  app.get("/get-product", getProduct);
  app.get("/get-product-by-code", getProductByid);
  app.post("/add-product", addProduct);
  app.post("/delete-product", deleteProduct);
  app.post("/update-product", updateProduct);


  //TRANSACTIONS
  app.get("/get-transaction", getTransaction);
  app.get("/get-transaction-by-code", getTransactionByid);
  app.post("/add-transaction", addTransaction);
  app.post("/delete-transaction", deleteTransaction);
}