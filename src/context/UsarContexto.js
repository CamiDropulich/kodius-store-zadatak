import axios from "axios";
import Contexto from "./Context";
import { useState } from "react";

export default function UsarContexto(props) {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [priceEnd, setPriceEnd] = useState(0);
  const [itemsFinales, setItemsFinales] = useState([]);
  const [priceFinales, setPriceFinales] = useState(0);
  const [buyerName, setBuyerName] = useState("");

  const listameProductos = async () => {
    const res = await axios.get(
      "https://kodiusstore-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );

    setProducts(res.data);
    console.log(res.data, "desde usarContexto");
  };

  return (
    <Contexto.Provider
      value={{
        listameProductos,
        priceEnd,
        setPriceEnd,
        itemsFinales,
        setItemsFinales,
        priceFinales,
        setPriceFinales,
        products,
        buyerName,
        setBuyerName,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
