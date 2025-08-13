import Maps from '@/components/Maps';
import styles from './page.module.scss';

export default async function Home() {
    return (
        <div className={styles.page}>
            <Maps />
        </div>
    );
}
