import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { User } from "../../types/User";

export function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location]);

  return (
    <>
      {user ? (
            <h2>Olá, {user.name}</h2>
      ) : (
        <div>Usuário não encontrado.</div>
      )}
    </>
  );
}
