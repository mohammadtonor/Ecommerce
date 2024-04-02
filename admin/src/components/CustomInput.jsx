
const CustomInput = ({
  type,
  label,
  className,
  id,
  placeholder,
  val,
  name,
  onChange,
  onBlur,
  defVal
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
        defaultValue={defVal}
      />
      <label for="floatingInput">{label}</label>
    </div>
  );
};

export default CustomInput