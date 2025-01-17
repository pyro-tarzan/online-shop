import styles from "./page.module.css";
import Image from "next/image";

// IMPORT COMPONENTS
import HomeNavbar from "@/components/HomeNavbar/HomeNavbar";
import WhiteButton from "@/components/Button/Button";

export default function Home() {
	return (
		<div className={styles.page}>
			<HomeNavbar />
			<div className={styles.maincontent}>
				<div className={styles.homepage}>
					<div className={styles.headingcontents}>
						<h1>Welcome to the Online Shop</h1>
						<p>Store for cups, printed t-shirts, notebooks and more...</p>
						<WhiteButton urlLink="/signup" urlName="SignUp" styles={{marginTop: "20px"}} />
					</div>
				</div>
				<div className={styles.imagecontents}>
					<Image 
						src={"/images/shopping-cart.jpg"}
						width={1000}
						height={600}
						alt="Shopping cart"
						className={styles.cartimage}
						priority={true}
					/>
				</div>
			</div>
		</div>
	);
}
