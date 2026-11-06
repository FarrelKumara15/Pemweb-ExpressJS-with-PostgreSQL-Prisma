# API Daftar Produk (ExpressJS)

Data disimpan di array (tanpa database). Route dan controller dipisah.

## Struktur
```
products-api/
├── app.js                          # setup server & middleware
├── routes/productRoutes.js         # definisi route
├── controllers/productController.js# logika endpoint
└── data/products.js                # data awal (array)
```

Server berjalan di `http://localhost:3001`.

## Daftar Endpoint

| Method | Path             | Keterangan                          | Status |
|--------|------------------|-------------------------------------|--------|
| GET    | `/products`      | Seluruh produk (array)              | 200    |
| GET    | `/products/:id`  | Satu produk berdasarkan ID          | 200 / 404 |
| POST   | `/products`      | Tambah produk (`name`, `price`)     | 201  |

Body POST (JSON): `{ "name": "Penggaris", "price": 7000 }`
ID dibuat otomatis (ID terbesar + 1).

## Hasil Pengujian

![Image](<Bukti Uji/GET All Products.png>)
GET /products <br/>
Status : 200 <br/>

![Image](<Bukti Uji/GET Product ada.png>)
![Image](<Bukti Uji/GET Product tidak ada.png>)
GET /products <br/>
Status : 200/404 <br/>

![Image](<Bukti Uji/POST Product.png>)
POST /products <br/>
Status : 400 <br/>

![Image](<Bukti Uji/GET Product Update.png>)
GET /products <br/>