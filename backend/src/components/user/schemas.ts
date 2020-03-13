import * as Yup from "yup";

const addUser = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).max(16).required("Password is required")
});

export { addUser };
