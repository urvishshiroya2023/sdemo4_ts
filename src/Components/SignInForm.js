import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';


const SignInForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        userName: Yup.string().required('Please enter your user name'),
        password: Yup.string().required('Please enter your password'),
    });

    const initialValues = {
        userName: '',
        password: '',
        rememberMe: false,
    };


    const getAuthToken = async (email, password) => {
        try {
            const response = await axios.post('https://crmapi.sarvadhi.work/api/v1/crm/user/login', {
                email: email,
                password: password,
            });

            const authToken = response.data.token;

            localStorage.setItem('authToken', authToken);

            return authToken;
        } catch (error) {
            console.error('Error getting authentication token:', error.response ? error.response.data : error.message);
            throw error;
        }
    };


    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        try {
            const authToken = await getAuthToken(values.userName, values.password);
            const headers = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };

            toast.success('Login successful!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });

            resetForm();

            navigate('/homepage');

        } catch (error) {
            console.error('Error making authenticated request:', error.response ? error.response.data : error.message);

            toast.error('Login failed. Please check your credentials.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }

        setSubmitting(false);
    };

    return (
        <div className='xl:min-w-[450px] px-8'>
            <div className="mb-8">
                <h3 className="mb-1 text-2xl font-semibold tracking-wide">Welcome back!</h3>
                <p className='text-[#6B7280] font-light text-sm tracking-wide'>Please enter your credentials to sign in!</p>
            </div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="max-w-md mx-auto mt-8">
                            <div className="mb-5">
                                <label htmlFor="userName" className="block text-[#6B7280] text-sm font-semibold mb-2">
                                    User Name
                                </label>
                                <Field
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    placeholder="User Name"
                                    className={`relative font-light  appearance-none border ${errors.userName && touched.userName ? 'border-red-500 border-2' : ''
                                        } rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-indigo-500 focus:border-2 focus:outline-none focus:shadow-outline`}
                                />
                                <ErrorMessage name="userName" component="p" className="absolute text-red-500 text-xs " />
                            </div>

                            <div className="mb-5 relative">
                                <label htmlFor="password" className="block text-[#6B7280] text-sm font-semibold mb-2">
                                    Password
                                </label>
                                <Field
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Password"
                                    name="password"
                                    className={`relative font-light  appearance-none border ${errors.password && touched.password ? 'border-red-500 border-2' : ''
                                        } rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-indigo-500 focus:border-2 focus:outline-none focus:shadow-outline `}
                                />
                                <div
                                    className="absolute inset-y-0 right-0 top-4 pr-3 pt-3 flex items-center cursor-pointer"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? (
                                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                    ) : (
                                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                                    )}
                                </div>
                                <ErrorMessage name="password" component="p" className="absolute text-red-500 text-xs " />
                            </div>

                            <div className="mb-4">
                                <label className="flex items-center">
                                    <Field type="checkbox" name="rememberMe" className="mr-2" />
                                    <span className="text-sm">Remember Me</span>
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded h-11 px-8 py-2 w-full"
                                    disabled={isSubmitting}
                                >
                                    Sign In
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div class="mt-4 text-center">
                <span>Onboard your organization </span>
                <Link className='text-indigo-600 hover:underline' to={"/onboarduser"}><span className="text-indigo-700">Onboarding...</span></Link>
            </div>
        </div>
    );
};

export default SignInForm;