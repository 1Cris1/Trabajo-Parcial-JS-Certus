window.addEventListener('load', () => {
    const formulario = document.querySelector('#formulario');
    const usuario = document.getElementById('usuario');
    const direccion = document.getElementById('direccion');
    const numero = document.getElementById('celular');
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');
    const passConfirma = document.getElementById('passConfirma');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validarCampos()) {
            // Si la validación es exitosa, redirige a la página de validación exitosa
            window.location.href = "validacion_exitosa.html";
        }
    });

    const validarCampos = () => {
        const valorUsuario = usuario.value.trim();
        const valorEmail = email.value.trim();
        const valorDireccion = direccion.value.trim();
        const valorNumero = numero.value.trim();
        const valorPass = pass.value.trim();
        const valorPassConfirma = passConfirma.value.trim();

        // Validando nombre de usuario (solo letras)
        const letrasRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
        if (!valorUsuario) {
            validarFalla(usuario, 'Campo vacío');
        } else if (!letrasRegex.test(valorUsuario)) {
            validarFalla(usuario, 'Ingrese solo letras en el nombre de usuario');
        } else {
            validarOk(usuario);
        }

        // Validando dirección
        if (!valorDireccion) {
            validarFalla(direccion, 'Campo vacío');
        } else {
            validarOk(direccion);
        }

        // Validando número de celular (solo números)
        const numerosRegex = /^[0-9]+$/;
        if (!valorNumero) {
            validarFalla(numero, 'Campo vacío');
        } else if (!numerosRegex.test(valorNumero)) {
            validarFalla(numero, 'Ingrese solo números en el número de celular');
        } else {
            validarOk(numero);
        }

        // Validando correo electrónico
        if (!valorEmail) {
            validarFalla(email, 'Campo vacío');
        } else if (!validarEmail(valorEmail)) {
            validarFalla(email, 'El correo electrónico no es válido');
        } else {
            validarOk(email);
        }

        // Validando contraseña (al menos 1 carácter especial y 1 mayúscula)
        const passRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/;
        if (!valorPass) {
            validarFalla(pass, 'Campo vacío');
        } else if (!passRegex.test(valorPass)) {
            validarFalla(pass, 'Debe tener al menos 1 carácter especial y 1 mayúscula');
        } else if (valorPass !== valorPassConfirma) {
            validarFalla(passConfirma, 'Las contraseñas no coinciden');
        } else {
            validarOk(pass);
            validarOk(passConfirma);
            return true;
        }
        return false;
    };

    const validarFalla = (input, mensaje) => {
        const controlFormulario = input.parentElement;
        const aviso = controlFormulario.querySelector('p');
        aviso.innerText = mensaje;
        controlFormulario.className = 'form-control falla';
    };

    const validarOk = (input) => {
        const controlFormulario = input.parentElement;
        controlFormulario.className = 'form-control ok';
    };

    const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
});