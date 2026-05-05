export const validateStep = (step: string, form: any) => {
    switch (step) {
        case "name":
            if (!form.name || form.name.trim().length < 3) {
                return {
                isValid: false,
                error: "Digite seu nome completo",
                };
            }

            return { isValid: true, error: "" };
        case "nickname":
            if (!form.nickname || form.nickname.trim().length < 3) {
                return {
                isValid: false,
                error: "Digite um nome de usuário",
                };
            }

            return { isValid: true, error: "" };
        case "email":
            if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
                return {
                isValid: false,
                error: "Digite um email válido",
                };
            }

            return { isValid: true, error: "" };
        case "password":
            if (!form.password || form.password.length < 6) {
                return {
                isValid: false,
                error: "A senha deve conter no mínimo 6 caracteres",
                };
            }

            return { isValid: true, error: "" };
        case "confirmationPassword":
            if (form.confirmationPassword !== form.password) {
                return {
                isValid: false,
                error: "As senhas não coincidem",
                };
            }

            return { isValid: true, error: "" };
        default:
            return { isValid: true, error: "" };
    }
};