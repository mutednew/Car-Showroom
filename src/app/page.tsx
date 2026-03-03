import { getCars } from "@/services/api";
import CarCard from "@/components/CarCard/CarCard";
import FilterBar from "@/components/FilterBar/FilterBar";
import styles from "./page.module.css";

interface HomeProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const { data: cars, error } = await getCars();

    const resolvedParams = await searchParams;
    const query = typeof resolvedParams.query === "string" ? resolvedParams.query.toLowerCase() : "";

    const filteredCars = cars?.filter((car) => {
        if (!query) return true;
        return (
            car.title.toLowerCase().includes(query) ||
            car.brand?.toLowerCase().includes(query)
        );
    });

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

    return (
        <>
            <FilterBar />

            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>Explore Models</h1>
                    <p className={styles.subtitle}>Discover the perfect vehicle for your next adventure.</p>
                </header>

                {!filteredCars || filteredCars.length === 0 ? (
                    <div className={styles.messageBox}>
                        <h2>No models found.</h2>
                        <p>Try adjusting your search criteria.</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {filteredCars.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}