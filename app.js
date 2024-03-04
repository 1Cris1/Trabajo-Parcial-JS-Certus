window.addEventListener('load', () => {
    const formulario = document.querySelector('#formulario');
    const usuario = document.getElementById('usuario');
    const direccion = document.getElementById('direccion');
    const numero = document.getElementById('celular'); // Suponiendo que 'numero' es el ID para el campo de número de teléfono
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');
    const passConfirma = document.getElementById('passConfirma');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        validarCampos();
    });

    const validarCampos = () => {
        const valorUsuario = usuario.value.trim();
        const valorEmail = email.value.trim();
        const valorDireccion = direccion.value.trim();
        const valorNumero = numero.value.trim(); // Actualizado a 'numero'
        const valorPass = pass.value.trim();
        const valorPassConfirma = passConfirma.value.trim();

        // Validando campo usuario
        if (!valorUsuario) {
            validarFalla(usuario, 'Campo vacío');
        } else {
            validarOk(usuario);
        }

        // Validando campo email
        if (!valorEmail) {
            validarFalla(email, 'Campo vacío');
        } else if (!validarEmail(valorEmail)) {
            validarFalla(email, 'El correo electrónico no es válido');
        } else {
            validarOk(email);
        }

        // Validando dirección
        if (!valorDireccion) {
            validarFalla(direccion, 'Campo vacío');
        } else {
            validarOk(direccion);
        }

        // Validando número
        if (!valorNumero) {
            validarFalla(numero, 'Campo vacío');
        } else if (!validarNumero(valorNumero)) {
            validarFalla(numero, 'El número de celular no es válido');
        } else {
            validarOk(numero);
        }

        // Validando campo contraseña
        const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
        if (!valorPass) {
            validarFalla(pass, 'Campo vacío');
        } else if (valorPass.length < 8) {
            validarFalla(pass, 'Debe tener 8 caracteres como mínimo.');
        } else if (!valorPass.match(er)) {
            validarFalla(pass, 'Debe tener al menos una mayúscula, una minúscula y un número.');
        } else {
            validarOk(pass);
        }

        // Validando campo Confirmar Contraseña
        if (!valorPassConfirma) {
            validarFalla(passConfirma, 'Confirme su contraseña');
        } else if (valorPass !== valorPassConfirma) {
            validarFalla(passConfirma, 'Las contraseñas no coinciden');
        } else {
            validarOk(passConfirma);
        }
    };

    const validarOk = (input) => {
        const controlFormulario = input.parentElement;
        controlFormulario.className = 'form-control ok';
    };

    const validarEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    };

    const validarNumero = (numero) => {
        return /^[0-9]{10}$/.test(numero);
        //return true; //validación real
    };
});