import styles from './styles.module.css';

type Props = {
    txt: string;
    action: (event?: any) => void;
    size?: string;
}

export function ButtonHome({ action, txt, size }: Props) {
    return (
        <>
            <button
                onClick={action}
                className={styles.btnHome}
                style={{ width: `${size}px` }}
            >{txt}
            </button>
        </>
    );
}