
const CustomInput = ({type, label, className, id, placeholder}) => {
  return (
    <div class="form-floating mb-3">
      <input
        type={type}
        class={`form-control ${className}`}
        id={id}
        placeholder={placeholder}
      />
      <label for="floatingInput">{label}</label>
    </div>
  );
}

export default CustomInput