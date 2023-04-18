import styles from './styles.module.css';

type Props = {
    txt: string;
    action: (event?: any) => void;
    size?: string;
}

export function Button({ action, txt, size }: Props) {
    return (
        <>
            <button 
                onClick={action} 
                className={styles.btn} 
                style={{width: `${size}px`}}
            >{txt}
            </button>
        </>
    );
}