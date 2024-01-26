import React from "react";
import { credentialsUser } from "./auth.model"
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import { Link } from "react-router-dom";


export default function FormAuth(props: formAuthProps){
    return(
      <Formik  initialValues={props.model} 
        onSubmit={props.onSubmit}>
            {formikProps =>(
                <Form>
                    <label>
                    username: <Field type="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </label>
                <label>
                  Password:
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </label>
                <button type="submit" disabled={formikProps.isSubmitting}>
                  Submit
                </button>
                <Link className="btn btn-secundary" to="/">Cancelar</Link>
                </Form>
            )}
      </Formik>
    )
}
interface formAuthProps{
    model: credentialsUser;
     onSubmit(valueS: credentialsUser, actions: FormikHelpers<credentialsUser>): void;
}