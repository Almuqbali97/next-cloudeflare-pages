import styles from './main-header.module.css';
import Link from "next/link";
import LogoImg from '@/assets/logo.png';
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';

export default function MainHeader() {
    const navItems = [
        {
            route: '/meals',
            linkText: 'Browse Meals'
        },
        {
            route: '/community',
            linkText: 'Foodies Community'
        }
    ]
    return (<>
        <MainHeaderBackground />
        <header className={styles.header}>
            <Link
                className={styles.logo} href={'/'}>
                <Image src={LogoImg} alt="logo of plate of food" priority />
                NextLever Food
            </Link>
            <nav className={styles.nav}>
                <ul>
                    {navItems.map((item, index) => {
                        return <NavLink key={index} route={item.route} linkText={item.linkText} />
                    })}
                </ul>
            </nav>
        </header>
    </>)
}