import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface InputFormikFieldProps {
  inputName: string;
  label: string;
  type: string;
}

const InputFormikField = (props: InputFormikFieldProps): JSX.Element => {
  const { inputName, label, type = 'text' } = props;

  return (
    <div className="field">
      <label htmlFor={inputName}>{label}</label>
      <Field type={type} name={inputName} />
      <ErrorMessage
        name={inputName}
        component="div"
        className="ui error message"
      />
    </div>
  );
};

export default InputFormikField;
