import axios from "axios";
import React from "react";
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
        image: formData.get("image").name,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error.message));

    e.target.reset();
  }

  return (
    <>
      <h1>hii</h1>
      <div>
        {data &&
          data.map((d, i) => (
            <div key={i}>
              <img src={d.image} alt={d.name} />
              <h3>Name:{d.name}</h3>
              <p>Quantity:{d.quantity}</p>
              <p>Price:{d.price}</p>
            </div>
          ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" id="quantity" />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" />
        </div>
        <div>
          <label htmlFor="image">Upload</label>
          <input type="file" name="image" id="image" />
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
