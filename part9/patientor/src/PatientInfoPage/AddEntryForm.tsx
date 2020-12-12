import React from 'react';
import { Field, Formik, Form } from 'formik';

import { NumberField, DiagnosisSelection, TextField } from '../AddPatientModal/FormField';

import { NewEntry } from '../types';
import { useStateValue } from '../state';
import { Grid, Button } from 'semantic-ui-react';

export type EntryFormValues = Omit<NewEntry, 'id' | 'type'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
  }

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    
    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                healthCheckRating: 1,
                type: 'HealthCheck',
                employerName: '',
                sickLeave: { startDate: '', endDate: '' },
                discharge: { date: '', criteria: ''}
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
                    errors.date = 'Correct date format is YYYY-MM-DD'
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className='form ui'>
                        <Field
                            label='Describtion'
                            placeholder='Description'
                            name='description'
                            component={TextField}
                        />
                        <Field
                            label='Date'
                            placeholder='YYYY-MM-DD'
                            name='date'
                            component={TextField}
                        />
                        <Field
                            label='Specialist'
                            placeholder='Specialist'
                            name='specialist'
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            label='Health Check Rating'
                            name='healthCheckRating'
                            component={NumberField}
                            min='1'
                            max='4'
                        />
                        <Grid>
                            <Grid.Column floated='left' width={5}>
                                <Button type='button' onClick={onCancel} color='red'>
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated='right' width={5}>
                                <Button
                                    type='submit'
                                    floated='right'
                                    color='green'
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;