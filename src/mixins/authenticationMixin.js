const authenticationMixin = {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            errors: {
                email: false,
                password: false,
                confirmPassword: false
            }
        }
    },
    methods: {
        changeForm() {
            this.$emit('setIsLogin');
        },
        verifyError(field) {
            if (field === 'email') {
                const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
                this.errors.email = !emailRegex.test(this.email);
            } else if (field === 'password') {
                const passwordRegex = /^\S{6,}$/
                this.errors.password = !passwordRegex.test(this.password);
            } else {
                this.errors.confirmPassword = this.confirmPassword !== this.password;
            }
        },
        debounceField(field) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.verifyError(field);
            }, 500);
        },
    }
}

export default authenticationMixin;
