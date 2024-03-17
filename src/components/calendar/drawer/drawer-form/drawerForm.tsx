import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import styles from './drawerForm.module.scss';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { editFlowSelector, inputsDataSelector } from '@constants/selectors';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { actions } from '@redux/reducers/calendar.slice';
import type { Moment } from 'moment';

type Props = {
    setOpen: (value: boolean) => void;
    dateMoment: Moment;
};

type FormFieldType = {
    key: string;
    name: string;
    exercise: string;
    replays: number;
    weight: number;
    count: number;
    id: string;
};
export type FormFieldsType = { inputsBlock: FormFieldType[] };

export const DrawerForm = ({ setOpen, dateMoment }: Props) => {
    const dispatch = useAppDispatch();
    const inputsData = useAppSelector(inputsDataSelector);
    const editFlow = useAppSelector(editFlowSelector);
    const [itemsToRemove, setItemsToRemove] = useState<{ [key: number]: boolean }>({});
    const [buttonDelete, setButtonDelete] = useState(false);
    const [form] = Form.useForm<FormFieldsType>();

    const initialFormValues =
        inputsData.length > 0
            ? inputsData.map((exercise) => ({
                  key: exercise.name,
                  name: exercise.name,
                  exercise: exercise.name,
                  replays: exercise.replays,
                  weight: exercise.weight,
                  count: exercise.count,
                  id: exercise.id,
              }))
            : [
                  {
                      key: 'empty',
                      name: 'empty',
                      exercise: '',
                      replays: 1,
                      weight: 0,
                      count: 1,
                      id: '',
                  },
              ];

    const deleteExercise = (remove: (index: number | number[]) => void) => {
        const checkboxKeys = Object.keys(itemsToRemove).map((key) => Number(key));
        const checkboxTrueList = checkboxKeys.filter((key) => itemsToRemove[key] === true);
        setItemsToRemove((prev) => {
            const newItems = { ...prev };
            checkboxTrueList.forEach((key) => {
                delete newItems[key];
            });
            return newItems;
        });
        remove(checkboxTrueList);
        setItemsToRemove([]);
    };

    const setDeleteExercises = (e: CheckboxChangeEvent, index: number) => {
        const checked = e.target.checked;
        setItemsToRemove((prev) => ({
            ...prev,
            [index]: checked,
        }));
    };

    useEffect(() => {
        const hasCheckedItem = !Object.values(itemsToRemove).some((el) => el === true);
        setButtonDelete(hasCheckedItem);
    }, [itemsToRemove]);

    function onFinish(values: FormFieldsType) {
        const exercisesData = values.inputsBlock
            .filter((exercise) => exercise.exercise && exercise.exercise !== '')
            .map((exercise) => ({
                name: exercise.exercise,
                replays: exercise.replays,
                weight: exercise.weight,
                count: exercise.count,
                date: dateMoment.format('DD.MM.YYYY'),
                id: exercise.id,
            }));

        console.log(exercisesData);
        if (exercisesData.length > 0) {
            dispatch(actions.setInputsData(exercisesData));
        }

        setOpen(false);
    }

    return (
        <Form
            onFinish={onFinish}
            name='form'
            form={form}
            initialValues={{ inputsBlock: initialFormValues }}
        >
            <Form.List name='inputsBlock'>
                {(fields, { add, remove }) => {
                    return (
                        <>
                            {fields.map(({ key, name }) => {
                                return (
                                    <div key={key} className={styles.container}>
                                        <Form.Item name={[name, 'exercise']}>
                                            <Input
                                                placeholder='Упражнение'
                                                className={styles.exercises}
                                                addonAfter={
                                                    editFlow ? (
                                                        <Checkbox
                                                            checked={itemsToRemove[name]}
                                                            name='checkbox'
                                                            onChange={(e) =>
                                                                setDeleteExercises(e, name)
                                                            }
                                                        />
                                                    ) : null
                                                }
                                            />
                                        </Form.Item>
                                        <div className={styles.descrip__text}>
                                            <div className={styles.repeat}>Подходы</div>
                                            <div className={styles.weight}>Вес, кг</div>
                                            <div className={styles.count}>Количество</div>
                                        </div>
                                        <div className={styles.inputs__wrapper}>
                                            <div className={styles.input__container}>
                                                <Form.Item name={[name, 'replays']}>
                                                    <InputNumber
                                                        className={styles.repeat_input}
                                                        placeholder='1'
                                                        addonBefore='+'
                                                        min={1}
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className={styles.wrapper__weight_count}>
                                                <div className={styles.input__container}>
                                                    <Form.Item name={[name, 'weight']}>
                                                        <InputNumber
                                                            className={styles.weight_input}
                                                            placeholder='0'
                                                            min={0}
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <span className={styles.separator}>x</span>
                                                <div className={styles.input__container}>
                                                    <Form.Item name={[name, 'count']}>
                                                        <InputNumber
                                                            className={styles.count_input}
                                                            placeholder='3'
                                                            min={1}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className={styles.wrapper__btns}>
                                <Button
                                    type='link'
                                    className={styles.addMore_btn}
                                    onClick={() => add()}
                                >
                                    <PlusOutlined style={{ marginRight: '8px' }} />
                                    Добавить ещё
                                </Button>
                                {editFlow && (
                                    <Button
                                        type='link'
                                        className={styles.delete_btn}
                                        disabled={buttonDelete}
                                        onClick={() => deleteExercise(remove)}
                                    >
                                        <MinusOutlined
                                            style={{ marginRight: '8px', marginTop: '2px' }}
                                        />
                                        Удалить
                                    </Button>
                                )}
                            </div>
                        </>
                    );
                }}
            </Form.List>
            <Button htmlType='submit' type='text' className={styles.close__icon}>
                <CloseOutlined />
            </Button>
        </Form>
    );
};
