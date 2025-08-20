import Image from 'next/image';
import Link from 'next/link';

import { signOut } from '@/action/login';
import { createClient } from '@/utils/supabase/server';

import logo from '@/public/images/logo.png';

import styles from './Header.module.scss';

const Header = async () => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return (
        <header className={styles.header}>
            <Link href="/">
                <Image src={logo.src} width={60} height={60} alt="공간하우징 로고" priority />
            </Link>
            <nav>
                <ul className={styles.links}>
                    <li>
                        <Link href="/portfolio">시공사례</Link>
                    </li>

                    {data.user && (
                        <>
                            <li>
                                <Link href="/admin">어드민</Link>
                            </li>
                            <li>
                                <form action={signOut}>
                                    <button>로그아웃</button>
                                </form>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
