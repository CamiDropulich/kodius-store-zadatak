import Header from "../components/Header";
import Main from "../components/Main";
import Basket from "../components/Basket";
import { useState, useContext, useEffect } from "react";
import Contexto from "../context/Context";
import Swal from "sweetalert2";

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
  const [delProd1, setDelProd1] = useState(0);
  const [delProd2, setDelProd2] = useState(0);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    const prodcod1 = products.find((z) => z.id === "07");
    const prodcod2 = products.find((z) => z.id === "06");
    const exist1 = cartItems.find((h) => h.id === "07");
    const exist2 = cartItems.find((j) => j.id === "06");

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    if (exist.qty === 1 && product.id == "04") {
      setCartItems([...cartItems, { ...prodcod1, qty: 1 }]);
      setDelProd1(delProd1 + 1);
      Swal.fire({
        position: "top-end",
        iconColor: "#238ccd",
        color: "#494949",
        icon: "success",
        title: "Pack: 2x EUR 35.00",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (exist.qty === 2 && product.id === "02") {
      setCartItems([...cartItems, { ...prodcod2, qty: 1 }]);
      setDelProd2(delProd2 + 1);
      Swal.fire({
        position: "top-end",
        iconColor: "#238ccd",
        color: "#494949",
        icon: "success",
        title: "Pack: 3x EUR 65.00",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (exist.id === "04" && exist.qty === 1 && exist1.id === "07") {
      setCartItems(
        cartItems.map((x) =>
          x.id === exist1.id ? { ...exist1, qty: exist1.qty + 1 } : x
        )
      );
    } else if (exist.id === "02" && exist.qty === 2 && exist2.id === "06") {
      setCartItems(
        cartItems.map((x) =>
          x.id === exist2.id ? { ...exist2, qty: exist2.qty + 1 } : x
        )
      );
    }
  };

  useEffect(() => {
    setCartItems(cartItems.filter((x) => x.id !== "04"));
  }, [delProd1]);
  useEffect(() => {
    setCartItems(cartItems.filter((x) => x.id !== "02"));
  }, [delProd2]);

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
