import axios from "axios";
import React from "react";
import { formFields } from "./assets/mockdata/addProductsFormFields";

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    await axios
      .post("http://localhost:3000/products", {
        ...Object.fromEntries(formData),
        image: e.target[3].value,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error.message));

    e.target.reset();
  }

  function showOneDataCard(id) {
    console.log("hellooo...", id);
    const product = data.filter((d) => d.id === id);
    console.log(product);
    return (
      <>
        {product.map((i) => (
          <div key={i.id} className="bg-red-300 h-full w-full">
            <img src={i.image} alt={i.name} className="h-80 w-80" />
            <h3>Name:{i.name}</h3>
            <p>Quantity:{i.quantity}</p>
            <p>Price:{i.price}</p>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="grid grid-cols-4 gap-2 ">
        {data &&
          data.map((d) => (
            <div key={d.id} onClick={() => showOneDataCard(d.id)}>
              <img src={d.image} alt={d.name} className="h-40 w-60" />
              <h3>Name:{d.name}</h3>
              <p>Quantity:{d.quantity}</p>
              <p>Price:{d.price}</p>
            </div>
          ))}
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-slate-50 border-1 p-2 flex flex-col gap-1"
      >
        {formFields.map((formField, index) => (
          <div key={index} className="flex">
            <label htmlFor={formField.value} className="basis-1/4">
              {formField.label}
            </label>
            <input
              type={formField.type}
              name={formField.value}
              id={formField.value}
              className="basis-3/4"
            />
          </div>
        ))}
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
