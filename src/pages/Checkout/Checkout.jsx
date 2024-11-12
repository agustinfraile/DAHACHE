import styles from './Checkout.module.css';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { cart } = useCart();
    const [isApartment, setIsApartment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(''); // Estado para el método de pago

    const subtotal = cart.reduce((total, item) =>
        paymentMethod === 'Efectivo' || paymentMethod === 'Transferencia'
            ? total + item.precio_contado * item.quantity
            : total + item.precio_venta * item.quantity,
        0
    );

    const total = subtotal; // No se incluye el costo de envío

    const initialValues = {
        metodoPago: '',
        nombre: '',
        apellido: '',
        celular: '',
        provincia: '',
        localidad: '',
        direccionPostal: '',
        direccion: '',
        numeracion: '',
        esDepartamento: false,
        piso: '',
        departamento: '',
        observaciones: '',
    };

    const validationSchema = Yup.object({
        metodoPago: Yup.string().required('Seleccione un método de pago'),
        nombre: Yup.string()
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y acentos')
            .required('Requerido'),
        apellido: Yup.string()
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y acentos')
            .required('Requerido'),
        celular: Yup.string()
            .matches(/^[0-9]+$/, 'Solo se permiten números')
            .required('Requerido'),
        provincia: Yup.string()
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y acentos')
            .required('Requerido'),
        localidad: Yup.string()
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y acentos')
            .required('Requerido'),
        direccionPostal: Yup.string()
            .matches(/^[a-zA-Z0-9\s]+$/, 'Solo se permiten letras y números')
            .required('Requerido'),
        direccion: Yup.string()
            .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras, acentos y números')
            .required('Requerido'),
        numeracion: Yup.string()
            .matches(/^[0-9]+$/, 'Solo se permiten números')
            .required('Requerido'),
        piso: Yup.string()
            .when('esDepartamento', {
                is: true,
                then: Yup.string().matches(/^[0-9]+$/, 'Solo se permiten números').required('Requerido'),
            }),
        departamento: Yup.string()
            .when('esDepartamento', {
                is: true,
                then: Yup.string().matches(/^[0-9a-zA-Z]+$/, 'Solo se permiten letras y números').required('Requerido'),
            }),
        observaciones: Yup.string().matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/, 'Solo se permiten letras, acentos y números'),
    });

    const handleSubmit = (values) => {
        console.log('Orden realizada:', values);
        alert('Orden realizada!');
    };

    return (
        <div className={styles.checkoutContainer}>
            {/* Botón para seguir comprando */}
            <div className={styles.backToShopping}>
                <Link to="/" className={styles.continueShoppingButton}>Seguir Comprando</Link>
            </div>

            <div className={styles.formContainer}>
                <h2>Checkout</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form className={styles.checkoutForm}>
                            <div className={styles.formGroup}>
                                <label>Método de Pago</label>
                                <Field
                                    as="select"
                                    name="metodoPago"
                                    onChange={(e) => {
                                        setFieldValue('metodoPago', e.target.value);
                                        setPaymentMethod(e.target.value);
                                    }}
                                    className={styles.selectField}
                                >
                                    <option value="">Seleccione un método</option>
                                    <option value="Debito">Débito</option>
                                    <option value="Credito">Crédito</option>
                                    <option value="Transferencia">Transferencia</option>
                                    <option value="Efectivo">Efectivo</option>
                                </Field>
                                <ErrorMessage name="metodoPago" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Nombre</label>
                                <Field type="text" name="nombre" />
                                <ErrorMessage name="nombre" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Apellido</label>
                                <Field type="text" name="apellido" />
                                <ErrorMessage name="apellido" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Celular</label>
                                <Field type="text" name="celular" />
                                <ErrorMessage name="celular" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Provincia</label>
                                <Field type="text" name="provincia" />
                                <ErrorMessage name="provincia" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Localidad</label>
                                <Field type="text" name="localidad" />
                                <ErrorMessage name="localidad" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Código Postal</label>
                                <Field type="text" name="direccionPostal" />
                                <ErrorMessage name="direccionPostal" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Calle</label>
                                <Field type="text" name="direccion" />
                                <ErrorMessage name="direccion" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Numeración</label>
                                <Field type="text" name="numeracion" />
                                <ErrorMessage name="numeracion" component="div" className={styles.error} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>
                                    <Field type="checkbox" name="esDepartamento" checked={values.esDepartamento} onChange={() => {
                                        setFieldValue('esDepartamento', !values.esDepartamento);
                                        setIsApartment(!values.esDepartamento);
                                    }} />
                                    ¿Es un departamento?
                                </label>
                            </div>

                            {isApartment && (
                                <>
                                    <div className={styles.formGroup}>
                                        <label>Piso</label>
                                        <Field type="text" name="piso" />
                                        <ErrorMessage name="piso" component="div" className={styles.error} />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Departamento</label>
                                        <Field type="text" name="departamento" />
                                        <ErrorMessage name="departamento" component="div" className={styles.error} />
                                    </div>
                                </>
                            )}

                            <div className={styles.formGroup}>
                                <label>Observaciones</label>
                                <Field as="textarea" name="observaciones" />
                                <ErrorMessage name="observaciones" component="div" className={styles.error} />
                            </div>

                            <button type="submit" className={styles.placeOrderButton}>
                                Realizar pedido vía WhatsApp
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className={styles.orderSummary}>
                <h2>Resumen de Orden</h2>
                <div className={styles.orderItems}>
                    {cart.map((item) => (
                        <div key={item._id} className={styles.orderItem}>
                            <span>{item.nombre} x{item.quantity}</span>
                            {paymentMethod === 'Efectivo' || paymentMethod === 'Transferencia' ? (
                                <span>
                                    <span className={styles.strikethrough}>${item.precio_venta.toFixed(2)}</span>
                                    <span className={styles.discountedPrice}> ${item.precio_contado.toFixed(2)}</span>
                                </span>
                            ) : (
                                <span>${(item.precio_venta * item.quantity).toFixed(2)}</span>
                            )}
                        </div>
                    ))}
                </div>
                <hr />
                <div className={styles.summaryDetails}>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRowTotal}>
                        <strong>Total</strong>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
