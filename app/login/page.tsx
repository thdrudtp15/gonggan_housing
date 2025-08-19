'use client';

import { useActionState } from 'react';

import { login, signup } from '@/action/login';

import styles from './page.module.scss';

export default function LoginPage() {
    const [state, action, pending] = useActionState(login, { error: '' });

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>관리자 로그인</h1>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            이메일
                        </label>
                        <input id="email" name="email" type="email" required className={styles.input} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            비밀번호
                        </label>
                        <input id="password" name="password" type="password" required className={styles.input} />
                    </div>
                    {state.error && <p>{state.error}</p>}
                    <button formAction={action} className={styles.button}>
                        로그인
                    </button>

                    {/* <button formAction={signup}>Sign up</button> */}
                </form>
            </div>
        </div>
    );
}
