import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {
  Form,
  Input,
  ErrorText,
} from '../../UI/form/form.ts';
import {Button} from "../../UI/button/button.ts";

const createValidationSchema = (usedNames: Set<string>) =>
  yup.object({
    name: yup
      .string()
      .trim()
      .required('Введите имя участника')
      .min(2, 'Минимум 2 символа')
      .max(200, 'Максимум 200 символов')
      .test(
        'unique-name',
        'Участник с таким именем уже существует',
        value => !value || !usedNames.has(value)
      )
  });

interface Props {
  onAdd: (name: string) => void | Promise<void>;
  usedNames: Set<string>;
}

export const AddParticipantForm: React.FC<Props> = ({onAdd, usedNames}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: createValidationSchema(usedNames),
    onSubmit: async (values, {resetForm}) => {
      await onAdd(values.name.trim());
      resetForm();
    },
  });

  const showError = formik.touched.name && formik.errors.name;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        name="name"
        placeholder="Имя участника"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.isSubmitting}
      />

      <Button
        type="submit"
        $loading={formik.isSubmitting}
        disabled={formik.isSubmitting}
      >
        Добавить
      </Button>

      {showError && <ErrorText>{formik.errors.name}</ErrorText>}
    </Form>
  );
};
