# API Daftar Produk (ExpressJS + PostgreSQL + Prisma)

Proyek ini merupakan kelanjutan dari API Daftar Produk Minggu ke-9. Penyimpanan data yang sebelumnya menggunakan *in-memory array* kini telah dipindahkan ke database **PostgreSQL** menggunakan ORM **Prisma**, serta dilengkapi dengan operasi CRUD penuh (`GET`, `POST`, `PUT`, dan `DELETE`).

## Struktur Proyek
```
products-api/
├── app.js                            # Setup server Express & middleware
├── .env.example                      # Contoh konfigurasi environment variable
├── routes/
│   └── productRoutes.js              # Definisi route CRUD (/products)
├── controllers/
│   └── productController.js          # Logika endpoint CRUD dengan Prisma Client
└── prisma/
    ├── schema.prisma                 # Konfigurasi koneksi PostgreSQL & model Product
    ├── client.js                     # Instance PrismaClient
    ├── seed.js                       # Data awal produk (Buku & Pulpen)
    └── migrations/                   # Riwayat perubahan skema database (SQL)
```

## Cara Menjalankan Proyek

1. **Instalasi dependensi**
   ```bash
   npm install
   ```
2. **Konfigurasi Environment (`.env`)**
   Salin `.env.example` menjadi `.env` dan sesuaikan `DATABASE_URL` PostgreSQL Anda (atau jalankan local Prisma Postgres dengan `npx prisma dev -d -n products-db`):
   ```env
   PORT=3000
   DATABASE_URL="postgres://postgres:postgres@localhost:51214/template1?sslmode=disable&connection_limit=1&pgbouncer=true"
   ```
3. **Jalankan Migrasi & Seed Data Awal**
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```
4. **Jalankan Server ExpressJS**
   ```bash
   npm start
   ```
   Server berjalan di `http://localhost:3000`.
5. **Membuka Prisma Studio (Database GUI)**
   ```bash
   npm run prisma:studio
   ```

## Daftar Endpoint CRUD

| Method | Path                             | Keterangan                                                        | Status          |
|--------|----------------------------------|-------------------------------------------------------------------|-----------------|
| GET    | `/products`                      | Menampilkan seluruh data produk dari PostgreSQL                   | 200             |
| GET    | `/products/:id`                  | Menampilkan satu produk berdasarkan ID                            | 200 / 400 / 404 |
| POST   | `/products`                      | Membuat data produk baru (`name`, `price`)                        | 201 / 400       |
| PUT    | `/products` atau `/products/:id` | Mengupdate data yang sudah ada (body: `id`, `name`, `price`)      | 200 / 400 / 404 |
| DELETE | `/products/:id` atau `/products` | Menghapus data produk berdasarkan `id`                            | 200 / 400 / 404 |

---

## Laporan Evidence Pengujian (Postman & Database Before - After)

### 1. Kondisi Awal Database (Before) & `GET /products`
- **Database Before (Kondisi Awal di Prisma Studio)**:
  ![DB Before Initial](<Bukti Uji/DB_1_Before_Initial.png>)
- **`GET /products` — Menampilkan Seluruh Data (`200 OK`)**:
  ![GET All Products 200](<Bukti Uji/1_GET_All_Products_200.png>)

### 2. Skenario `POST /products` (Membuat Data Baru)
- **`POST /products` — Success (`201 Created`)**:
  ![POST Product Success 201](<Bukti Uji/2_POST_Product_Success_201.png>)
- **`POST /products` — Kesalahan Validasi (`400 Bad Request`)**:
  ![POST Product Validation 400](<Bukti Uji/3_POST_Product_Validation_400.png>)
- **Database After `POST` (Produk `Penggaris` Tersimpan di PostgreSQL)**:
  ![DB After POST](<Bukti Uji/DB_2_After_POST.png>)

### 3. Skenario `PUT /products` (Mengupdate Data Berdasarkan `id`)
- **`PUT /products` — Success (`200 OK`)**:
  ![PUT Product Success 200](<Bukti Uji/4_PUT_Product_Success_200.png>)
- **`PUT /products` — Kesalahan Validasi (`400 Bad Request`)**:
  ![PUT Product Validation 400](<Bukti Uji/5_PUT_Product_Validation_400.png>)
- **`PUT /products` — Data Tidak Ditemukan (`404 Not Found`)**:
  ![PUT Product Not Found 404](<Bukti Uji/6_PUT_Product_NotFound_404.png>)
- **Database After `PUT` (`id: 1` Terupdate Menjadi `Buku Tulis` Rp18000)**:
  ![DB After PUT](<Bukti Uji/DB_3_After_PUT.png>)

### 4. Skenario `DELETE /products/:id` (Menghapus Data Berdasarkan `id`)
- **`DELETE /products/3` — Success (`200 OK`)**:
  ![DELETE Product Success 200](<Bukti Uji/7_DELETE_Product_Success_200.png>)
- **`DELETE /products/999` — Data Tidak Ditemukan (`404 Not Found`)**:
  ![DELETE Product Not Found 404](<Bukti Uji/8_DELETE_Product_NotFound_404.png>)
- **Database After `DELETE` (`id: 3 Penggaris` Terhapus dari PostgreSQL)**:
  ![DB After DELETE](<Bukti Uji/DB_4_After_DELETE.png>)
