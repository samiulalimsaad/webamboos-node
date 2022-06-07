import * as Yup from "yup";

export const OrderValidationSchema = Yup.object({
    price: Yup.number().required("price is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    orderName: Yup.string().required("order Name required"),
    orderQuantity: Yup.number().required("order quantity required"),
    paymentMethod: Yup.string().required("payment Method required"),
    address: Yup.string().required("address required"),
    status: Yup.string().required("status required").default("Inserted"),
});
