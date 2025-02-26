"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/scripts/seed.ts
const mongodb_1 = require("mongodb");
const faker_1 = require("@faker-js/faker");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
        const client = new mongodb_1.MongoClient(uri);
        try {
            yield client.connect();
            const db = client.db();
            // Clear existing data
            yield db.collection("categories").deleteMany({});
            yield db.collection("products").deleteMany({});
            yield db.collection("orders").deleteMany({});
            // Create categories
            const categories = Array.from({ length: 5 }).map(() => ({
                name: faker_1.faker.commerce.department(),
                description: faker_1.faker.commerce.productDescription(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            const insertedCategories = yield db
                .collection("categories")
                .insertMany(categories);
            const categoryIds = Object.values(insertedCategories.insertedIds);
            // Create products
            const products = Array.from({ length: 20 }).map(() => ({
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                price: parseFloat(faker_1.faker.commerce.price()),
                imageUrl: faker_1.faker.image.url(),
                categoryId: faker_1.faker.helpers.arrayElement(categoryIds),
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            const insertedProducts = yield db
                .collection("products")
                .insertMany(products);
            const productIds = Object.values(insertedProducts.insertedIds);
            // Create orders
            const orders = Array.from({ length: 10 }).map(() => ({
                customerName: faker_1.faker.person.fullName(),
                total: 0,
                status: faker_1.faker.helpers.arrayElement(["pending", "completed", "cancelled"]),
                items: Array.from({ length: faker_1.faker.number.int({ min: 1, max: 5 }) }).map(() => {
                    const product = faker_1.faker.helpers.arrayElement(products);
                    return {
                        productId: faker_1.faker.helpers.arrayElement(productIds),
                        quantity: faker_1.faker.number.int({ min: 1, max: 5 }),
                        price: product.price,
                    };
                }),
                createdAt: faker_1.faker.date.past(),
                updatedAt: new Date(),
            }));
            // Calculate total for each order
            orders.forEach((order) => {
                order.total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            });
            yield db.collection("orders").insertMany(orders);
            console.log("Database seeded successfully!");
        }
        catch (error) {
            console.error("Error seeding database:", error);
        }
        finally {
            yield client.close();
        }
    });
}
seed();
