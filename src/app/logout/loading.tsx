import styles from "@/app/logout/loading.module.css";

export default function Loading() {
    return (
        <div className={styles.loading}>
            <h1>Loading you out...</h1>
            <p>Please wait while we process your request.</p>
        </div>
    )
}