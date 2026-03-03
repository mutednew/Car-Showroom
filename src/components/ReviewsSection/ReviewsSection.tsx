"use client";

import { useState } from "react";
import { Review } from "@/types/car";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styles from "./ReviewsSection.module.css";

interface ReviewsSectionProps {
    initialReviews: Review[];
    carId: number;
}

export default function ReviewsSection({initialReviews, carId}: ReviewsSectionProps) {
    const [reviews, setReviews, isMounted] = useLocalStorage<Review[]>(
        `car-reviews-${carId}`,
        initialReviews
    );

    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }
        if (!comment.trim() || comment.length < 10) {
            setError("Comment must be at least 10 characters long.");
            return;
        }
        if (comment.length > 500) {
            setError("Comment cannot exceed 500 characters.");
            return;
        }

        const newReview: Review = {
            reviewerName: name,
            reviewerEmail: "user@example.com",
            rating: Number(rating),
            comment: comment,
            date: new Date().toISOString(),
        };

        setReviews([newReview, ...reviews]);

        setName("");
        setComment("");
        setRating(5);
    };

    const displayReviews = isMounted ? reviews : initialReviews;

    return (
        <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Customer Reviews</h2>

            <div className={styles.grid}>
                <div className={styles.formWrapper}>
                    <h3 className={styles.formTitle}>Leave a Review</h3>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {error && <div className={styles.error}>{error}</div>}

                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>Name</label>
                            <input
                                id="name"
                                type="text"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="rating" className={styles.label}>Rating</label>
                            <select
                                id="rating"
                                className={styles.select}
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                            >
                                {[5, 4, 3, 2, 1].map(num => (
                                    <option key={num} value={num}>{num} Stars</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="comment" className={styles.label}>Comment</label>
                            <textarea
                                id="comment"
                                className={styles.textarea}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your experience..."
                                rows={4}
                            />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Submit Review
                        </button>
                    </form>
                </div>

                <div className={styles.reviewsList}>
                    {displayReviews.length === 0 ? (
                        <p className={styles.empty}>No reviews yet. Be the first!</p>
                    ) : (
                        displayReviews.map((review, index) => (
                            <div key={index} className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <div className={styles.reviewerInfo}>
                                        <span className={styles.reviewerName}>{review.reviewerName}</span>

                                        <span className={styles.reviewDate}>
                                          {new Date(review.date).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric"
                                          })}
                                        </span>
                                    </div>

                                    <span className={styles.ratingStars}>
                                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                    </span>
                                </div>
                                <p className={styles.reviewComment}>{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}