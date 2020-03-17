import * as Yup from "yup";

const addUserSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).max(16).required("Password is required")
});

const activateUserSchema = Yup.object().shape({
  userId: Yup.string().required("userId is required")
});

const archiveUserSchema = Yup.object().shape({
  userId: Yup.string().required("userId is required")
});

export { addUserSchema, activateUserSchema, archiveUserSchema };
