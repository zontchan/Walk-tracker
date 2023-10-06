import styles from './TrainingList.module.css';

export default function TrainingsList(props) {
    const {trainings, onEdit, onDelete} = props;
    const filteredTrainings = trainings.sort((a, b) => new Date(b.date.split('.').reverse().join('.')) - new Date(a.date.split('.').reverse().join('.')));
    return (
        <ul className={styles.recordsList}>
            {filteredTrainings.map((o) => <li key={o.id} className={styles.record}>
                <div className={styles.recordDate}>{o.date}</div>
                <div className={styles.recordDistance}>{o.distance}</div>
                <div className={styles.buttonsRow}>
                    <button className={`${styles.editButton} ${styles.button}`} onClick={() => onEdit(o.id, o.date, o.distance)}>✎</button>
                    <button className={`${styles.deleteButton} ${styles.button}`} onClick={() => onDelete(o.id)}>❌</button>
                </div>

            </li>)}
        </ul>
    );
}