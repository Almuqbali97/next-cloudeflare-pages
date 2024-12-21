import Link from 'next/link'
import styles from './page.module.css'
import MealsGrid from '@/components/meals/meals-grid'
import { getMeals } from '@/lib/meals'
import { Suspense } from 'react';

export const runtime = "edge";

export const metadata = {
    title: 'All Meals',
    description: 'Browrs the delicious meals, shared by a food-loving community.',
}

async function Meals() {
    const meals = await getMeals();
    return <main className={styles.main}>
        <MealsGrid meals={meals} />
    </main>
}
export default function MealsPage(params) {

    return (
        <>
            <header className={styles.header}>
                <h1>
                    Delicious meals, created {' '} <span className={styles.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun!
                </p>
                <p className={styles.cta}>
                    <Link href={'/meals/share'}>Share yout favorite recipe</Link>
                </p>
            </header>
            <Suspense fallback={<p className={styles.loading}>Featching Data...</p>}>
                <Meals />
            </Suspense>
        </>
    )
}