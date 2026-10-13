import Navbar from "../components/Navbar/Navbar.jsx";
import Button from "../components/Button/Button";
import SectionHeader from "../components/SectionHeader/SectionHeader.jsx";
import CourseTabs from "../components/CourseTabs/CourseTabs.jsx";
import CourseCard from "../components/CourseCard/CourseCard.jsx";
import Footer from "../components/Footer/Footer.jsx";

import "./Home.css";

import { useEffect, useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { useSelector } from "react-redux";
//import { courses } from "../data/courses";

function Home() {
  const categories = [
    "Semua Kelas",
    "Pemasaran",
    "Desain",
    "Pengembangan Diri",
    "Bisnis",
  ];

  const [activeTab, setActiveTab] = useState(categories[0]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const sortOptions = [
    { label: "Harga Rendah", value: "price_asc" },
    { label: "Harga Tinggi", value: "price_desc" },
    { label: "A to Z", value: "title_asc" },
    { label: "Z to A", value: "title_desc" },
    { label: "Rating Tertinggi", value: "rating_desc" },
    { label: "Rating Terendah", value: "rating_asc" },
  ];
  const { courses, loading } = useCourses({
    category: activeTab === categories[0] ? "" : activeTab,
    search,
    sort,
  });
  const hasLoaded = useSelector((state) => state.courses.hasLoaded);

  useEffect(() => {
    const timeout = window.setTimeout(() => setSearch(searchInput.trim()), 300);
    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  return (
    <>
      <Navbar showProfile showMenu />
      <section className="hero">
        <div className="home-header-container">
          <h1>
            Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video
            Interaktif!
          </h1>
          <p>
            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
            pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat
            berpartisipasi dalam latihan interaktif yang akan meningkatkan
            pemahaman Anda.
          </p>
          <div className="button-container">
            <Button class="hero" weight="medium">
              Temukan Video Course untuk Dipelajari!
            </Button>
          </div>
        </div>
      </section>
      <section className="content">
        <SectionHeader
          title="Koleksi Video Pembelajaran Unggulan"
          subtitle="Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!"
          class="home"
        />
        <CourseTabs
          categories={categories}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="course-controls">
          <div className="sort-control">
            <button
              className="sort-trigger"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((open) => !open)}
            >
              Urutkan <span className="sort-chevron" aria-hidden="true" />
            </button>
            {sortOpen && (
              <div className="sort-menu" role="listbox" aria-label="Urutkan kelas">
                {sortOptions.map((option) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={sort === option.value}
                    className={sort === option.value ? "sort-option selected" : "sort-option"}
                    key={option.value}
                    onClick={() => {
                      setSort(option.value);
                      setSortOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <label className="course-search">
            <span className="sr-only">Cari kelas</span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Cari Kelas"
            />
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.3" />
              <path d="m15.5 15.5 4.2 4.2" />
            </svg>
          </label>
        </div>
        <div className="course-list">
          {loading && !hasLoaded ? (
            <p className="empty-courses">Memuat kelas...</p>
          ) : (
            courses.map((course) => <CourseCard key={course.id} {...course} />)
          )}
        </div>
        {hasLoaded && !courses.length && <p className="empty-courses">Kelas tidak ditemukan.</p>}
      </section>
      <section className="newsletter">
        <div className="newsletter-container">
          <div className="newsletter-header">
            <p className="newsletter-info">NEWSLETTER</p>
            <div className="newsletter-title">
              <h1>Mau Belajar Lebih Banyak?</h1>
              <h2>
                Daftarkan dirimu untuk mendapatkan informasi terbaru dan
                penawaran spesial dari program-program terbaik hariesok.id
              </h2>
            </div>
          </div>
          <div className="newsletter-form">
            <input
              className="newsletter-input"
              type="email"
              placeholder="Masukkan Emailmu"
            />
            <Button class="newsletter">Subscribe</Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
