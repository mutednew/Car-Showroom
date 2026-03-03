import { getCars } from '@/services/api';
import CarCard from '@/components/CarCard/CarCard';
import styles from './page.module.css';

export default async function Home() {
    const { data: cars, error } = await getCars();

    if (error) {
        return (
            <div className="container">
                <div className={styles.messageBox}>
                    <h2 className={styles.errorTitle}>Oops! Something went wrong.</h2>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }

    if (!cars || cars.length === 0) {
        return (
            <div className="container">
                <div className={styles.messageBox}>
                    <h2>No vehicles available.</h2>
                    <p>Please check back later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <header className={styles.header}>
                <h1 className={styles.title}>Explore Models</h1>
                <p className={styles.subtitle}>Discover the perfect vehicle for your next adventure.</p>
            </header>

            <div className={styles.grid}>
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
}