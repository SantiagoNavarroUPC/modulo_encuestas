import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [typeUser, setTipoUsuario] = useState('estudiantes');
    const navigate = useNavigate();

    // Manejo de login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/menu');
        } catch (error) {
            console.error(error.message);
            let errorMessage = "Hubo un error al iniciar sesión. Por favor, intenta de nuevo.";
    
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                errorMessage = "Correo y/o contraseña no registrados.";
            } else if (error.code === "auth/invalid-email" || error.code === "auth/weak-password") {
                errorMessage = "Por favor, proporciona un correo y/o contraseña válidos.";
            }
    
            alert(errorMessage);
        }
    };

    // Manejo de registro
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Crear usuario con Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar datos del usuario en Firestore
            await setDoc(doc(db, "usuarios", user.uid), {
                name: name,
                lastname: lastname,
                phone: phone,
                email: email,
                rol: 2, // Rol siempre será 2
                typeUser: typeUser// Tipo de usuario seleccionado
            });

            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            setIsActive(false); // Cerrar el formulario de registro
        } catch (error) {
            console.error(error.message);
            alert('Hubo un error al registrarse. Por favor, intenta de nuevo.');
        }
    };

    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    return (
        <div className="menu-body">
            <div className={`container ${isActive ? 'active' : ''}`} id="container">
                <div className="form-container sign-up">
                    <form onSubmit={handleRegister}> {/* Actualización del form para registro */}
                        <span>Ingresa tus datos personales</span>
                        <input type="text" placeholder="Nombre(s)" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="text" placeholder="Apellidos(s)" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                        <input type="text" placeholder="Celular" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <input type="email" placeholder="Correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        
                        <select value={typeUser} onChange={(e) => setTipoUsuario(e.target.value)} required>
                            <option value="administrativos">Administrativos</option>
                            <option value="profesores">Profesores</option>
                            <option value="estudiantes">Estudiantes</option>
                            <option value="empleadores">Empleadores</option>
                            <option value="egresados">Egresados</option>
                            <option value="directivos">Directivos</option>
                        </select>

                        <button type="submit">Registrarse</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleLogin}> {/* Actualización del form para login */}
                        <div className="logo-container">
                            <div className="logo"></div>
                        </div>
                        <h1>Iniciar sesión</h1>
                        <span>Ingresar sus credenciales</span>
                        <input type="email" placeholder="Correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <a href="#">Olvidaste tu contraseña?</a>
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Bienvenido!</h1>
                            <p>Ingrese sus datos personales para crear tu cuenta en el modulo de encuestas en Arcadia</p>
                            <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hola, Querido Upecista!</h1>
                            <p>Regístrese con sus datos personales para acceder al modulo de encuestas</p>
                            <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
