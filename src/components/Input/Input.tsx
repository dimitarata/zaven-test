import { useField, ErrorMessage } from "formik";

const Input = (props) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
        type="text"
        {...field}
        {...props}
      />
      <ErrorMessage component="div" className="error" name={field.name} />
    </div>
  );
};

export default Input;
