import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import InputFormikField from './InputFormikField';

const bananaBudgetFormSchema = Yup.object().shape({
  budgetDate: Yup.date()
    .required('Required'),
  budgetNumberOfDays: Yup.number()
    .min(1, 'Enter a value greater than 0.')
    .required('Required')
});



function formatDate(dateString) {
  const dateArr = dateString.split('-');
  return dateArr[1] + '/' + dateArr[2] +'/' + dateArr[0];
}

const getBananaBudget = async (date, days, setSubmitting) => {
  try {
    const res = await axios.get(`http://localhost:3030/api/bananaBudget/?startDate=${formatDate(date)}&numberOfDays=${days}`);
    console.log(res);
    let totalCost = "";
    totalCost = res.data.totalCost;

    alert('Your total cost is: ' + totalCost);
  } catch(error) {
    console.log(error);
  }
  

};



const BananaBudgetForm = () => {
  return (
    <Formik
      initialValues={{ budgetDate: '', budgetNumberOfDays: '' }}
      validationSchema={bananaBudgetFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        getBananaBudget(values.budgetDate, values.budgetNumberOfDays);
        setSubmitting(false);
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="ui form error">
          <InputFormikField type="date" inputName="budgetDate" label="Enter Date" />
          <InputFormikField
            type="number"
            inputName="budgetNumberOfDays"
            label="Enter Number of Days"
          />
          <button
            type="submit"
            className="ui button primary"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BananaBudgetForm;
