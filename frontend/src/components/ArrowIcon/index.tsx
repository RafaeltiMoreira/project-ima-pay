import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

export function ArrowIcon() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleClick}>
      <FaChevronLeft className={styles.icon} />
    </button>
  );
}
