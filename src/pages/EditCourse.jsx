import Navbar from "../components/Navbar/Navbar.jsx";
import Card from "../components/Card/Card.jsx";
import { useNavigate } from "react-router-dom";

import "./EditCourse.css";

import { useCourses } from "../hooks/useCourses";

function EditCourse() {
  const navigate = useNavigate();

  const { courses, removeCourse } = useCourses();

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus course ini?",
    );

    if (!confirmDelete) {
      return;
    }
    try {
      await removeCourse(id);

      console.log("Course berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus course:", error);
    }
  }

  return (
    <>
      <Navbar showMenu={true} />
      <Card title="Edit Kursus" subtitle="Anda bisa Mengedit Kursus di sini">
        <div className="course-container-list">
          <h3>Daftar Kursus</h3>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <div className="course-detail">
                  <p>{course.title}</p>
                  <p>{course.description}</p>
                  <p>Harga: Rp{course.price}K</p>
                  <p>Mentor: {course.mentor}</p>
                  <p>Perusahaan: {course.company}</p>
                  <p>Rating: {course.rating}</p>
                  <div className="course-actions">
                    <button
                      type="button"
                      onClick={() => navigate(`/course/edit/${course.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(course.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </>
  );
}

export default EditCourse;
