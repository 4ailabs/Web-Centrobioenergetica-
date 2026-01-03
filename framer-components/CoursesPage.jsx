import React, { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

export default function CoursesPage(props) {
    const {
        pageTitle = "Nuestros Cursos",
        pageDescription = "Descubre nuestros cursos especializados en bioenergética y terapias complementarias",
        backgroundColor = "#ffffff",
        textColor = "#1f2937",
        accentColor = "#000000",
        // Course 1
        course1Title = "Biomagnetismo Kids",
        course1Description = "Técnicas especializadas de biomagnetismo adaptadas para el bienestar de los niños",
        course1VimeoId = "123456789",
        course1Lessons = 4,
        course1Duration = "2 horas",
        course1Level = "Principiante",
        course1Image = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // Course 2
        course2Title = "Flores de Bach Avanzado",
        course2Description = "Dominio completo del sistema de esencias florales para el equilibrio emocional",
        course2VimeoId = "987654321",
        course2Lessons = 3,
        course2Duration = "1.5 horas",
        course2Level = "Avanzado",
        course2Image = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // Course 3
        course3Title = "Terapia de Muñecos",
        course3Description = "Técnica terapéutica que utiliza muñecos para explorar los caminos de la vida",
        course3VimeoId = "456789123",
        course3Lessons = 4,
        course3Duration = "2.5 horas",
        course3Level = "Intermedio",
        course3Image = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // Course 4
        course4Title = "Conflictos Biológicos",
        course4Description = "Análisis de la relación entre conflictos emocionales y manifestaciones biológicas",
        course4VimeoId = "789123456",
        course4Lessons = 3,
        course4Duration = "1.8 horas",
        course4Level = "Avanzado",
        course4Image = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // Navigation
        onBackToHome,
        onCourseClick,
    } = props

    const [selectedCourse, setSelectedCourse] = useState(null)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    const courses = [
        {
            id: 1,
            title: course1Title,
            description: course1Description,
            vimeoId: course1VimeoId,
            lessons: course1Lessons,
            duration: course1Duration,
            level: course1Level,
            image: course1Image,
        },
        {
            id: 2,
            title: course2Title,
            description: course2Description,
            vimeoId: course2VimeoId,
            lessons: course2Lessons,
            duration: course2Duration,
            level: course2Level,
            image: course2Image,
        },
        {
            id: 3,
            title: course3Title,
            description: course3Description,
            vimeoId: course3VimeoId,
            lessons: course3Lessons,
            duration: course3Duration,
            level: course3Level,
            image: course3Image,
        },
        {
            id: 4,
            title: course4Title,
            description: course4Description,
            vimeoId: course4VimeoId,
            lessons: course4Lessons,
            duration: course4Duration,
            level: course4Level,
            image: course4Image,
        },
    ]

    const handleCourseClick = (course) => {
        setSelectedCourse(course)
        if (onCourseClick) {
            onCourseClick(course)
        }
    }

    const handleBackClick = () => {
        setSelectedCourse(null)
        if (onBackToHome) {
            onBackToHome()
        }
    }

    const handleVideoLoad = () => {
        setIsVideoLoaded(true)
    }

    if (selectedCourse) {
        return (
            <div style={{
                backgroundColor: backgroundColor,
                minHeight: "100vh",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                color: textColor,
            }}>
                <style>{`
                    .video-container {
                        aspect-ratio: 16/9;
                        width: 100%;
                        max-width: 100%;
                    }

                    .video-container iframe {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: 0;
                    }

                    @media (max-width: 768px) {
                        .course-header {
                            padding: 16px !important;
                        }
                        .course-title {
                            font-size: 24px !important;
                        }
                        .course-details {
                            padding: 16px !important;
                        }
                        .video-wrapper {
                            padding: 16px !important;
                        }
                    }
                `}</style>

                {/* Header */}
                <div className="course-header" style={{
                    padding: "24px 32px",
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                }}>
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
                        ← VOLVER A CURSOS
                    </button>
                </div>

                {/* Video Player */}
                <div className="video-wrapper" style={{
                    padding: "32px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}>
                    <div className="video-container" style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#000000",
                        marginBottom: "24px",
                        position: "relative",
                    }}>
                        <iframe
                            src={`https://player.vimeo.com/video/${selectedCourse.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
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

                    {/* Course Info */}
                    <div className="course-details" style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "24px",
                        border: "1px solid #e5e7eb",
                    }}>
                        <h1 className="course-title" style={{
                            fontSize: "32px",
                            fontWeight: "700",
                            marginBottom: "16px",
                            lineHeight: "1.2",
                        }}>
                            {selectedCourse.title}
                        </h1>
                        
                        <p style={{
                            fontSize: "18px",
                            color: "#4b5563",
                            marginBottom: "24px",
                            lineHeight: "1.5",
                        }}>
                            {selectedCourse.description}
                        </p>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "16px",
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Lecciones:</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{selectedCourse.lessons}</span>
                            </div>
                            
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Duración:</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{selectedCourse.duration}</span>
                            </div>
                            
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Nivel:</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{selectedCourse.level}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            backgroundColor: backgroundColor,
            minHeight: "100vh",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            color: textColor,
        }}>
            <style>{`
                @media (max-width: 768px) {
                    .courses-container {
                        padding: 16px !important;
                    }
                    .courses-grid {
                        grid-template-columns: 1fr !important;
                        gap: 16px !important;
                    }
                    .course-card {
                        margin-bottom: 16px !important;
                    }
                    .course-image {
                        height: 200px !important;
                    }
                    .page-title {
                        font-size: 28px !important;
                    }
                    .page-description {
                        font-size: 16px !important;
                    }
                }
            `}</style>

            {/* Header */}
            <div style={{
                padding: "24px 32px",
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
            }}>
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
                    ← VOLVER AL INICIO
                </button>
            </div>

            {/* Main Content */}
            <div className="courses-container" style={{
                padding: "32px",
                maxWidth: "1200px",
                margin: "0 auto",
            }}>
                {/* Page Header */}
                <div style={{
                    textAlign: "center",
                    marginBottom: "48px",
                }}>
                    <h1 className="page-title" style={{
                        fontSize: "36px",
                        fontWeight: "700",
                        marginBottom: "16px",
                        lineHeight: "1.2",
                    }}>
                        {pageTitle}
                    </h1>
                    
                    <p className="page-description" style={{
                        fontSize: "18px",
                        color: "#4b5563",
                        maxWidth: "600px",
                        margin: "0 auto",
                        lineHeight: "1.5",
                    }}>
                        {pageDescription}
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="courses-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                }}>
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="course-card"
                            onClick={() => handleCourseClick(course)}
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "12px",
                                overflow: "hidden",
                                border: "1px solid #e5e7eb",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-4px)"
                                e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)"
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)"
                                e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            {/* Course Image */}
                            <div className="course-image" style={{
                                width: "100%",
                                height: "250px",
                                position: "relative",
                                overflow: "hidden",
                            }}>
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                
                                {/* Play Button Overlay */}
                                <div style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "60px",
                                    height: "60px",
                                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.3s ease",
                                }}>
                                    <div style={{
                                        width: "0",
                                        height: "0",
                                        borderLeft: "20px solid #ffffff",
                                        borderTop: "12px solid transparent",
                                        borderBottom: "12px solid transparent",
                                        marginLeft: "4px",
                                    }} />
                                </div>

                                {/* Level Badge */}
                                <div style={{
                                    position: "absolute",
                                    top: "12px",
                                    right: "12px",
                                    backgroundColor: accentColor,
                                    color: "#ffffff",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    textTransform: "uppercase",
                                }}>
                                    {course.level}
                                </div>
                            </div>

                            {/* Course Info */}
                            <div style={{
                                padding: "20px",
                            }}>
                                <h3 style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    marginBottom: "8px",
                                    lineHeight: "1.3",
                                }}>
                                    {course.title}
                                </h3>
                                
                                <p style={{
                                    fontSize: "14px",
                                    color: "#6b7280",
                                    marginBottom: "16px",
                                    lineHeight: "1.4",
                                }}>
                                    {course.description}
                                </p>

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    fontSize: "12px",
                                    color: "#9ca3af",
                                }}>
                                    <span>{course.lessons} lecciones</span>
                                    <span>{course.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Property Controls for Framer
addPropertyControls(CoursesPage, {
    pageTitle: {
        type: ControlType.String,
        title: "Título de la Página",
        defaultValue: "Nuestros Cursos",
    },
    pageDescription: {
        type: ControlType.String,
        title: "Descripción de la Página",
        defaultValue: "Descubre nuestros cursos especializados en bioenergética y terapias complementarias",
        multiline: true,
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
    // Course 1
    course1Title: {
        type: ControlType.String,
        title: "Curso 1 - Título",
        defaultValue: "Biomagnetismo Kids",
    },
    course1Description: {
        type: ControlType.String,
        title: "Curso 1 - Descripción",
        defaultValue: "Técnicas especializadas de biomagnetismo adaptadas para el bienestar de los niños",
        multiline: true,
    },
    course1VimeoId: {
        type: ControlType.String,
        title: "Curso 1 - ID de Vimeo",
        defaultValue: "123456789",
    },
    course1Lessons: {
        type: ControlType.Number,
        title: "Curso 1 - Lecciones",
        defaultValue: 4,
        min: 1,
        max: 10,
    },
    course1Duration: {
        type: ControlType.String,
        title: "Curso 1 - Duración",
        defaultValue: "2 horas",
    },
    course1Level: {
        type: ControlType.Enum,
        title: "Curso 1 - Nivel",
        options: ["Principiante", "Intermedio", "Avanzado"],
        defaultValue: "Principiante",
    },
    course1Image: {
        type: ControlType.Image,
        title: "Curso 1 - Imagen",
        defaultValue: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Course 2
    course2Title: {
        type: ControlType.String,
        title: "Curso 2 - Título",
        defaultValue: "Flores de Bach Avanzado",
    },
    course2Description: {
        type: ControlType.String,
        title: "Curso 2 - Descripción",
        defaultValue: "Dominio completo del sistema de esencias florales para el equilibrio emocional",
        multiline: true,
    },
    course2VimeoId: {
        type: ControlType.String,
        title: "Curso 2 - ID de Vimeo",
        defaultValue: "987654321",
    },
    course2Lessons: {
        type: ControlType.Number,
        title: "Curso 2 - Lecciones",
        defaultValue: 3,
        min: 1,
        max: 10,
    },
    course2Duration: {
        type: ControlType.String,
        title: "Curso 2 - Duración",
        defaultValue: "1.5 horas",
    },
    course2Level: {
        type: ControlType.Enum,
        title: "Curso 2 - Nivel",
        options: ["Principiante", "Intermedio", "Avanzado"],
        defaultValue: "Avanzado",
    },
    course2Image: {
        type: ControlType.Image,
        title: "Curso 2 - Imagen",
        defaultValue: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Course 3
    course3Title: {
        type: ControlType.String,
        title: "Curso 3 - Título",
        defaultValue: "Terapia de Muñecos",
    },
    course3Description: {
        type: ControlType.String,
        title: "Curso 3 - Descripción",
        defaultValue: "Técnica terapéutica que utiliza muñecos para explorar los caminos de la vida",
        multiline: true,
    },
    course3VimeoId: {
        type: ControlType.String,
        title: "Curso 3 - ID de Vimeo",
        defaultValue: "456789123",
    },
    course3Lessons: {
        type: ControlType.Number,
        title: "Curso 3 - Lecciones",
        defaultValue: 4,
        min: 1,
        max: 10,
    },
    course3Duration: {
        type: ControlType.String,
        title: "Curso 3 - Duración",
        defaultValue: "2.5 horas",
    },
    course3Level: {
        type: ControlType.Enum,
        title: "Curso 3 - Nivel",
        options: ["Principiante", "Intermedio", "Avanzado"],
        defaultValue: "Intermedio",
    },
    course3Image: {
        type: ControlType.Image,
        title: "Curso 3 - Imagen",
        defaultValue: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Course 4
    course4Title: {
        type: ControlType.String,
        title: "Curso 4 - Título",
        defaultValue: "Conflictos Biológicos",
    },
    course4Description: {
        type: ControlType.String,
        title: "Curso 4 - Descripción",
        defaultValue: "Análisis de la relación entre conflictos emocionales y manifestaciones biológicas",
        multiline: true,
    },
    course4VimeoId: {
        type: ControlType.String,
        title: "Curso 4 - ID de Vimeo",
        defaultValue: "789123456",
    },
    course4Lessons: {
        type: ControlType.Number,
        title: "Curso 4 - Lecciones",
        defaultValue: 3,
        min: 1,
        max: 10,
    },
    course4Duration: {
        type: ControlType.String,
        title: "Curso 4 - Duración",
        defaultValue: "1.8 horas",
    },
    course4Level: {
        type: ControlType.Enum,
        title: "Curso 4 - Nivel",
        options: ["Principiante", "Intermedio", "Avanzado"],
        defaultValue: "Avanzado",
    },
    course4Image: {
        type: ControlType.Image,
        title: "Curso 4 - Imagen",
        defaultValue: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    onBackToHome: {
        type: ControlType.EventHandler,
        title: "Volver al Inicio",
    },
    onCourseClick: {
        type: ControlType.EventHandler,
        title: "Click en Curso",
    },
})
