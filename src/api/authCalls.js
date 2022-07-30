export const signUp = async (email, password) => {
  const key = "AIzaSyCptfHUWFblbyIojAbiusNkO_EC1c98_yk";
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
    if (res.ok){
      console.log('ok');
    } else {
      let errorMsg = "Auth Failed";
        const hasErrorMsg = data.error.message;
        if (hasErrorMsg) {
          errorMsg = hasErrorMsg;
        }
        alert(errorMsg);
    }
};

export const signIn = async (email, password) => {
      try {
              const key = "AIzaSyCptfHUWFblbyIojAbiusNkO_EC1c98_yk";
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
                throw new Error(errorMsg);
              }
      } catch (e) {
            console.log(e.message);
            alert(e.message);
      }

};
