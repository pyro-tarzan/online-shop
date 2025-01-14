"use client";
import styles from "@/components/HomeNavbar/homenavbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Url } from "next/dist/shared/lib/router/router";

interface INavbarProps {}

const navItems = [
	{
		id: "signin",
		label: "SignIn",
		href: "/signin"
	},
	{
		id: "signup",
		label: "SignUp",
		href: "/signup"
	}
]

const HomeNavbar: React.FunctionComponent<INavbarProps> = (props) => {
	const pathname = usePathname();
	const isActive = (path: Url) => pathname === path;

    return(
        <div className={styles.navbar}>
            <header>
				<nav>
					<Link href="/" className={styles.homeTitle}>Online Shop</Link>
					<div className={styles.navmenus}>
						<ul className={styles.navitems}>
							{
								navItems.map((eachItems) => (
									<li key={eachItems.id}>
										<Link href={eachItems.href} className={styles.items}>{eachItems.label}</Link>
									</li>
								))
							}
						</ul>
					</div>
				</nav>
			</header>
        </div>
    )
}

export default HomeNavbar;