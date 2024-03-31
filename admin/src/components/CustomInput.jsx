
const CustomInput = ({
  type,
  label,
  className,
  id,
  placeholder,
  val,
  name,
  onChange,
  onBlur
}) => {
  return (
    <div class="form-floating">
      <input
        type={type}
        class={`form-control ${className}`}
        id={id}
        name={name}
        value={val}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label for="floatingInput">{label}</label>
    </div>
  );
};

export default CustomInput