import Maps from '@/components/Maps';
import styles from './page.module.scss';
import Mailer from '@/components/Mailer';

export default async function Home() {
    return (
        <div className={styles.page}>
            <Maps />
            <Mailer />
        </div>
    );
}
