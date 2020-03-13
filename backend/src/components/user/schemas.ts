import * as Yup from "yup";

const addUser = Yup.object().shape({
  userId: Yup.string().required("userId is required")
});

export { addUser };
