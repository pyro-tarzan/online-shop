"use client";
import styles from "@/components/navbar/navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
	const path = usePathname();

    return(
        <div className={styles.navbar}>
            <header>
				<nav>
					<span>Online Shop</span>
					{path == "/" ? 
						<div className={styles.navmenus}>
							<Link href="/signin" className={styles.button}>SignIn</Link>
							<Link href="/signup" className={styles.button}>SignUp</Link>
						</div>
						: null
					}
				</nav>
			</header>
        </div>
    )
}