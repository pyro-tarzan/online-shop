import styles from "@/components/Button/buttoncomponent.module.css";
import Link from "next/link";

const WhiteButton = ({urlLink, urlName, styles: inlineStyles}: any) => {
    return (
        <div className={styles.buttonoverlay} style={inlineStyles}>
            <Link
                href={urlLink}
                className={styles.signinbutton}
            >
                {urlName}
            </Link>
        </div>
    )
}

export default WhiteButton;