
const CustomInput = ({
  type,
  label,
  className,
  id,
  placeholder,
  val,
  name,
  onChange,
}) => {
  return (
    <div class="form-floating mb-3">
      <input
        type={type}
        class={`form-control ${className}`}
        id={id}
        name={name}
        value={val}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onChange}
      />
      <label for="floatingInput">{label}</label>
    </div>
  );
};

export default CustomInput