import axios from "axios";
import React from "react";
function App() {
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => console.log(res))
      .catch((error) => console.log(error.message));
  });

  return (
    <>
      <h1>hii</h1>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input type="text" name="quantity" id="quantity" />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="text" name="price" id="price" />
        </div>
        <div>
          <label htmlFor="image">Upload</label>
          <input type="file" name="image" id="image" />
        </div>
      </form>
    </>
  );
}

export default App;
