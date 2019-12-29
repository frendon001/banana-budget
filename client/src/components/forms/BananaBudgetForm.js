import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import InputFormikField from "./InputFormikField";

const bananaBudgetFormSchema = Yup.object().shape({
  budgetDate: Yup.date().required("Required"),
  budgetNumberOfDays: Yup.number()
    .min(1, "Enter a value greater than 0.")
    .required("Required")
});

const BananaBudgetForm = props => {
  return (
    <Formik
      initialValues={{ budgetDate: "", budgetNumberOfDays: "" }}
      validationSchema={bananaBudgetFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await props.handleFormSubmit(
            values.budgetDate,
            values.budgetNumberOfDays
          );
          setSubmitting(false);
        } catch (error) {
          // todo error handling
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="ui form error">
          <InputFormikField
            type="date"
            inputName="budgetDate"
            label="Enter Date"
          />
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
