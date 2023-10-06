import {useState} from "react";
import {nanoid} from "nanoid";
import TrainingsList from "./TrainingsList";
import TrainingModel from "../models/TrainingModel";
import styles from './TrainingRecord.module.css';

import dateValidator from "../helpers/dateValidator";


export default function TrainingRecord() {
    const [training, setTraining] = useState([new TrainingModel(nanoid(), '12.05.2023', 23)]);
    const [edit, setEdit] = useState({status: false, data: ''});
    const [form, setForm] = useState({
        date: '',
        distance: '',
    });


    const handleEdit = (id) => {
      const index = [...training].findIndex((i) => i.id === id);

      setEdit({status: true, data: training[index]});
      setForm({date: training[index].date, distance: training[index].distance});
    }

    const handleDelete = (id) => {
      setTraining(prevState => prevState.filter((o) => o.id !== id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit)
            setTraining((prevState) =>
                prevState.filter((o) => {
                    return o.id !== edit.data.id;
                })
            );
        let isValid = dateValidator(form.date);

        if(isValid) {
            const activity = new TrainingModel(nanoid(), form.date, Number(form.distance));
            setTraining(prevState => prevState.findIndex(o => o.date === form.date) === -1
                ? ([...prevState, activity])
                : prevState.map((o) => o.date === form.date
                    ? {...o, distance: Number(o.distance) + Number(form.distance)}
                    : o));
            setForm(prevState => ({...prevState, date: '', distance: ''}))
        }
        else{
            alert('Дата введена некорректно. Попробуйте снова')
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prevState => ({...prevState, [name]: value}));
    }

    return (
        <div className={styles.trainingRecord}>
            <h1 className={styles.widgetTitle}>Трекер прогулок</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputRow}>
                    <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                    <input type="text" name='date' className={styles.input} value={form.date} onChange={handleChange} required={true}/>
                </div>
                <div className={styles.inputRow}>
                    <label htmlFor="distance">Пройдено км</label>
                    <input type="text" name='distance' className={styles.input} value={form.distance} onChange={handleChange} required={true} pattern="^[0-9]*[.,]?[0-9]+$"/>
                </div>
                <button className={styles.okButton}>Добавить</button>
            </form>
           <div className={styles.output}>
               <ul className={styles.headersRow}>
                   <li>Дата (ДД.ММ.ГГ)</li>
                   <li>Пройдено км</li>
                   <li>Действия</li>
               </ul>
               <TrainingsList trainings={training} onEdit={handleEdit} onDelete={handleDelete}/>
           </div>
        </div>
    );
}