import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {
                ...form,
            });
            message(data.message);
        } catch (e) {}
    };
    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {
                ...form,
            });
            message(data.message);
            auth.login(data.token, data.userId);
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Project</h1>
                <div
                    className="card blue darken-1"
                    style={{ borderRadius: 15 }}
                >
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action" style={{ borderRadius: 15 }}>
                        <button
                            className="btn yellow darken-4"
                            style={{ marginRight: 10 }}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};