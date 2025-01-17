import styles from "@/app/profile/profilepage.module.css";
import { query } from "@/app/_lib/db";

// IMPORT COMPONENTS
import { ProfileNavbar } from "@/components/profilenavbar/ProfileNavbar";

async function fetchUserProfile(userId: string) {
    try{
        const result = await query("SELECT * FROM users WHERE user_id = $1;", [userId]);
        return result.rows[0];
    } catch(error) {
        console.log("Profile page:", error);
    }
}

export default async function ProfilePage({ params }: { params: {user_id: string} }) {
    const {user_id} = await params;

    try{
        const userProfile = await fetchUserProfile(user_id);
        return (
            <div className={styles.profilepage}>
                <ProfileNavbar userData={userProfile} />
            </div>
        )
    } catch(error) {
        return <div>Failed to load the user profile.</div>
    }
}