import React, { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

// Ejemplo de integración con tu app existente
export default function CourseDetailIntegration(props) {
    const {
        courseData = {
            id: 1,
            title: "Biomagnetismo Kids",
            description: "Técnicas especializadas de biomagnetismo adaptadas para el bienestar de los niños y su desarrollo energético.",
            content: "El biomagnetismo para niños es una técnica terapéutica especializada que utiliza imanes de baja intensidad para equilibrar el pH del organismo infantil. Esta metodología está diseñada específicamente para el cuerpo en desarrollo, considerando las particularidades energéticas y fisiológicas de los niños.\n\nA través de sesiones adaptadas a la edad y necesidades específicas de cada niño, el biomagnetismo puede ayudar a:\n• Equilibrar el sistema energético\n• Fortalecer el sistema inmunológico\n• Mejorar la concentración y el aprendizaje\n• Reducir el estrés y la ansiedad\n• Promover un sueño reparador",
            imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            author: "Dr. María González",
            level: "Beginner",
            lessons: 12,
            language: "Español",
            subtitles: "Español, Inglés, Portugués",
            price: "$299 MXN"
        },
        onBackToCourses,
        onBuyNow,
        onNextCourse,
    } = props

    const [currentCourse, setCurrentCourse] = useState(courseData)

    // Función para manejar la compra
    const handleBuyNow = () => {
        // Aquí puedes integrar con tu sistema de pagos
        console.log("Comprando curso:", currentCourse.title)
        
        // Ejemplo de integración con Framer
        if (onBuyNow) {
            onBuyNow({
                courseId: currentCourse.id,
                courseTitle: currentCourse.title,
                price: currentCourse.price
            })
        }
    }

    // Función para manejar el regreso a cursos
    const handleBackToCourses = () => {
        console.log("Regresando a la lista de cursos")
        
        if (onBackToCourses) {
            onBackToCourses()
        }
    }

    // Función para manejar el siguiente curso
    const handleNextCourse = () => {
        console.log("Navegando al siguiente curso")
        
        if (onNextCourse) {
            onNextCourse({
                currentCourseId: currentCourse.id,
                direction: "next"
            })
        }
    }

    return (
        <div style={{
            width: "100%",
            height: "100%",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        }}>
            {/* Header */}
            <div style={{
                padding: "24px 32px",
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
            }}>
                <button
                    onClick={handleBackToCourses}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#1f2937",
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

            {/* Main Content */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "32px",
                backgroundColor: "#ffffff",
            }}>
                {/* Course Image */}
                <div style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginBottom: "32px",
                    position: "relative",
                    backgroundColor: "#f3f4f6",
                }}>
                    <img
                        src={currentCourse.imageUrl}
                        alt={currentCourse.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>

                {/* Content Layout */}
                <div style={{
                    display: "flex",
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
                            color: "#1f2937",
                        }}>
                            {currentCourse.title}
                        </h1>
                        
                        <p style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "24px",
                            lineHeight: "1.5",
                            color: "#4b5563",
                        }}>
                            {currentCourse.description}
                        </p>

                        <div style={{
                            fontSize: "16px",
                            lineHeight: "1.6",
                            color: "#374151",
                        }}>
                            {currentCourse.content.split('\n').map((paragraph, index) => (
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
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        padding: "24px",
                        position: "sticky",
                        top: "32px",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    }}>
                        <h2 style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginBottom: "24px",
                            color: "#1f2937",
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
                                    color: "#1f2937",
                                }}>{currentCourse.author}</span>
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
                                    color: "#1f2937",
                                }}>{currentCourse.level}</span>
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
                                    color: "#1f2937",
                                }}>{currentCourse.lessons}</span>
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
                                    color: "#1f2937",
                                }}>{currentCourse.language}</span>
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
                                    color: "#1f2937",
                                    textAlign: "right",
                                    lineHeight: "1.4",
                                }}>{currentCourse.subtitles}</span>
                            </div>
                        </div>

                        {/* Buy Now Button */}
                        <button
                            onClick={handleBuyNow}
                            style={{
                                width: "100%",
                                backgroundColor: "#059669",
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
                            ACCESAR
                        </button>

                        <div style={{
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#6b7280",
                        }}>
                            {currentCourse.price}
                        </div>
                    </div>
                </div>

                {/* Next Course Button */}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "48px",
                }}>
                    <button
                        onClick={handleNextCourse}
                        style={{
                            backgroundColor: "#ffffff",
                            color: "#1f2937",
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
                        SIGUIENTE CURSO
                    </button>
                </div>
            </div>
        </div>
    )
}

// Property Controls for Framer
addPropertyControls(CourseDetailIntegration, {
    courseData: {
        type: ControlType.Object,
        title: "Course Data",
        controls: {
            title: {
                type: ControlType.String,
                title: "Title",
                defaultValue: "Biomagnetismo Kids",
            },
            description: {
                type: ControlType.String,
                title: "Description",
                defaultValue: "Técnicas especializadas de biomagnetismo adaptadas para el bienestar de los niños",
                multiline: true,
            },
            content: {
                type: ControlType.String,
                title: "Content",
                defaultValue: "El biomagnetismo para niños es una técnica terapéutica especializada...",
                multiline: true,
            },
            imageUrl: {
                type: ControlType.Image,
                title: "Image URL",
                defaultValue: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            author: {
                type: ControlType.String,
                title: "Author",
                defaultValue: "Dr. María González",
            },
            level: {
                type: ControlType.Enum,
                title: "Level",
                options: ["Beginner", "Intermediate", "Advanced"],
                defaultValue: "Beginner",
            },
            lessons: {
                type: ControlType.Number,
                title: "Lessons",
                defaultValue: 12,
                min: 1,
                max: 100,
            },
            language: {
                type: ControlType.String,
                title: "Language",
                defaultValue: "Español",
            },
            subtitles: {
                type: ControlType.String,
                title: "Subtitles",
                defaultValue: "Español, Inglés, Portugués",
                multiline: true,
            },
            price: {
                type: ControlType.String,
                title: "Price",
                defaultValue: "$299 MXN",
            },
        },
    },
    onBackToCourses: {
        type: ControlType.EventHandler,
        title: "Back to Courses",
    },
    onBuyNow: {
        type: ControlType.EventHandler,
        title: "Buy Now",
    },
    onNextCourse: {
        type: ControlType.EventHandler,
        title: "Next Course",
    },
})
