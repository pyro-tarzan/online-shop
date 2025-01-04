import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// IMPORT COMPONENTS
import { Navbar } from "@/components/navbar/Navbar";

const montserrat = Montserrat({
	variable: "--font-Montserrat-serif",
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: "Online shop",
	description: "The Online shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body className={`${montserrat.variable}`}>
			<Navbar />
			{children}
		</body>
		</html>
	);
}
