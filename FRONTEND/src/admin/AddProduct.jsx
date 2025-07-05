import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import api from "../api";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
  });

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.image ||
      !form.category_id
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const res = await api.post("/products", form);
      toast.success("Product added successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        image: "",
        category_id: "",
      });
    } catch (err) {
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      return toast.error("Category name required");
    }

    setCatLoading(true);
    try {
      await api.post("/categories", { name: newCategory });
      toast.success("Category added");
      setNewCategory("");
      fetchCategories(); // refresh dropdown
    } catch (err) {
      toast.error("Failed to add category");
    } finally {
      setCatLoading(false);
    }
  };

  return (
    <Box
      maxWidth="600px"
      mx="auto"
      mt={5}
      px={3}
      py={4}
      bgcolor="background.paper"
      borderRadius={2}
      boxShadow={3}
    >
      <Typography variant="h5" gutterBottom color="primary">
        Add New Product
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          margin="normal"
          InputLabelProps={{ style: { color: "#edbfc6" } }}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          margin="normal"
          multiline
          rows={3}
          InputLabelProps={{ style: { color: "#edbfc6" } }}
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          margin="normal"
          InputLabelProps={{ style: { color: "#edbfc6" } }}
        />

        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          margin="normal"
          InputLabelProps={{ style: { color: "#edbfc6" } }}
        />

        <TextField
          select
          fullWidth
          label="Category"
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          margin="normal"
          InputLabelProps={{ style: { color: "#edbfc6" } }}
        >
          <MenuItem value="" disabled>
            Select a category
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={1} mt={1} mb={2}>
          <TextField
            label="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            variant="outlined"
            color="secondary"
            fullWidth
            InputLabelProps={{ style: { color: "#edbfc6" } }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddCategory}
            disabled={catLoading}
          >
            {catLoading ? <CircularProgress size={20} /> : "Add"}
          </Button>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Product"}
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
