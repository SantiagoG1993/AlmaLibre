const API_URL = 'http://localhost:8080/api/'

const AuthService = {

        login(email,password){
        const url = `${API_URL}login?email=${email}&password=${password}`;
        const options = { method: "POST", credentials: "include" };
        fetch(url, options)
            .then(res => {
            if (res.ok) {
                window.location.reload()
                return res;
            } else {
                throw new Error('Login request failed');
            }
            })
            .then(data => {
            console.log(data);
            })
            .catch(err => {
            console.error('Error logging in:', err);
            });
            },

        logout(){
            fetch(`${API_URL}logout`,{method:"POST",credentials:"include"})
            .then(res=>{
                if(!res.ok){
                throw new Error("Logout error")
                }else{
                console.log("Succesfully logout")
                window.location.reload()
                return res
                }
            })
            .then(data=>console.log(data))
            .then(err=>console.log(err))
        }
}
export default AuthService