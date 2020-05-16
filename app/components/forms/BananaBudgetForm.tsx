import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import InputFormikField from './InputFormikField';

const bananaBudgetFormSchema = Yup.object().shape({
  budgetDate: Yup.date().required('Required'),
  budgetNumberOfDays: Yup.number()
    .min(1, 'Enter a value greater than 0.')
    .required('Required'),
});

const BananaBudgetForm = (props: {
  handleFormSubmit: Function;
}): JSX.Element => {
  return (
    <Formik
      initialValues={{ budgetDate: '', budgetNumberOfDays: '' }}
      validationSchema={bananaBudgetFormSchema}
      onSubmit={async (values, { setSubmitting }): Promise<void> => {
        try {
          await props.handleFormSubmit(
            values.budgetDate,
            values.budgetNumberOfDays,
          );
          setSubmitting(false);
        } catch (error) {
          // todo error handling
        }
      }}
    >
      {({ isSubmitting }): JSX.Element => (
        <Form className="ui form error">
          <InputFormikField
            type="date"
            inputName="budgetDate"
            label="Start Date"
          />
          <InputFormikField
            type="number"
            inputName="budgetNumberOfDays"
            label="Number of Days to Budget"
          />
          <div className="ui grid">
            <div className="right floated right aligned eight wide column">
              <button
                type="submit"
                className="ui button primary"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BananaBudgetForm;
