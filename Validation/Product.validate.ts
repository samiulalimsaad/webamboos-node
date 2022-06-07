import * as Yup from "yup";

export const productValidationSchema = Yup.object({
    price: Yup.number().required("price is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    productName: Yup.string().required("product Name required"),
    productQuantity: Yup.number().required("product quantity required"),
    paymentMethod: Yup.string().required("payment Method required"),
    address: Yup.string().required("address required"),
    status: Yup.string().required("status required").default('Inserted'),
});
