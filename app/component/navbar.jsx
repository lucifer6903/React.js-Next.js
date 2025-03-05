// components/Navbar.js
'use client';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
        <nav className='nav'>
            <div >
                <Link href="/">logo</Link>
            </div>
            <ul >
                <li>
                    <Link href="/">form</Link>
                </li>
                <li>
                    <Link href="/about">scholarship</Link>
                </li>
                <li>
                    <Link href="/services">blog</Link>
                </li>
                <li>
                    <Link href="/contact">premium</Link>
                </li>
                <li>
                    <Link href="/login">login</Link>
                </li>
            </ul>
        </nav>
        <style jsx>{``}</style>
        </div>
    );
};

export default Navbar;
