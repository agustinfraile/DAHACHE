import styles from './CollectionHeader.module.css';

const CollectionHeader = ({ text }) => {
    return (
        <div className={styles.headerContainer}>
            <h2 className={styles.headerText}>{text}</h2>
        </div>
    );
};

export default CollectionHeader;
