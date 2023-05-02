const authenticationMixin = {
    data() {
        return {
            email: '',
            password: '',
            fullName: '',
            confirmPassword: '',
            errors: {
                email: false,
                fullName: false,
                password: false,
                confirmPassword: false,
                isInvalidUser: false
            }
        }
    },
    methods: {
        changeForm() {
            this.$emit('setIsLogin');
        },
        showInvalidUserMessage(miliseconds) {
            this.errors.isInvalidUser = true;
            setTimeout(() => {
                this.errors.isInvalidUser = false;
            }, miliseconds)
        },
        verifyError(field) {
            if (field === 'email') {
                const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
                this.errors.email = !emailRegex.test(this.email) || this.password.length > 250;
            } else if (field === 'fullName') {
                this.errors.fullName = this.fullName.length < 1 || this.fullName.length > 250 || this.fullName.trim() === '';
            } else if (field === 'password') {
                const passwordRegex = /^\S{6,}$/
                this.errors.password = !passwordRegex.test(this.password) || this.password.length > 100;
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
