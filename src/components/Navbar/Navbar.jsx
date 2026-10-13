import logo from "../../assets/Logo (1).png";
import Avatar from "../../assets/Avatar.png";
import hamburger from "../../assets/Hamberger.png";

import "./Navbar.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearSession, getSession, saveSession } from "../../utils/auth";
import { getApiOrigin, getAuthError, uploadProfileImage } from "../../services/authApi";

export default function Navbar({ showMenu = false }) {
  const [openProfile, setOpenProfile] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(() => {
    const image = getSession()?.user?.profile_image;
    return image ? `${getApiOrigin()}${image}` : Avatar;
  });
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const session = getSession();

  async function handleImageChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploadMessage("");
    setUploading(true);
    try {
      const imagePath = await uploadProfileImage(file, session?.token);
      const imageUrl = `${getApiOrigin()}${imagePath}`;
      const currentSession = getSession();
      saveSession({ ...currentSession, user: { ...currentSession.user, profile_image: imagePath } });
      setAvatarUrl(imageUrl);
      setUploadMessage("Foto profile berhasil diperbarui.");
    } catch (error) {
      setUploadMessage(getAuthError(error));
    } finally {
      setUploading(false);
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/home" className="logo-wrapper">
          <img src={logo} alt="Video Belajar Logo" className="logo" />
        </a>
        {showMenu && (
          <div className="navbar-right">
            <ul className="nav-menu">
              <li>
                <a href="#">Kategori</a>
              </li>
              <li className="profile-wrapper">
                <button
                  className="profile-button"
                  onClick={() => setOpenProfile(!openProfile)}
                  type="button"
                >
                  <img src={avatarUrl} alt="Profile" className="profile" />
                </button>
                {openProfile && (
                  <div className="profile-dropdown">
                    <button type="button" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
                      {uploading ? "Mengunggah..." : "Ganti foto profile"}
                    </button>
                    <input
                      ref={fileInputRef}
                      className="profile-file-input"
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={handleImageChange}
                    />
                    {uploadMessage && <p className="profile-upload-message" role="status">{uploadMessage}</p>}
                    <a href="#">Profile</a>
                    <a href="#">Kelas Saya</a>
                    <a href="/addcourse">Tambah Kelas</a>
                    <a href="/editcourse">Edit Kelas</a>
                    <button type="button" onClick={() => { clearSession(); navigate("/", { replace: true }); }}>Logout{session?.user?.name ? ` (${session.user.name})` : ""}</button>
                  </div>
                )}
              </li>
            </ul>
            <button className="hamburger" type="button">
              <img src={hamburger} alt="Menu" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
