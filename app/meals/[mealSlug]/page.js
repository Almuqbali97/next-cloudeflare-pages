import { getMeal } from '@/lib/meals'
import styles from './page.module.css'
import Image from 'next/image'
import { notFound } from 'next/navigation'
export const runtime = "edge";
export async function generateMetadata({ params }) {
    const meal = await getMeal(params.mealSlug);
    if (!meal) {
        notFound();
    }
    return {
        title: meal.title,
        description: meal.summary
    }
}

export default async function MealDetails({ params }) {
    const meal = await getMeal(params.mealSlug)
    if (!meal) {
        notFound();
    }
    meal.instructions = meal.instructions.replace(/\n/g, '<br/>')
    return (<>
        <header className={styles.header}>
            <div className={styles.image}>
                <Image src={`https://musaab-test-bucket.s3.eu-north-1.amazonaws.com/${meal.image}`} alt={meal.title} fill />
            </div>
            <div className={styles.headerText}>
                <h1>{meal.title}</h1>
                <p className={styles.creator}>
                    By <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                </p>
                <p className={styles.summary}>
                    {meal.summary}
                </p>
            </div>
        </header>
        <main>
            <p className={styles.instructions} dangerouslySetInnerHTML={{
                __html: meal.instructions
            }}>
            </p>
        </main>
    </>)
}