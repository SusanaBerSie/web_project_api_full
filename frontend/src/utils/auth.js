const BASE_URL = "http://api.apptravel.chickenkiller.com";
export async function loginUser(email, password) {
  return fetch(BASE_URL + "/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      console.error("Error al cargar el usuario:", error);
      switch (error.status) {
        case 400:
          console.log({
            message: "No se ha proporcionado uno o más campos",
          });
          break;
        case 401:
          console.log({
            message:
              "No se ha encontrado al usuario con el correo electrónico especificado",
          });
          break;
      }
    });
}

export async function registerUser(email, password) {
  return fetch(BASE_URL + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      console.error("Error al registrar el usuario:", error);
    });
}

export async function checkToken(token) {
  return fetch(BASE_URL + "/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      console.error("Error al cargar el usuario:", error);
      switch (error.status) {
        case 400:
          console.log({
            message:
              "Token no proporcionado o proporcionado en el formato incorrecto",
          });
          break;
        case 401:
          console.log({
            message: "El token provisto es inválido",
          });
          break;
      }
    });
}
