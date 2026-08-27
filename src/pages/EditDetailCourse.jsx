import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar.jsx";
import Input from "../components/InputField/Input";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import { getCourseById } from "../services/courseApi";
import { useCourses } from "../hooks/useCourses";

function EditDetailCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    mentor: "",
    job: "",
    company: "",
    price: "",
  });
  const { id } = useParams();

  const { editCourse } = useCourses();

  useEffect(() => {
    async function fetchCourse() {
      const data = await getCourseById(id);

      setFormData(data);
    }

    fetchCourse();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await editCourse(id, formData);

      navigate("/home");
    } catch (error) {
      console.error("Gagal update course:", error);
    }
  }
  return (
    <>
      <Navbar showMenu={true} />

      <Card title="Edit Kursus" subtitle="Kamu bisa Edit kursus mu disini">
        <form onSubmit={handleSubmit} className="form">
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
            label="Harga"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <div className="button-Container">
            <Button class="primary">Update</Button>
            <Button
              type="button"
              class="secondary"
              onClick={() => navigate("/editcourse")}
            >
              Go Back
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default EditDetailCourse;
