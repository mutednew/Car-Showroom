import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCarById } from '@/services/api';
import styles from './page.module.css';

interface CarDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsProps) {
    const resolvedParams = await params;
    const { data: car, error } = await getCarById(resolvedParams.id);

    if (error || !car) {
        notFound();
    }

    return (
        <div className={styles.pageWrapper}>
            <div className="container">
                <Link href="/" className={styles.backButton}>
                    &larr; Back to Models
                </Link>
            </div>

            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.gallery}>
                        <div className={styles.mainImageWrapper}>
                            <Image
                                src={car.images[0] || car.thumbnail}
                                alt={car.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={styles.image}
                            />
                        </div>

                        <div className={styles.tagsContainer}>
                            {car.tags.map(tag => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.info}>
                        <h1 className={styles.title}>
                            {car.brand && <span className={styles.brand}>{car.brand}</span>}
                            {car.title}
                        </h1>

                        <p className={styles.price}>${car.price.toLocaleString()}</p>
                        <p className={styles.description}>{car.description}</p>

                        <div className={styles.specs}>
                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Availability</span>
                                <span className={styles.specValue}>{car.availabilityStatus}</span>
                            </div>

                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Warranty</span>
                                <span className={styles.specValue}>{car.warrantyInformation}</span>
                            </div>

                            <div className={styles.specItem}>
                                <span className={styles.specLabel}>Rating</span>
                                <span className={styles.specValue}>★ {car.rating.toFixed(1)}</span>
                            </div>
                        </div>

                        <button className={styles.buyButton}>
                            Order Now
                        </button>
                    </div>
                </div>

                <div className={styles.reviewsWrapper}>
                    <h2 className={styles.sectionTitle}>Customer Reviews (Coming next)</h2>
                </div>
            </div>
        </div>
    );
}