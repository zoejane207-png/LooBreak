import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();
  function HomeRedirect() {
    navigate("/");
  }

  return (
    <button onClick={HomeRedirect} className="home" aria-label="home">
      Home
    </button>
  );
}
