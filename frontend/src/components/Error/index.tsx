import styles from './styles.module.css';

type Props = {
    msg: string;
}

export function Error({ msg }: Props) {
    return (
        <div className={styles.error}>{msg}</div>
    );
}