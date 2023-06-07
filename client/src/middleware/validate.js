export const validate = (form, errors, setErrors) => {
  if (form.name === "") {
    setErrors({ ...errors, name: "name is missing" });
  } else if (/\d/.test(form.name)) {
    setErrors({ ...errors, name: "name cannot contain a number" });
  } else {
    setErrors({ ...errors, name: "" });
  }
};
