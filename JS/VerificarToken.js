async function Ping(){
    let result;
    await fetch(url + "Auth", {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`}
    }).then((r) => result = r.status);
            
    if(result === 200){
        return console.log("Autenticado")
    }
    if(window.location.href.split('/')[3] != 'login.html') window.location.replace("login.html");
};

Ping();