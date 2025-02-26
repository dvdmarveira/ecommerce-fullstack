// backend/src/scripts/seed.ts
import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    // Clear existing data
    await db.collection("categories").deleteMany({});
    await db.collection("products").deleteMany({});
    await db.collection("orders").deleteMany({});

    // Create categories
    const categories = Array.from({ length: 5 }).map(() => ({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const insertedCategories = await db
      .collection("categories")
      .insertMany(categories);
    const categoryIds = Object.values(insertedCategories.insertedIds);

    // Create products
    const products = Array.from({ length: 20 }).map(() => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      imageUrl: faker.image.url(),
      categoryId: faker.helpers.arrayElement(categoryIds),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const insertedProducts = await db
      .collection("products")
      .insertMany(products);
    const productIds = Object.values(insertedProducts.insertedIds);

    // Create orders
    const orders = Array.from({ length: 10 }).map(() => ({
      customerName: faker.person.fullName(),
      total: 0,
      status: faker.helpers.arrayElement(["pending", "completed", "cancelled"]),
      items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(
        () => {
          const product = faker.helpers.arrayElement(products);
          return {
            productId: faker.helpers.arrayElement(productIds),
            quantity: faker.number.int({ min: 1, max: 5 }),
            price: product.price,
          };
        }
      ),
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    }));

    // Calculate total for each order
    orders.forEach((order) => {
      order.total = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    });

    await db.collection("orders").insertMany(orders);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
  }
}

seed();
