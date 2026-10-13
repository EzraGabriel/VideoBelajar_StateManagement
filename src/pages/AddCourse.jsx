import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar.jsx";
import Input from "../components/InputField/Input";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";

import "./AddCourse.css";
import { useState } from "react";
import { useCourses } from "../hooks/useCourses.js";
import { clearSession } from "../utils/auth.js";

function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    mentor: "",
    job: "",
    company: "",
    rating: 0,
    totalReview: 0,
    price: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { addNewCourse } = useCourses();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    try {
      await addNewCourse(formData);

      navigate("/home");
    } catch (error) {
      console.error("Gagal menambahkan course:", error);
      if (error.response?.status === 401) {
        clearSession();
        navigate("/", {
          replace: true,
          state: { message: "Sesi login sudah tidak berlaku. Silakan masuk kembali." },
        });
        return;
      }
      setErrorMessage(
        error.response?.data?.message || "Kelas gagal ditambahkan. Silakan coba lagi.",
      );
    }
  }

  const navigate = useNavigate();
  return (
    <>
      <Navbar showMenu={true} />

      <Card
        title="Tambah Kursus"
        subtitle="Yuk, tambah kursusmu di videobelajar."
      >
        <form onSubmit={handleSubmit} className="form">
          {errorMessage && <p className="auth-message" role="alert">{errorMessage}</p>}
          <Input
            name="title"
            type="text"
            label="Judul Course"
            required
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            label="Deskripsi"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <div className="select-container">
            <label htmlFor="category">Kategori</label>
            <select
              className="selectCategory"
              name="category"
              placeholder="Pilih Kategori"
              required
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>Pilih kategori</option>
              <option value="Pemasaran">Pemasaran</option>
              <option value="Desain">Desain</option>
              <option value="Pengembangan Diri">Pengembangan Diri</option>
              <option value="Bisnis">Bisnis</option>
            </select>
          </div>

          <Input
            required
            label="Mentor"
            name="mentor"
            value={formData.mentor}
            onChange={handleChange}
          />

          <Input
            required
            label="Pekerjaan"
            name="job"
            value={formData.job}
            onChange={handleChange}
          />
          <Input
            required
            label="Perusahaan"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />

          <Input
            required
            type="number"
            label="Harga"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <div className="button-Container">
            <Button class="primary">Tambah</Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default AddCourse;
