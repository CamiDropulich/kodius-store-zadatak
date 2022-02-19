import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Contexto from "../context/Context";
import { Link } from "react-router-dom";
import "../assets/css/Checkout.css";
import Back from "../assets/statics/volver.png";
import { useForm } from "react-hook-form";

export default function Checkout2() {
  //const info in fields
  const [userNameValue, setUserNameValue] = useState("");
  const [btnActive2, setBtnActive2] = useState(false);

  const [inputName, setInputName] = useState(false);
  const [inputEmail, setInputEmail] = useState(false);
  const [inputStreet, setInputStreet] = useState(false);
  const [inputStreetN, setInputStreetN] = useState(false);
  const [inputCity, setInputCity] = useState(false);
  const [inputCountry, setInputCountry] = useState(false);
  const [inputZip, setInputZip] = useState(false);
  const [inputHolder, setInputHolder] = useState(false);
  const [inputCardNumber, setInputCardNumber] = useState(false);
  const [inputMonth, setInputMonth] = useState(false);
  const [inputYear, setInputYear] = useState(false);
  const [inputCvv, setInputCvv] = useState(false);
  const [btnActive1, setBtnActive1] = useState(true);

  const ctx = useContext(Contexto);

  //Validating input fields

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (values) => {
    setBtnActive2(true);
    setInputName(true);
    setInputEmail(true);
    setInputStreet(true);
    setInputStreetN(true);
    setInputCity(true);
    setInputCountry(true);
    setInputZip(true);
    setInputHolder(true);
    setInputCardNumber(true);
    setInputMonth(true);
    setInputYear(true);
    setInputCvv(true);
    setBtnActive1(false);
    console.log(values);
    // Creating a JSON to save buyers info (maybe needed in future)
    //idea would be to send info to a required database
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(values)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  //Setting the name of the buyer to be used in Final Order

  useEffect(() => {
    ctx.setBuyerName(userNameValue);
  }, [userNameValue]);

  return (
    <>
      <div className="row btn-back">
        <Link to="/">
          <img className="btn-volver" src={Back} alt="" />
        </Link>
      </div>

      <div className="container main-container">
        <div className="row">
          <div className="col-md-6 cont-details">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4>Complete your details:</h4>
              <hr className="hr" />
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <p>Name</p>
                    <input
                      disabled={inputName}
                      name="name"
                      className="input-name"
                      type="text"
                      {...register("name", {
                        required: "Required",
                      })}
                      onChange={(e) => {
                        const userNameValue = e.target.value;
                        setUserNameValue(userNameValue);
                      }}
                    />
                    <span className="text-danger text-small d-block mb-2">
                      {errors.name && errors.name.message}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <p>Email</p>
                    <input
                      disabled={inputEmail}
                      name="email"
                      className="input-email"
                      type="email"
                      {...register("email", {
                        required: "Required",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,4}$/,
                          message: "Invalid email",
                        },
                      })}
                    />
                    <span className="text-danger text-small d-block mb-2">
                      {errors.email && errors.email.message}
                    </span>
                  </div>
                </div>
              </div>
              <h6>Address</h6>
              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <p>Street</p>
                    <input
                      disabled={inputStreet}
                      name="street"
                      type="text"
                      {...register("street", {
                        required: "Required",
                      })}
                    />
                    <span className="text-danger text-small d-block mb-2">
                      {errors.street && errors.street.message}
                    </span>
                  </div>
                  <div className="col-md-6 div-number">
                    <p>Number</p>
                    <input
                      disabled={inputStreetN}
                      type="number"
                      name="streetNumber"
                      {...register("streetNumber", {
                        required: "Required",
                      })}
                    />
                    <span className="text-danger text-small d-block mb-2">
                      {errors.streetNumber && errors.streetNumber.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <p>City</p>
                    <input
                      disabled={inputCity}
                      type="text"
                      name="city"
                      {...register("city", {
                        required: "Required",
                      })}
                    />
                    <span className="text-danger text-small d-block mb-2">
                      {errors.city && errors.city.message}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <p>Country</p>
                    <input
                      disabled={inputCountry}
                      type="text"
                      name="country"
                      {...register("country", {
                        required: "Required",
                      })}
                    />
                    <span className="text-danger text-small d-block mb-2">
                      {errors.country && errors.country.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="container div-zip">
                <p>Zip code</p>
                <input
                  disabled={inputZip}
                  type="number"
                  min={0}
                  name="zip"
                  {...register("zip", {
                    required: "Required",
                  })}
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.zip && errors.zip.message}
                </span>
              </div>
              <h6>Payment Details</h6>
              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <p>Credit Card Holder</p>
                    <input
                      disabled={inputHolder}
                      type="text"
                      name="holder"
                      min={0}
                      {...register("holder", {
                        required: "Required",
                      })}
                    />
                    <span className="text-danger text-small d-block mb-2">
                      {errors.holder && errors.holder.message}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <p>Credit Card Number</p>
                    <input
                      disabled={inputCardNumber}
                      type="number"
                      min={0}
                      name="cardNumber"
                      {...register("cardNumber", {
                        required: "Required",
                        minLength: {
                          value: 16,
                          message: "16 numbers",
                        },
                        maxLength: {
                          value: 16,
                          message: "16 numbers",
                        },
                      })}
                    />
                    <span className="text-danger text-small d-block mb-2">
                      {errors.cardNumber && errors.cardNumber.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <p>Expiration date</p>
                      <div className="div-month-year">
                        <div className="div-month">
                          <input
                            disabled={inputMonth}
                            type="number"
                            min={0}
                            name="expirationMonth"
                            {...register("expirationMonth", {
                              required: "Required",
                              minLength: {
                                value: 2,
                                message: "2 numbers",
                              },
                              maxLength: {
                                value: 2,
                                message: "2 numbers",
                              },
                            })}
                            placeholder="MM"
                            className="user-data-input-month"
                          />
                          <span className="text-danger text-small d-block mb-2">
                            {errors.expirationMonth &&
                              errors.expirationMonth.message}
                          </span>
                        </div>
                        /
                        <div className="div-year">
                          <input
                            disabled={inputYear}
                            name="expirationYear"
                            type="number"
                            min={0}
                            placeholder="YY"
                            className="user-data-input-year"
                            {...register("expirationYear", {
                              required: "Required",
                              minLength: {
                                value: 2,
                                message: "2 numbers",
                              },
                              maxLength: {
                                value: 2,
                                message: "2 numbers",
                              },
                            })}
                          />
                          <span className="text-danger text-small d-block mb-2">
                            {errors.expirationYear &&
                              errors.expirationYear.message}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 div-cvv">
                    <p>CVV</p>
                    <input
                      disabled={inputCvv}
                      name="cvv"
                      type="password"
                      className="user-data-input-code"
                      {...register("cvv", {
                        required: "Required",
                        minLength: {
                          value: 3,
                          message: "3 numbers",
                        },
                        maxLength: {
                          value: 3,
                          message: "3 numbers",
                        },
                      })}
                    />
                    <span className="text-danger text-small d-block mb-2">
                      {errors.cvv && errors.cvv.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="div-btn">
                <button
                  disabled={!btnActive1}
                  className="btn btn-primary btn-finish"
                >
                  {" "}
                  Confirm details{" "}
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="container cont-order">
              <div>
                <h5> Your Order: </h5>
              </div>
              {ctx.itemsFinales.length === 0 && <div>Cart is empty</div>}
              {ctx.itemsFinales.map((item) => (
                <div key={item.id} className="row basket-item-row">
                  <div className="col-md-6 item-basket-name">{item.nombre}</div>

                  <div className="col-md-6 text-right">
                    {item.qty} x EUR {item.precio.toFixed(2)}
                    <hr className="hr-precio" />
                  </div>
                </div>
              ))}
              <div className="subtotal">
                <strong>Subtotal: {ctx.priceFinales.toFixed(2)} </strong>
              </div>
              <div className="final-price">
                <strong>
                  Final Price with discounts: {ctx.priceEnd.toFixed(2)}
                </strong>
              </div>
            </div>
            <div className="div-btn">
              <button
                disabled={!btnActive2}
                className="btn btn-primary btn-finish"
              >
                <Link to="/checkout/final-order" className="link-finish">
                  Finish Order
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
