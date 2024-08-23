import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: null, // Image file
  });
  const [editMode, setEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCreateOrUpdateProduct = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editMode) {
        // Update existing product
        await axios.put(
          `http://localhost:3000/api/products/${editingProductId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new product
        await axios.post("http://localhost:3000/api/products", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      image: null, // Reset image field when editing
    });
    setEditMode(true);
    setEditingProductId(product._id);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      description: "",
      image: null,
    });
    setEditMode(false);
    setEditingProductId(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">Manage Products</h2>

        <form
          onSubmit={handleCreateOrUpdateProduct}
          className="mb-8 bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {editMode ? "Update Product" : "Add Product"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Product List</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Title
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Price
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Description
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Image
                </th>
                <th className="py-3 px-5 border-b bg-gray-100 text-gray-700 font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b">{product.title}</td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
