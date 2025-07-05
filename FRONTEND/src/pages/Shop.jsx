import React, { useEffect, useState } from "react";
import api from "../api";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { PackageSearch, Filter } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(500000);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [productRes, categoryRes] = await Promise.all([
      api.get("/products"),
      api.get("/categories"),
    ]);
    setProducts(productRes.data);
    setFiltered(productRes.data);
    setCategories(categoryRes.data);
  };

  useEffect(() => {
    let result = products;
    if (selectedCategory) {
      result = result.filter(
        (item) => item.category_name === selectedCategory
      );
    }
    result = result.filter((item) => item.price <= maxPrice);
    setFiltered(result);
  }, [selectedCategory, maxPrice]);

  return (
    <main className="bg-[#260c1a] min-h-screen text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-8">
          <PackageSearch size={28} className="text-primary" />
          <h1 className="text-3xl font-bold text-[#edbfc6]">Shop</h1>
        </div>

        {/* Filters */}
        <Box
          className="bg-[#432e36] p-6 rounded-xl shadow-md mb-10"
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Category Select */}
          <Box display="flex" alignItems="center" gap={2} flex={1}>
            <Filter className="text-secondary" />
            <FormControl fullWidth variant="filled">
              <InputLabel sx={{ color: "#edbfc6" }}>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  color: "#fff",
                  backgroundColor: "#260c1a",
                }}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.category_id} value={cat.category_name}>
                    {cat.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Price Slider */}
          <Box display="flex" alignItems="center" gap={3} flex={1}>
            <Typography variant="body1" color="secondary">
              Max Price: Rs {maxPrice.toLocaleString()}
            </Typography>
            <Slider
              value={maxPrice}
              onChange={(e, newVal) => setMaxPrice(newVal)}
              min={1000}
              max={500000}
              step={1000}
              sx={{ color: "#edbfc6", flex: 1 }}
            />
          </Box>
        </Box>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <MuiCard
              key={product.product_id}
              sx={{
                backgroundColor: "#432e36",
                borderRadius: "16px",
                color: "#edbfc6",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                transition: "transform 0.2s",
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category_name}
                </Typography>
                <Typography variant="h6" color="primary">
                  Rs. {product.price.toLocaleString()}
                </Typography>
              </CardContent>
            </MuiCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 mt-12">
            No products match the filters.
          </p>
        )}
      </div>
    </main>
  );
};

export default Shop;
