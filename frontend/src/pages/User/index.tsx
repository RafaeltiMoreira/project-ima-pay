import { useLocation } from "react-router-dom";

export function UserPage() {
  const { state } = useLocation();
  const user = state?.user;

  return (
    <>
      {user ? (
        <>
          <h1>Olá, seja bem vindo (a) {user.name}</h1>
        </>
      ) : (
        <div>Usuário não encontrado.</div>
      )}
    </>
  );
}
