
import { MongoClient, ObjectId } from 'mongodb';
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const uri = process.env.MONGODB_URI; // MongoDB connection string
const client = new MongoClient(uri);
const db = client.db('mealsDB'); // replace 'mealsDB' with your database name
const mealsCollection = db.collection('meals');

const s3 = new S3({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.ACCESS_AWS_KEY_ID,
        secretAccessKey: process.env.SECRET_AWS_ACCESS_KEY,
    },
});

// Function to fetch all meals from MongoDB
export async function getMeals() {
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Fetching meals...");
        const meals = await mealsCollection.find({}).toArray();
        // console.log("Meals fetched successfully:", meals);
        // revalidatePath('/meals'); // re validete only the page of this route
        return meals;
    } catch (error) {
        console.error("Error in getMeals:", error);
        throw new Error("Failed to fetch meals");
    }
}


// Function to fetch a single meal by slug
export async function getMeal(slug) {
    try {
        await client.connect();
        return await mealsCollection.findOne({ slug: slug });
    } catch (error) {
        console.log(error);
    }
}

// Function to post a new meal
export async function postMeal(meal) {
    console.log({
        message: 'on database functions file',
        title: meal.title,
        summary: meal.summary,
        instructions: meal.instructions,
        image: meal.image,
        creator: meal.name,
        creator_email: meal.email,
    });

    // Generate slug from title
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions); // Sanitize instructions

    // Handle image upload to S3
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const bufferedImage = await meal.image.arrayBuffer();

    await s3.putObject({
        Bucket: 'musaab-test-bucket',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });

    // Store image name in meal object
    meal.image = fileName;

    // Insert the meal into MongoDB
    await mealsCollection.insertOne({
        title: meal.title,
        summary: meal.summary,
        instructions: meal.instructions,
        creator: meal.creator,
        creator_email: meal.creator_email,
        image: meal.image,
        slug: meal.slug,
        createdAt: new Date(),
    });
}
