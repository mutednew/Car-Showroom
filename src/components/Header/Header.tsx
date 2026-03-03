import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoBold}>PORSCHE</span>
                    <span className={styles.logoLight}>SHOWROOM</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Models</Link>
                    <a href="https://github.com/mutednew/Car-Showroom" target="_blank" rel="noopener noreferrer" className={styles.navLink}>GitHub</a>
                </nav>
            </div>
        </header>
    );
}