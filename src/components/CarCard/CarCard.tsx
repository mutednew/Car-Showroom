import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import styles from './CarCard.module.css';

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    return (
        <Link href={`/vehicles/${car.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={car.thumbnail}
                    alt={`${car.brand} ${car.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>
                        {car.brand && <span className={styles.brand}>{car.brand}</span>}
                        {car.title}
                    </h3>
                    <span className={styles.price}>${car.price.toLocaleString()}</span>
                </div>

                <div className={styles.footer}>
                    <span className={styles.rating}>★ {car.rating.toFixed(1)}</span>
                    <span className={styles.tags}>{car.tags.slice(0, 2).join(', ')}</span>
                </div>
            </div>
        </Link>
    );
}