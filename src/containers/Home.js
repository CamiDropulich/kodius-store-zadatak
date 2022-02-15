import Header from "../components/Header";
import Main from "../components/Main";
import Basket from "../components/Basket";
import { useState, useContext, useEffect } from "react";
import Contexto from "../context/Context";

export default function Home() {
  const ctx = useContext(Contexto);

  //Calling the data base (products) from the context

  useEffect(() => {
    ctx.listameProductos();
    console.log(ctx.estado, "desde Home");
  }, []);

  //Adding and removing products from Home to basket

  const products = ctx.products;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  //Setting the basket items in the context to be re-used in Checkout

  useEffect(() => {
    ctx.setItemsFinales(cartItems);
  }, [cartItems]);

  return (
    <>
      <div className="App">
        <Header countCartItems={cartItems.length}></Header>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Main products={products} onAdd={onAdd}></Main>
            </div>
            <div className="col-md-4">
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
              ></Basket>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
