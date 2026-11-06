const prisma = require('../prisma/client');
const products = require('../data/products');

// GET /products -> 200 + array seluruh produk dari database
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data produk', error: error.message });
  }
};

// GET /products/:id -> 200 + objek produk, atau 404 jika tidak ditemukan
const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'ID produk tidak valid' });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil detail produk', error: error.message });
  }
};

// POST /products -> 201 + produk baru (ID dibuat otomatis)
const createProduct = (req, res) => {
  const { name, price } = req.body || {};

  if (typeof name !== 'string' || name.trim() === '' ||
      typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({
      message: 'name (string tidak kosong) dan price (angka >= 0) wajib diisi',
    });
  }

  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: newId, name: name.trim(), price };
  products.push(newProduct);

  res.status(201).json(newProduct);
};

module.exports = { getAllProducts, getProductById, createProduct };
