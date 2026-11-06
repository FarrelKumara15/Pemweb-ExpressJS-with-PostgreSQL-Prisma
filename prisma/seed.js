const prisma = require('./client');

async function main() {
  const initialProducts = [
    { name: 'Buku', price: 15000 },
    { name: 'Pulpen', price: 5000 },
  ];

  for (const item of initialProducts) {
    await prisma.product.create({
      data: item,
    });
  }

  console.log('Seed data produk awal berhasil ditambahkan.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
