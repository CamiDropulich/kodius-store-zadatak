import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../containers/Home";
import Checkout from "../containers/Checkout";
import UsarContexto from "../context/UsarContexto";
import FinalOrder from "../containers/FinalOrder";

function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
      <BrowserRouter>
        <UsarContexto>
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route
              exact
              path="/checkout"
              element={<Checkout></Checkout>}
            ></Route>
            <Route
              exact
              path="/checkout/final-order"
              element={<FinalOrder></FinalOrder>}
            ></Route>
          </Routes>
        </UsarContexto>
      </BrowserRouter>
    </>
  );
}

export default App;
