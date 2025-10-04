import React, { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

export default function CourseDetailPage(props) {
    const {
        courseTitle = "Integración de Elementos 3D",
        courseDescription = "La integración de elementos tridimensionales (3D) en el diseño web está ganando popularidad, ofreciendo una experiencia visualmente atractiva e inmersiva.",
        courseContent = "La integración de elementos tridimensionales (3D) en el diseño web está ganando popularidad, ofreciendo una experiencia visualmente atractiva e inmersiva. Este enfoque permite a los diseñadores crear interfaces más dinámicas e interactivas que pueden capturar mejor la atención del usuario y proporcionar una experiencia de usuario más atractiva.\n\nLos elementos 3D se pueden implementar a través de varias tecnologías como WebGL, Three.js y transformaciones CSS 3D. Estas tecnologías permiten la creación de modelos 3D realistas, animaciones y elementos interactivos que se pueden integrar perfectamente en aplicaciones web.",
        courseImage = "https://images.unsplash.com/photo-1592478411213-6153e4c4c8f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        author = "María González",
        level = "Principiante",
        lessonsCount = 22,
        language = "Español",
        subtitles = "Español, Inglés, Portugués, Alemán, Francés, Italiano, Polaco, Holandés",
        price = "$99.99",
        backgroundColor = "#ffffff",
        textColor = "#1f2937",
        accentColor = "#000000",
        onBackToCourses,
        onBuyNow,
        onNextCourse,
        // Configurable links
        backToCoursesText = "VOLVER A CURSOS",
        buyNowText = "ACCESAR",
        nextCourseText = "SIGUIENTE CURSO",
        backToCoursesUrl = "#",
        buyNowUrl = "#",
        nextCourseUrl = "#",
        // Course lessons data
        showLessons = false,
        lessons = [],
        onStartLessons,
    } = props

    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [currentLesson, setCurrentLesson] = useState(0)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    const handleImageLoad = () => {
        setIsImageLoaded(true)
    }

    const handleBackClick = () => {
        if (onBackToCourses) {
            onBackToCourses()
        }
    }

    const handleBuyNowClick = () => {
        if (onBuyNow) {
            onBuyNow()
        }
    }

    const handleNextCourseClick = () => {
        if (onNextCourse) {
            onNextCourse()
        }
    }

    const handleStartLessons = () => {
        if (onStartLessons) {
            onStartLessons()
        }
    }

    const handleLessonClick = (lessonIndex) => {
        setCurrentLesson(lessonIndex)
        setIsVideoLoaded(false)
    }

    const handleVideoLoad = () => {
        setIsVideoLoaded(true)
    }

    const handleNextLesson = () => {
        if (currentLesson < lessons.length - 1) {
            setCurrentLesson(currentLesson + 1)
            setIsVideoLoaded(false)
        }
    }

    const handlePrevLesson = () => {
        if (currentLesson > 0) {
            setCurrentLesson(currentLesson - 1)
            setIsVideoLoaded(false)
        }
    }

    return (
        <div style={{
            backgroundColor: backgroundColor,
            minHeight: "100vh",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            color: textColor,
            padding: "0",
            margin: "0",
        }}>
            <style>{`
                @media (max-width: 768px) {
                    .course-detail-container {
                        padding: 16px !important;
                    }
                    .course-image {
                        height: 250px !important;
                        margin-bottom: 24px !important;
                    }
                    .content-layout {
                        flex-direction: column !important;
                        gap: 24px !important;
                    }
                    .sidebar {
                        width: 100% !important;
                        min-width: auto !important;
                        position: static !important;
                        order: 1 !important;
                    }
                    .main-content {
                        order: 2 !important;
                    }
                    .course-title {
                        font-size: 24px !important;
                    }
                    .course-description {
                        font-size: 16px !important;
                    }
                    .course-content {
                        font-size: 14px !important;
                    }
                    .sidebar-title {
                        font-size: 18px !important;
                    }
                    .detail-item {
                        padding: 10px 0 !important;
                    }
                    .buy-button {
                        padding: 14px 20px !important;
                        font-size: 15px !important;
                    }
                }
                @media (max-width: 480px) {
                    .course-detail-container {
                        padding: 12px !important;
                    }
                    .course-image {
                        height: 200px !important;
                        border-radius: 8px !important;
                    }
                    .course-title {
                        font-size: 22px !important;
                    }
                    .sidebar {
                        padding: 16px !important;
                    }
                    .buy-button {
                        padding: 12px 16px !important;
                        font-size: 14px !important;
                    }
                }
            `}</style>
            {/* Header */}
            <div style={{
                padding: "24px 32px",
                borderBottom: "1px solid #e5e7eb",
            }}>
                {backToCoursesUrl && backToCoursesUrl !== "#" ? (
                    <a
                        href={backToCoursesUrl}
                        style={{
                            background: "none",
                            border: "none",
                            color: textColor,
                            fontSize: "16px",
                            fontWeight: "500",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 0",
                            transition: "opacity 0.2s ease",
                            textDecoration: "none",
                        }}
                    >
                        ← {backToCoursesText}
                    </a>
                ) : (
                    <button
                        onClick={handleBackClick}
                        style={{
                            background: "none",
                            border: "none",
                            color: textColor,
                            fontSize: "16px",
                            fontWeight: "500",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 0",
                            transition: "opacity 0.2s ease",
                        }}
                    >
                        ← {backToCoursesText}
                    </button>
                )}
            </div>

            {/* Main Content */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "16px 20px",
            }}>
                {/* Course Image */}
                <div style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "32px",
                    position: "relative",
                    backgroundColor: "#f3f4f6",
                }}>
                    <img
                        src={courseImage}
                        alt={courseTitle}
                        onLoad={handleImageLoad}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: isImageLoaded ? 1 : 0,
                            transition: "opacity 0.3s ease",
                        }}
                    />
                    {!isImageLoaded && (
                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#9ca3af",
                            fontSize: "16px",
                        }}>
                            Cargando imagen...
                        </div>
                    )}
                </div>

                {/* Content Layout */}
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "48px",
                    alignItems: "flex-start",
                }}>
                    {/* Main Content */}
                    <div style={{
                        flex: "1",
                        minWidth: "0",
                    }}>
                        <h1 style={{
                            fontSize: "32px",
                            fontWeight: "700",
                            marginBottom: "16px",
                            lineHeight: "1.2",
                        }}>
                            {courseTitle}
                        </h1>
                        
                        <p style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "24px",
                            lineHeight: "1.5",
                            color: "#4b5563",
                        }}>
                            {courseDescription}
                        </p>

                        <div style={{
                            fontSize: "16px",
                            lineHeight: "1.6",
                            color: "#374151",
                        }}>
                            {courseContent.split('\n').map((paragraph, index) => (
                                <p key={index} style={{
                                    marginBottom: "16px",
                                }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Course Details Sidebar */}
                    <div style={{
                        width: "320px",
                        minWidth: "280px",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        padding: "24px",
                        position: "sticky",
                        top: "32px",
                    }}>
                        <h2 style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginBottom: "24px",
                            color: textColor,
                        }}>
                            Detalles del Curso
                        </h2>

                        {/* Course Details List */}
                        <div style={{
                            marginBottom: "32px",
                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Instructora</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{author}</span>
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Nivel</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{level}</span>
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Lecciones</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{lessonsCount}</span>
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Idioma</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{language}</span>
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                    flex: "0 0 auto",
                                    marginRight: "16px",
                                }}>Subtítulos</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                    textAlign: "right",
                                    lineHeight: "1.4",
                                }}>{subtitles}</span>
                            </div>
                        </div>

                        {/* Buy Now Button */}
                        {showLessons ? (
                            <button
                                onClick={handleStartLessons}
                                style={{
                                    width: "100%",
                                    backgroundColor: accentColor,
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "16px 24px",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    marginBottom: "16px",
                                }}
                            >
                                {buyNowText}
                            </button>
                        ) : buyNowUrl && buyNowUrl !== "#" ? (
                            <a
                                href={buyNowUrl}
                                style={{
                                    width: "100%",
                                    backgroundColor: accentColor,
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "16px 24px",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    marginBottom: "16px",
                                    textDecoration: "none",
                                    display: "block",
                                    textAlign: "center",
                                }}
                            >
                                {buyNowText}
                            </a>
                        ) : (
                            <button
                                onClick={handleBuyNowClick}
                                style={{
                                    width: "100%",
                                    backgroundColor: accentColor,
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "16px 24px",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    marginBottom: "16px",
                                }}
                            >
                                {buyNowText}
                            </button>
                        )}

                        <div style={{
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#6b7280",
                        }}>
                            {price}
                        </div>
                    </div>
                </div>

                {/* Lessons Section */}
                {showLessons && lessons.length > 0 && (
                    <div style={{
                        marginTop: "48px",
                        padding: "24px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                    }}>
                        <h3 style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginBottom: "24px",
                            color: textColor,
                        }}>
                            Lecciones del Curso
                        </h3>

                        {/* Video Player */}
                        {lessons[currentLesson] && (
                            <div style={{
                                width: "100%",
                                height: "400px",
                                borderRadius: "12px",
                                overflow: "hidden",
                                backgroundColor: "#000000",
                                marginBottom: "24px",
                                position: "relative",
                            }}>
                                <iframe
                                    src={`https://player.vimeo.com/video/${lessons[currentLesson].vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    onLoad={handleVideoLoad}
                                    style={{
                                        borderRadius: "12px",
                                    }}
                                />
                                {!isVideoLoaded && (
                                    <div style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        color: "#ffffff",
                                        fontSize: "16px",
                                    }}>
                                        Cargando video...
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Lesson Info */}
                        {lessons[currentLesson] && (
                            <div style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "8px",
                                padding: "20px",
                                marginBottom: "20px",
                                border: "1px solid #e5e7eb",
                            }}>
                                <h4 style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    marginBottom: "8px",
                                    color: textColor,
                                }}>
                                    Lección {currentLesson + 1}: {lessons[currentLesson].title}
                                </h4>
                                
                                <p style={{
                                    fontSize: "14px",
                                    color: "#6b7280",
                                    marginBottom: "12px",
                                }}>
                                    {lessons[currentLesson].description}
                                </p>

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    fontSize: "12px",
                                    color: "#9ca3af",
                                }}>
                                    <span>Duración: {lessons[currentLesson].duration}</span>
                                    <span>{currentLesson + 1} de {lessons.length}</span>
                                </div>
                            </div>
                        )}

                        {/* Lessons List */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "12px",
                            marginBottom: "20px",
                        }}>
                            {lessons.map((lesson, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleLessonClick(index)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "12px 16px",
                                        backgroundColor: currentLesson === index ? accentColor : "#ffffff",
                                        color: currentLesson === index ? "#ffffff" : textColor,
                                        borderRadius: "8px",
                                        border: `1px solid ${currentLesson === index ? accentColor : "#e5e7eb"}`,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        textAlign: "left",
                                        width: "100%",
                                    }}
                                >
                                    <div style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        backgroundColor: currentLesson === index ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginRight: "12px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                    }}>
                                        {index + 1}
                                    </div>
                                    <div style={{
                                        flex: 1,
                                    }}>
                                        <div style={{
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            marginBottom: "4px",
                                        }}>
                                            {lesson.title}
                                        </div>
                                        <div style={{
                                            fontSize: "12px",
                                            opacity: 0.7,
                                        }}>
                                            {lesson.duration}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Navigation Controls */}
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <button
                                onClick={handlePrevLesson}
                                disabled={currentLesson === 0}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: currentLesson === 0 ? "#f3f4f6" : "#ffffff",
                                    color: currentLesson === 0 ? "#9ca3af" : textColor,
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "6px",
                                    cursor: currentLesson === 0 ? "not-allowed" : "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                }}
                            >
                                ← Anterior
                            </button>

                            <span style={{
                                fontSize: "14px",
                                color: "#6b7280",
                            }}>
                                {currentLesson + 1} de {lessons.length}
                            </span>

                            <button
                                onClick={handleNextLesson}
                                disabled={currentLesson === lessons.length - 1}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: currentLesson === lessons.length - 1 ? "#f3f4f6" : "#ffffff",
                                    color: currentLesson === lessons.length - 1 ? "#9ca3af" : textColor,
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "6px",
                                    cursor: currentLesson === lessons.length - 1 ? "not-allowed" : "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                }}
                            >
                                Siguiente →
                            </button>
                        </div>
                    </div>
                )}

                {/* Next Course Button */}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "48px",
                }}>
                    {nextCourseUrl && nextCourseUrl !== "#" ? (
                        <a
                            href={nextCourseUrl}
                            style={{
                                backgroundColor: "#ffffff",
                                color: textColor,
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                                padding: "12px 24px",
                                fontSize: "14px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                textDecoration: "none",
                                display: "inline-block",
                            }}
                        >
                            {nextCourseText}
                        </a>
                    ) : (
                        <button
                            onClick={handleNextCourseClick}
                            style={{
                                backgroundColor: "#ffffff",
                                color: textColor,
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                                padding: "12px 24px",
                                fontSize: "14px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {nextCourseText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

// Property Controls for Framer
addPropertyControls(CourseDetailPage, {
    courseTitle: {
        type: ControlType.String,
        title: "Título del Curso",
        defaultValue: "Integración de Elementos 3D",
    },
    courseDescription: {
        type: ControlType.String,
        title: "Descripción del Curso",
        defaultValue: "La integración de elementos tridimensionales (3D) en el diseño web está ganando popularidad, ofreciendo una experiencia visualmente atractiva e inmersiva.",
        multiline: true,
    },
    courseContent: {
        type: ControlType.String,
        title: "Contenido del Curso",
        defaultValue: "La integración de elementos tridimensionales (3D) en el diseño web está ganando popularidad, ofreciendo una experiencia visualmente atractiva e inmersiva. Este enfoque permite a los diseñadores crear interfaces más dinámicas e interactivas que pueden capturar mejor la atención del usuario y proporcionar una experiencia de usuario más atractiva.\n\nLos elementos 3D se pueden implementar a través de varias tecnologías como WebGL, Three.js y transformaciones CSS 3D. Estas tecnologías permiten la creación de modelos 3D realistas, animaciones y elementos interactivos que se pueden integrar perfectamente en aplicaciones web.",
        multiline: true,
    },
    courseImage: {
        type: ControlType.Image,
        title: "Imagen del Curso",
        defaultValue: "https://images.unsplash.com/photo-1592478411213-6153e4c4c8f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    author: {
        type: ControlType.String,
        title: "Instructora",
        defaultValue: "María González",
    },
    level: {
        type: ControlType.Enum,
        title: "Nivel",
        options: ["Principiante", "Intermedio", "Avanzado"],
        defaultValue: "Principiante",
    },
    lessonsCount: {
        type: ControlType.Number,
        title: "Número de Lecciones",
        defaultValue: 22,
        min: 1,
        max: 100,
    },
    language: {
        type: ControlType.String,
        title: "Idioma",
        defaultValue: "Español",
    },
    subtitles: {
        type: ControlType.String,
        title: "Subtítulos",
        defaultValue: "Español, Inglés, Portugués, Alemán, Francés, Italiano, Polaco, Holandés",
        multiline: true,
    },
    price: {
        type: ControlType.String,
        title: "Precio",
        defaultValue: "$99.99",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Color de Fondo",
        defaultValue: "#ffffff",
    },
    textColor: {
        type: ControlType.Color,
        title: "Color del Texto",
        defaultValue: "#1f2937",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Color de Acento",
        defaultValue: "#000000",
    },
    onBackToCourses: {
        type: ControlType.EventHandler,
        title: "Volver a Cursos",
    },
    onBuyNow: {
        type: ControlType.EventHandler,
        title: "Accesar",
    },
    onNextCourse: {
        type: ControlType.EventHandler,
        title: "Siguiente Curso",
    },
    backToCoursesText: {
        type: ControlType.String,
        title: "Texto Volver a Cursos",
        defaultValue: "VOLVER A CURSOS",
    },
    buyNowText: {
        type: ControlType.String,
        title: "Texto Accesar",
        defaultValue: "ACCESAR",
    },
    nextCourseText: {
        type: ControlType.String,
        title: "Texto Siguiente Curso",
        defaultValue: "SIGUIENTE CURSO",
    },
    backToCoursesUrl: {
        type: ControlType.String,
        title: "URL Volver a Cursos",
        defaultValue: "#",
    },
    buyNowUrl: {
        type: ControlType.String,
        title: "URL Accesar",
        defaultValue: "#",
    },
    nextCourseUrl: {
        type: ControlType.String,
        title: "URL Siguiente Curso",
        defaultValue: "#",
    },
    showLessons: {
        type: ControlType.Boolean,
        title: "Mostrar Lecciones",
        defaultValue: false,
    },
    lessons: {
        type: ControlType.Array,
        title: "Lecciones",
        control: {
            type: ControlType.Object,
            controls: {
                title: {
                    type: ControlType.String,
                    title: "Título",
                    defaultValue: "Introducción",
                },
                description: {
                    type: ControlType.String,
                    title: "Descripción",
                    defaultValue: "Descripción de la lección",
                },
                vimeoId: {
                    type: ControlType.String,
                    title: "ID de Vimeo",
                    defaultValue: "123456789",
                },
                duration: {
                    type: ControlType.String,
                    title: "Duración",
                    defaultValue: "15 min",
                },
            },
        },
        defaultValue: [
            {
                title: "Introducción al Biomagnetismo",
                description: "Conceptos básicos y fundamentos del biomagnetismo",
                vimeoId: "123456789",
                duration: "15 min",
            },
            {
                title: "Técnicas Básicas",
                description: "Aprende las técnicas fundamentales paso a paso",
                vimeoId: "987654321",
                duration: "20 min",
            },
            {
                title: "Práctica Guiada",
                description: "Ejercicios prácticos con supervisión",
                vimeoId: "456789123",
                duration: "25 min",
            },
            {
                title: "Evaluación Final",
                description: "Test de conocimientos y certificación",
                vimeoId: "789123456",
                duration: "10 min",
            },
        ],
    },
    onStartLessons: {
        type: ControlType.EventHandler,
        title: "Iniciar Lecciones",
    },
})
