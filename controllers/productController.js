const prisma = require('../prisma/client');

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

// POST /products -> 201 + produk baru disimpan ke PostgreSQL melalui Prisma
const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body || {};

    if (
      typeof name !== 'string' ||
      name.trim() === '' ||
      typeof price !== 'number' ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(400).json({
        message: 'name (string tidak kosong) dan price (angka >= 0) wajib diisi',
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name.trim(),
        price: Math.round(price),
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan produk', error: error.message });
  }
};

// PUT /products atau PUT /products/:id -> 200 + produk yang diperbarui (body: { id, name, price })
const updateProduct = async (req, res) => {
  try {
    const rawId = req.params.id !== undefined ? req.params.id : req.body?.id;
    const id = Number(rawId);

    if (rawId === undefined || rawId === null || rawId === '' || !Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'id produk (angka bulat > 0) wajib diisi' });
    }

    const { name, price } = req.body || {};

    if (
      typeof name !== 'string' ||
      name.trim() === '' ||
      typeof price !== 'number' ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return res.status(400).json({
        message: 'name (string tidak kosong) dan price (angka >= 0) wajib diisi',
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name.trim(),
        price: Math.round(price),
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui produk', error: error.message });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct };
