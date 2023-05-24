import { Button } from "antd";
import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const cls = visible ? "visible" : "hidden";

  return (
    <header className={`header-container ${cls}`}>
      <Link to="/">
        <img className="header-item" src="./src/assets/images/logo-imiu.svg" />
      </Link>
      <Link to="/" className="header-item">
        Trang chủ
      </Link>
      <Link to="/pricing" className="header-item">
        Các gói dịch vụ
      </Link>
      <Link to="/how-to-use" className="header-item">
        Hướng dẫn sử dụng
      </Link>
      <div className="header-item last">
        <Link to="/register">
          <Button type="primary">
            <b>Bắt đầu</b>
          </Button>
        </Link>
        <Link to="/login">
          <Button>Đăng nhập</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
