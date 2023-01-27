class Validation {
    Validation() { }
    alphanumeric = (name) => { const regex = new RegExp(/^[a-z0-9\s]+$/,'gi'); if (regex.test(name)) { return true; } else { return 'Please enter an alphanumeric string'; } };
    numeric = (id) => { const regex = new RegExp(/^[0-9]+$/,'gi'); if (regex.test(id)) { return true; } else { return 'Please enter a number'; } };
    email = (email) => { const regex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/,'gi'); if (regex.test(email)) { return true; } else { return 'Please enter a valid email address'; } };
}

export default Validation;