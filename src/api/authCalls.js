const key = "AIzaSyCptfHUWFblbyIojAbiusNkO_EC1c98_yk";

export const signUp = async (email, password) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );
  const data = await res.json();
  if (res.ok) {
    console.log("ok");
  } else {
    let errorMsg = "Auth Failed";
    const hasErrorMsg = data.error.message;
    if (hasErrorMsg) {
      errorMsg = hasErrorMsg;
    }
    alert(errorMsg);
    return false;
  }
};

export const signIn = async (email, password) => {
  
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      return data;
    } else {
      let errorMsg = "Auth Failed";
      const hasErrorMsg = data.error.message;
      if (hasErrorMsg) {
        errorMsg = hasErrorMsg;
      }
       console.log(errorMsg);
       alert(errorMsg);
    }
 
};

export const changePass = async (idToken, password) => {

  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
          password,
          returnSecureToken: false,
        }),
      }
    );
    const data = await res.json();
    console.log(data);

  } catch (error) {
    console.log(error);
  }
  
};
