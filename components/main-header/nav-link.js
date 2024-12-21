"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from './nav-link.module.css';

export default function NavLink({ route, linkText }) {
    const path = usePathname();
    return <li>
        <Link className={path.startsWith(route) ? styles.active : ''} href={route}>{linkText}</Link>
    </li>
}