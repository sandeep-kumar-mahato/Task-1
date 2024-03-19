import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://s3.amazonaws.com/open-to-cors/assignment.json"
      );
      const data = await response.json();

      const transformedData = Object.keys(data.products).map((key) => ({
        id: key,
        ...data.products[key],
      }));

      const sortedProducts = transformedData.sort(
        (a, b) => b.popularity - a.popularity
      );

      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold font-mono underline italic p-4 bg-slate-400">
        Product List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4 bg-slate-300">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-slate-200 rounded-lg shadow-md p-4 hover:bg-white transform transition duration-300 ease-in-out hover:scale-105 text-justify"
          >
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p>
              <span className="font-semibold">Subcategory:</span>{" "}
              {product.subcategory}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ${product.price}
            </p>
            <p>
              <span className="font-semibold">Popularity:</span>{" "}
              {product.popularity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
