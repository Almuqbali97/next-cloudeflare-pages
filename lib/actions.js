'use server'

import { redirect } from "next/navigation";
import { postMeal } from "./meals"
import { revalidatePath } from "next/cache";

// server side validaiton for the submitted form
function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function PostMeal(prevState, formData) {
    console.log({
        message: 'on server action file',
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    });

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    // form validation rules
    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        return {
            message: 'Invalid Input.'
        }
    }

    await postMeal(meal);
    // before we head to the new rout, we need to re validate the cache so when somone posts a meal so the new meal appears in the meals pag
    // revalidatePath('/') re valideate cashe for the whole website
    // revalidatePath('/meals', "layout") // revalidate for all nested routes
    revalidatePath('/meals'); // re validete only the page of this route
    redirect('/meals');
}