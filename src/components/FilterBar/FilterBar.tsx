"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            if (term) {
                params.set("query", term);
            } else {
                params.delete("query");
            }
            router.replace(`/?${params.toString()}`);
        });
    };

    return (
        <div className={styles.filterWrapper}>
            <div className="container">
                <div className={styles.inputContainer}>
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Find your model..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />

                    {isPending && <div className={styles.loader}></div>}
                </div>
            </div>
        </div>
    );
}